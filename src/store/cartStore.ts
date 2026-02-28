'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/data/products';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSelections?: string[];
  isPack10?: boolean;
}

interface CartState {
  items: CartItem[];
  userId: string | null;
  addItem: (product: Product, options?: { selectedSelections?: string[], isPack10?: boolean, quantity?: number }) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  setUserId: (userId: string | null) => void;
}

// Helper to generate a unique cart item ID
const generateCartItemId = (product: Product, options?: { selectedSelections?: string[], isPack10?: boolean }) => {
  let id = product.id;
  if (options?.isPack10) id += '-pack10';
  if (options?.selectedSelections?.length) {
    id += '-' + [...options.selectedSelections].sort().join('-');
  }
  return id;
};

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

      addItem: (product: Product, options?: { selectedSelections?: string[], isPack10?: boolean, quantity?: number }) => {
        set((state) => {
          const itemId = generateCartItemId(product, options);
          const existingItem = state.items.find(item => item.id === itemId);
          const addQty = options?.quantity || 1;

          let newItems: CartItem[];
          if (existingItem) {
            newItems = state.items.map(item =>
              item.id === itemId
                ? { ...item, quantity: item.quantity + addQty }
                : item
            );
          } else {
            newItems = [...state.items, {
              id: itemId,
              product,
              quantity: addQty,
              selectedSelections: options?.selectedSelections,
              isPack10: options?.isPack10
            }];
          }
          // Save to user-specific storage
          saveCartForUser(state.userId, newItems);
          return { items: newItems };
        });
      },

      removeItem: (itemId: string) => {
        set((state) => {
          const newItems = state.items.filter(item => item.id !== itemId);
          saveCartForUser(state.userId, newItems);
          return { items: newItems };
        });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => {
          const newItems = state.items.map(item =>
            item.id === itemId
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
          (total, item) => {
            const price = item.isPack10 ? 450000 : item.product.price;
            return total + price * item.quantity;
          },
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
