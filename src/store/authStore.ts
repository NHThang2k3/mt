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
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        set({ user: session.user, profile, isInitialized: true });
        // Sync cart with user
        getCartStore().then(store => store.getState().setUserId(session.user.id));
      } else {
        set({ isInitialized: true });
        // Reset to guest cart
        getCartStore().then(store => store.getState().setUserId(null));
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          set({ user: session.user, profile });
          // Sync cart with user
          getCartStore().then(store => store.getState().setUserId(session.user.id));
        } else {
          set({ user: null, profile: null });
          // Reset to guest cart
          getCartStore().then(store => store.getState().setUserId(null));
        }
      });
    } catch (error) {
      console.error('Auth init error:', error);
      set({ isInitialized: true });
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

      if (data.user) {
        // Create profile
        await supabase.from('profiles').insert({
          id: data.user.id,
          name,
          email,
          unlocked_products: [],
          badges: []
        });
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
    await supabase.auth.signOut();
    set({ user: null, profile: null });
    // Reset cart to guest
    getCartStore().then(store => store.getState().setUserId(null));
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
    const bacProducts = ['bac-sen', 'bac-quat'];
    const trungProducts = ['trung-gung', 'trung-me'];
    const namProducts = ['nam-dua', 'nam-tac'];

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
