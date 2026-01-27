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
  unlockProduct: (productId: string) => Promise<void>;
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
    try {
      // First, handle the initial session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Session fetch error:', sessionError);
      }

      if (session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Profile fetch error:', profileError);
        }

        set({
          user: session.user,
          profile: profile || null,
          isInitialized: true,
          isLoading: false
        });

        // Sync cart with user
        const CartStore = await getCartStore();
        CartStore.getState().setUserId(session.user.id);
      } else {
        set({ isInitialized: true, isLoading: false, user: null, profile: null });
        const CartStore = await getCartStore();
        CartStore.getState().setUserId(null);
      }

      // Important: Only set up the listener ONCE
      // We check if we already have it using a global window variable or similar
      // But in Zustand, we can just check a flag in the store
      if (!(window as any).__supabaseAuthListenerSet) {
        supabase.auth.onAuthStateChange(async (event, session) => {
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            set({ user: session.user, profile: profile || null, isInitialized: true });
            const CartStore = await getCartStore();
            CartStore.getState().setUserId(session.user.id);
          } else {
            set({ user: null, profile: null, isInitialized: true });
            const CartStore = await getCartStore();
            CartStore.getState().setUserId(null);
          }
        });
        (window as any).__supabaseAuthListenerSet = true;
      }
    } catch (error) {
      console.error('Auth init error:', error);
      set({ isInitialized: true, isLoading: false });
    }
  },

  signUp: async (email, password, name) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });

      if (error) {
        set({ isLoading: false });
        return { error: error.message };
      }

      // No need to manually create profile here if Trigger is set up in SQL
      // But let's check if the trigger worked or if we should still do it for safety
      if (data.user) {
        // We wait a bit or try to fetch it to see if it exists
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
        if (!profile) {
          await supabase.from('profiles').insert({
            id: data.user.id,
            name,
            email,
            unlocked_products: [],
            badges: []
          });
        }
      }

      set({ isLoading: false });
      return { error: null };
    } catch (error) {
      set({ isLoading: false });
      return { error: 'Đã có lỗi xảy ra' };
    }
  },

  signIn: async (email, password) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        set({ isLoading: false });
        return { error: error.message };
      }

      set({ isLoading: false });
      return { error: null };
    } catch (error) {
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
    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (data) {
      set({ profile: data as Profile });
    }
  },

  unlockProduct: async (productId) => {
    const { user, profile } = get();
    if (!user || !profile) return;

    const currentProducts = profile.unlocked_products || [];
    if (currentProducts.includes(productId)) return;

    const newProducts = [...currentProducts, productId];

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

    await get().updateProfile({
      unlocked_products: newProducts,
      badges: newBadges
    });
  }
}));
