'use client';

import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '@/types/database';

// Lazy import to avoid circular dependency
const getCartStore = () => import('./cartStore').then(m => m.useCartStore);

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isInitialized: boolean;

  initialize: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  unlockProduct: (productIds: string | string[]) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  isLoading: false,
  isInitialized: false,

  initialize: async () => {
    // Prevent multiple parallel initializations
    if (get().isInitialized || get().isLoading) return;

    set({ isLoading: true });

    // Safety timeout - if initialization takes more than 5 seconds, force it to complete
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Auth initialization timeout')), 5000)
    );

    try {
      const initTask = (async () => {
        console.log('Auth initialization: Fetching session...');
        // First, handle the initial session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Auth initialization: Session fetch error:', sessionError);
        }

        if (session?.user) {
          let { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          // If profile doesn't exist, create it
          if (profileError || !profile) {
            console.log('Profile not found, creating new profile for user:', session.user.id);
            const newProfile = {
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
              unlocked_products: [],
              badges: [],
              created_at: new Date().toISOString()
            };

            const { data: createdProfile, error: createError } = await supabase
              .from('profiles')
              .upsert(newProfile)
              .select()
              .single();

            if (!createError && createdProfile) {
              profile = createdProfile;
            }
          }

          set({
            user: session.user,
            profile: profile || null,
            isInitialized: true,
            isLoading: false
          });

          // Sync cart with user (non-blocking)
          getCartStore().then(store => store.getState().setUserId(session.user.id));
        } else {
          set({ isInitialized: true, isLoading: false, user: null, profile: null });
          getCartStore().then(store => store.getState().setUserId(null));
        }

        // Setup listener if not already set
        if (!(window as any).__supabaseAuthListenerSet) {
          console.log('Auth initialization: Setting up auth listener');
          supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth listener event:', event);
            if (session?.user) {
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

              set({ user: session.user, profile: profile || null, isInitialized: true });
              getCartStore().then(store => store.getState().setUserId(session.user.id));
            } else {
              set({ user: null, profile: null, isInitialized: true });
              getCartStore().then(store => store.getState().setUserId(null));
            }
          });
          (window as any).__supabaseAuthListenerSet = true;
        }
      })();

      await Promise.race([initTask, timeoutPromise]);
    } catch (error) {
      console.error('Auth init error or timeout:', error);
      set({ isInitialized: true, isLoading: false });
    }
  },

  signUp: async (email, password, name) => {
    set({ isLoading: true });
    try {
      console.log('Auth: Starting sign up process');
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });

      if (error) {
        console.error('Auth: Sign up error', error);
        set({ isLoading: false });
        return { error: error.message };
      }

      if (data.user) {
        console.log('Auth: Sign up successful, ensuring profile exists');
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (!profile) {
          console.log('Auth: Profile not found after signup, creating...');
          await supabase.from('profiles').insert({
            id: data.user.id,
            name,
            email,
            unlocked_products: [],
            badges: []
          });
        }

        // Optionally set state here, though session change might trigger listener
        set({ user: data.user });
      }

      set({ isLoading: false });
      return { error: null };
    } catch (error) {
      console.error('Auth: Unexpected signup error', error);
      set({ isLoading: false });
      return { error: 'Đã có lỗi xảy ra' };
    }
  },

  signIn: async (email, password) => {
    set({ isLoading: true });
    try {
      console.log('Auth: Starting sign in process');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Auth: Sign in error', error);
        set({ isLoading: false });
        return { error: error.message };
      }

      if (data.user) {
        console.log('Auth: Sign in successful, capturing state');
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        set({ user: data.user, profile: profile || null });
        getCartStore().then(store => store.getState().setUserId(data.user.id));
      }

      set({ isLoading: false });
      return { error: null };
    } catch (error) {
      console.error('Auth: Unexpected signin error', error);
      set({ isLoading: false });
      return { error: 'Đã có lỗi xảy ra' };
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    try {
      // Clear the auth listener flag so it won't auto-restore session
      (window as any).__supabaseAuthListenerSet = false;

      // Clear local state immediately for better UX
      set({ user: null, profile: null, isInitialized: false });
      const CartStore = await getCartStore();
      CartStore.getState().setUserId(null);

      // Sign out from Supabase - use 'global' scope to clear everywhere
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (e) {
        console.warn('Supabase signOut error:', e);
      }

      // Clear ALL Supabase-related storage
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('supabase') || key.includes('sb-'))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));

      // Also clear sessionStorage
      const sessionKeysToRemove: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && (key.includes('supabase') || key.includes('sb-'))) {
          sessionKeysToRemove.push(key);
        }
      }
      sessionKeysToRemove.forEach(key => sessionStorage.removeItem(key));

      set({ isLoading: false });

      // Force reload to clear all cached state
      window.location.replace('/');
    } catch (error) {
      console.error('Sign out error:', error);
      // Even on error, clear everything and redirect
      set({ user: null, profile: null, isLoading: false, isInitialized: false });
      window.location.replace('/');
    }
  },

  updateProfile: async (updates) => {
    const { user } = get();
    if (!user) {
      console.error('updateProfile: No user logged in');
      return;
    }

    console.log('updateProfile: Updating with', updates);

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      console.error('updateProfile: Supabase error', error);
      return;
    }

    if (data) {
      console.log('updateProfile: Success, new profile', data);
      set({ profile: data as Profile });
    }
  },

  unlockProduct: async (productIds: string | string[]) => {
    const { user, profile } = get();

    console.log('unlockProduct: Starting unlock for', productIds);

    if (!user || !profile) {
      console.error('unlockProduct: Missing user or profile');
      return;
    }

    const inputIds = Array.isArray(productIds) ? productIds : [productIds];
    const currentProducts = profile.unlocked_products || [];

    // Create a new set of products to avoid duplicates
    let newProducts = [...currentProducts];
    let hasNew = false;

    for (const id of inputIds) {
      if (!newProducts.includes(id)) {
        newProducts.push(id);
        hasNew = true;

        // If unlocking the combo, also unlock all 6 individual products
        if (id === 'combo-6-vi') {
          const allProductIds = ['bac-man', 'bac-mo', 'trung-sen', 'trung-dau', 'nam-dua', 'nam-mangcau'];
          allProductIds.forEach(pId => {
            if (!newProducts.includes(pId)) {
              newProducts.push(pId);
            }
          });
        }
      }
    }

    if (!hasNew && !inputIds.includes('combo-6-vi')) {
      console.log('unlockProduct: No new products to unlock');
      return;
    }

    console.log('unlockProduct: Final products list', newProducts);

    // Check badges
    const bacProducts = ['bac-man', 'bac-mo'];
    const trungProducts = ['trung-sen', 'trung-dau'];
    const namProducts = ['nam-dua', 'nam-mangcau'];

    const hasBac = bacProducts.every(id => newProducts.includes(id));
    const hasTrung = trungProducts.every(id => newProducts.includes(id));
    const hasNam = namProducts.every(id => newProducts.includes(id));

    const completedRegions = [hasBac, hasTrung, hasNam].filter(Boolean).length;

    const newBadges: string[] = [...(profile.badges || [])];
    if (completedRegions >= 1 && !newBadges.includes('khoi-hanh')) {
      newBadges.push('khoi-hanh');
    }
    if (completedRegions >= 2 && !newBadges.includes('ket-noi')) {
      newBadges.push('ket-noi');
    }
    if (completedRegions >= 3 && !newBadges.includes('dai-su')) {
      newBadges.push('dai-su');
    }

    console.log('unlockProduct: Updating profile with', { unlocked_products: newProducts, badges: newBadges });

    await get().updateProfile({
      unlocked_products: newProducts,
      badges: newBadges
    });

    console.log('unlockProduct: Complete');
  }
}));
