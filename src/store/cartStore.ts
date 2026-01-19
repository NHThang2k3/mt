'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  userId: string | null;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  setUserId: (userId: string | null) => void;
}

// Helper to get storage key for a user
const getStorageKey = (userId: string | null) => {
  return userId ? `cart-storage-${userId}` : 'cart-storage-guest';
};

// Helper to load cart from localStorage for a specific user
const loadCartForUser = (userId: string | null): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const key = getStorageKey(userId);
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.state?.items || [];
    }
  } catch (e) {
    console.error('Error loading cart:', e);
  }
  return [];
};

// Helper to save cart to localStorage for a specific user
const saveCartForUser = (userId: string | null, items: CartItem[]) => {
  if (typeof window === 'undefined') return;
  const key = getStorageKey(userId);
  try {
    localStorage.setItem(key, JSON.stringify({ state: { items, userId }, version: 0 }));
  } catch (e) {
    console.error('Error saving cart:', e);
  }
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      userId: null,

      addItem: (product: Product) => {
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id);
          let newItems: CartItem[];
          if (existingItem) {
            newItems = state.items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            newItems = [...state.items, { product, quantity: 1 }];
          }
          // Save to user-specific storage
          saveCartForUser(state.userId, newItems);
          return { items: newItems };
        });
      },

      removeItem: (productId: string) => {
        set((state) => {
          const newItems = state.items.filter(item => item.product.id !== productId);
          saveCartForUser(state.userId, newItems);
          return { items: newItems };
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => {
          const newItems = state.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          );
          saveCartForUser(state.userId, newItems);
          return { items: newItems };
        });
      },

      clearCart: () => {
        const userId = get().userId;
        saveCartForUser(userId, []);
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      setUserId: (userId: string | null) => {
        // Load cart for the new user
        const items = loadCartForUser(userId);
        set({ userId, items });
      }
    }),
    {
      name: 'cart-storage-current',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ userId: state.userId }),
    }
  )
);
