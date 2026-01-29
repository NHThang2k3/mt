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
    console.log('Auth initialization: Starting...');

    // Safety timeout - if initialization takes more than 20 seconds, force it to complete
    const timeoutPromise = new Promise<void>((_, reject) =>
      setTimeout(() => reject(new Error('Auth initialization timeout')), 20000)
    );

    try {
      const initTask = (async () => {
        console.log('Auth initialization: Fetching session...');

        // First, handle the initial session
        let session = null;
        let sessionError = null;

        // Try to get session with retry
        for (let attempt = 0; attempt < 2; attempt++) {
          const result = await supabase.auth.getSession();
          session = result.data.session;
          sessionError = result.error;

          if (session || !sessionError) break;

          console.log(`Auth initialization: Retry attempt ${attempt + 1}`);
          await new Promise(r => setTimeout(r, 500));
        }

        if (sessionError) {
          console.error('Auth initialization: Session fetch error:', sessionError);
        }

        console.log('Auth initialization: Session found?', !!session?.user);

        if (session?.user) {
          console.log('Auth initialization: User found, fetching profile...');
          let { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          // If profile doesn't exist, create it
          if (profileError || !profile) {
            if (profileError && profileError.code !== 'PGRST116') {
              console.warn('Auth initialization: Error fetching profile:', profileError);
            }

            console.log('Profile not found or error, ensuring profile exists for user:', session.user.id);
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
              console.log('Auth initialization: New profile created successfully');
            } else if (createError) {
              console.error('Auth initialization: Profile creation failed:', createError);
            }
          }

          console.log('Auth initialization: Setting user state');
          set({
            user: session.user,
            profile: profile || null,
            isInitialized: true,
            isLoading: false
          });

          // Sync cart with user (non-blocking)
          getCartStore().then(store => store.getState().setUserId(session.user.id));
        } else {
          console.log('Auth initialization: No session found');
          set({ isInitialized: true, isLoading: false, user: null, profile: null });
          getCartStore().then(store => store.getState().setUserId(null));
        }

        // Setup listener if not already set
        if (!(window as any).__supabaseAuthListenerSet) {
          console.log('Auth initialization: Setting up auth listener');
          supabase.auth.onAuthStateChange(async (event, newSession) => {
            console.log('Auth listener event:', event, 'Has session:', !!newSession?.user);

            // Skip INITIAL_SESSION as we've already handled it
            if (event === 'INITIAL_SESSION') {
              return;
            }

            if (newSession?.user) {
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', newSession.user.id)
                .single();

              set({ user: newSession.user, profile: profile || null, isInitialized: true });
              getCartStore().then(store => store.getState().setUserId(newSession.user.id));
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
    const { user, profile } = get();
    if (!user) {
      console.error('updateProfile: No user logged in');
      throw new Error('No user logged in');
    }

    console.log('updateProfile: Starting update for user', user.id);
    console.log('updateProfile: Updates:', JSON.stringify(updates));

    // Merge updates with existing profile data for upsert
    const fullData = {
      id: user.id,
      email: user.email || profile?.email,
      name: profile?.name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
      ...updates
    };

    // Retry logic for better reliability
    let lastError: any = null;

    for (let attempt = 1; attempt <= 3; attempt++) {
      console.log(`updateProfile: Attempt ${attempt}/3`);

      try {
        // Use upsert instead of update for better reliability
        const { data, error } = await supabase
          .from('profiles')
          .upsert(fullData, { onConflict: 'id' })
          .select()
          .single();

        if (error) {
          console.error(`updateProfile: Supabase error (attempt ${attempt})`, error.message, error.details, error.hint);
          lastError = error;

          // Wait before retry
          if (attempt < 3) {
            await new Promise(r => setTimeout(r, 800));
            continue;
          }
        } else if (data) {
          console.log('updateProfile: Success!', data);
          set({ profile: data as Profile });
          return; // Success!
        } else {
          console.error(`updateProfile: No data and no error (attempt ${attempt})`);
          lastError = new Error('No data returned from update');

          if (attempt < 3) {
            await new Promise(r => setTimeout(r, 800));
            continue;
          }
        }
      } catch (networkError) {
        console.error(`updateProfile: Network error (attempt ${attempt})`, networkError);
        lastError = networkError;

        if (attempt < 3) {
          await new Promise(r => setTimeout(r, 800));
          continue;
        }
      }
    }

    // If we get here, all retries failed
    console.error('updateProfile: All retries failed, last error:', lastError);
    throw lastError || new Error('Failed to update profile after 3 attempts');
  },

  unlockProduct: async (productIds: string | string[]) => {
    const { user, profile } = get();

    console.log('unlockProduct: Starting unlock for', productIds);

    if (!user) {
      console.error('unlockProduct: No user logged in');
      throw new Error('Vui lòng đăng nhập để lưu tiến độ');
    }

    // Fetch fresh profile to avoid stale data
    let currentProfile = profile;
    if (!currentProfile) {
      console.log('unlockProduct: Profile not in state, fetching from database...');
      const { data: freshProfile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        // If it's just that the profile record doesn't exist yet, that's okay
        if (error.code === 'PGRST116') {
          console.log('unlockProduct: Profile not found in DB, will create one on save');
          currentProfile = {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
            unlocked_products: [],
            badges: [],
            created_at: new Date().toISOString()
          } as Profile;
        } else {
          console.error('unlockProduct: Could not fetch profile', error);
          throw new Error('Lỗi kết nối: Không thể tải thông tin người dùng. Vui lòng kiểm tra mạng.');
        }
      } else if (!freshProfile) {
        console.warn('unlockProduct: Fetch returned no profile and no error, using skeleton');
        currentProfile = {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          unlocked_products: [],
          badges: [],
          created_at: new Date().toISOString()
        } as Profile;
      } else {
        currentProfile = freshProfile as Profile;
      }
      set({ profile: currentProfile });
    }

    const inputIds = Array.isArray(productIds) ? productIds : [productIds];
    const currentProducts = currentProfile.unlocked_products || [];

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

    const newBadges: string[] = [...(currentProfile.badges || [])];
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

    try {
      await get().updateProfile({
        unlocked_products: newProducts,
        badges: newBadges
      });
      console.log('unlockProduct: Complete');
    } catch (error) {
      console.error('unlockProduct: Failed to save', error);
      throw new Error('Không thể lưu tiến độ. Vui lòng thử lại.');
    }
  }
}));
