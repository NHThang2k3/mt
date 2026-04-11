'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Region = 'bac' | 'trung' | 'nam';
export type Badge = 'khoi-hanh' | 'ket-noi' | 'dai-su';

interface UserState {
  isLoggedIn: boolean;
  user: {
    name: string;
    email: string;
  } | null;
  unlockedProducts: string[];
  badges: Badge[];

  login: (name: string, email: string) => void;
  logout: () => void;
  unlockProduct: (productId: string) => void;
  checkBadges: () => void;
  getUnlockedRegions: () => Region[];
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      unlockedProducts: [],
      badges: [],

      login: (name: string, email: string) => {
        set({ isLoggedIn: true, user: { name, email } });
      },

      logout: () => {
        set({ isLoggedIn: false, user: null });
      },

      unlockProduct: (productId: string) => {
        set((state) => {
          if (state.unlockedProducts.includes(productId)) {
            return state;
          }
          return { unlockedProducts: [...state.unlockedProducts, productId] };
        });
        get().checkBadges();
      },

      checkBadges: () => {
        const { unlockedProducts, badges } = get();
        const newBadges: Badge[] = [...badges];

        // Check unlocked regions
        const bacProducts = ['bac-man', 'bac-mo'];
        const trungProducts = ['trung-sen', 'trung-dau'];
        const namProducts = ['nam-dua', 'nam-mangcau'];

        const hasBac = bacProducts.every(id => unlockedProducts.includes(id));
        const hasTrung = trungProducts.every(id => unlockedProducts.includes(id));
        const hasNam = namProducts.every(id => unlockedProducts.includes(id));

        const completedRegions = [hasBac, hasTrung, hasNam].filter(Boolean).length;

        // Badge logic
        if (completedRegions >= 1 && !newBadges.includes('khoi-hanh')) {
          newBadges.push('khoi-hanh');
        }
        if (completedRegions >= 2 && !newBadges.includes('ket-noi')) {
          newBadges.push('ket-noi');
        }
        if (completedRegions >= 3 && !newBadges.includes('dai-su')) {
          newBadges.push('dai-su');
        }

        set({ badges: newBadges });
      },

      getUnlockedRegions: () => {
        const { unlockedProducts } = get();
        const regions: Region[] = [];

        const bacProducts = ['bac-man', 'bac-mo'];
        const trungProducts = ['trung-sen', 'trung-dau'];
        const namProducts = ['nam-dua', 'nam-mangcau'];

        if (bacProducts.every(id => unlockedProducts.includes(id))) regions.push('bac');
        if (trungProducts.every(id => unlockedProducts.includes(id))) regions.push('trung');
        if (namProducts.every(id => unlockedProducts.includes(id))) regions.push('nam');

        return regions;
      }
    }),
    {
      name: 'user-storage'
    }
  )
);

export const badgeInfo = {
  'khoi-hanh': {
    name: 'Người Khởi Hành Di Sản',
    nameEn: 'Heritage Explorer',
    description: 'Bạn đã khám phá trọn vẹn văn hóa ẩm thực của một miền!',
    descriptionEn: 'You have fully explored the culinary culture of one region!',
    icon: '🌟'
  },
  'ket-noi': {
    name: 'Người Kết Nối Văn Hóa',
    nameEn: 'Culture Connector',
    description: 'Bạn đã kết nối văn hóa ẩm thực của hai miền Việt Nam!',
    descriptionEn: 'You have connected the culinary culture of two regions in Vietnam!',
    icon: '🏆'
  },
  'dai-su': {
    name: 'Đại Sứ Di Sản Việt',
    nameEn: 'Vietnam Heritage Ambassador',
    description: 'Bạn đã trở thành Đại Sứ Di Sản, khám phá trọn vẹn hương vị 3 miền!',
    descriptionEn: 'You are now a Heritage Ambassador, having fully explored the flavors of all 3 regions!',
    icon: '👑'
  }
};

