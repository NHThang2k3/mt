'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle, XCircle, Loader2, MapPin, Lock } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { products } from '@/data/products';
import { badgeInfo } from '@/store/userStore';
import Link from 'next/link';

function UnlockContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');
  
  const { user, profile, unlockProduct, initialize, isInitialized } = useAuthStore();
  const [status, setStatus] = useState<'loading' | 'success' | 'already' | 'error' | 'login-required'>('loading');
  const [unlockedProduct, setUnlockedProduct] = useState<typeof products[0] | null>(null);
  const [newBadge, setNewBadge] = useState<string | null>(null);
  const [isUnlockAll, setIsUnlockAll] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      initialize();
      return;
    }

    const processUnlock = async () => {
      if (!code) {
        setStatus('error');
        return;
      }

      // Check if user is logged in
      if (!user) {
        setStatus('login-required');
        return;
      }

      // Get current badges before unlock
      const previousBadges = profile?.badges || [];

      // Check for special "unlock all" code
      if (code === 'VIETCHARM_ALL') {
        // Unlock all 6 products
        const allProductIds = ['bac-man', 'bac-mo', 'trung-sen', 'trung-dau', 'nam-dua', 'nam-mangcau'];
        
        for (const productId of allProductIds) {
          if (!profile?.unlocked_products?.includes(productId)) {
            await unlockProduct(productId);
          }
        }

        // Mark as unlock all
        setIsUnlockAll(true);
        
        // Fire big confetti for unlocking all!
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.5 }
        });

        // Set the highest badge
        setNewBadge('dai-su');
        setStatus('success');
        return;
      }

      // Find product by code (format: REGION_PRODUCT_XX, e.g., BAC_MAN_01)
      const productId = code.toLowerCase().replace(/_\d+$/, '').replace('_', '-');
      const product = products.find(p => p.id === productId);

      if (!product) {
        setStatus('error');
        return;
      }

      setUnlockedProduct(product);

      // Check if already unlocked
      if (profile?.unlocked_products?.includes(productId)) {
        setStatus('already');
        return;
      }

      // Unlock the product
      await unlockProduct(productId);

      // Check for new badge
      const currentProfile = useAuthStore.getState().profile;
      const currentBadges = currentProfile?.badges || [];
      const newBadges = currentBadges.filter(b => !previousBadges.includes(b));
      
      if (newBadges.length > 0) {
        setNewBadge(newBadges[0]);
        // Fire confetti for new badge!
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        // Small confetti for product unlock
        confetti({
          particleCount: 50,
          spread: 40,
          origin: { y: 0.7 }
        });
      }

      setStatus('success');
    };

    processUnlock();
  }, [code, user, profile, isInitialized, initialize, unlockProduct]);

  if (status === 'loading') {
    return (
      <div className="text-center">
        <Loader2 size={48} className="animate-spin text-[var(--color-gold)] mx-auto mb-4" />
        <p className="text-[var(--color-brown)]">Đang mở khóa...</p>
      </div>
    );
  }

  if (status === 'login-required') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-20 h-20 rounded-full bg-[var(--color-gold)]/20 mx-auto flex items-center justify-center mb-6">
          <Lock size={40} className="text-[var(--color-gold)]" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-brown)] mb-4">
          Vui Lòng Đăng Nhập
        </h1>
        <p className="text-[var(--color-brown)]/70 mb-8">
          Bạn cần đăng nhập để mở khóa sản phẩm và thắp sáng Bản Đồ Di Sản
        </p>
        <Link 
          href={`/dang-nhap?redirect=/unlock?code=${code}`}
          className="btn-primary inline-flex items-center gap-2"
        >
          Đăng Nhập Ngay
        </Link>
      </motion.div>
    );
  }

  if (status === 'error') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-20 h-20 rounded-full bg-red-100 mx-auto flex items-center justify-center mb-6">
          <XCircle size={40} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-brown)] mb-4">
          Mã Không Hợp Lệ
        </h1>
        <p className="text-[var(--color-brown)]/70 mb-8">
          Mã QR này không hợp lệ hoặc đã hết hạn.
        </p>
        <Link href="/" className="btn-primary">
          Về Trang Chủ
        </Link>
      </motion.div>
    );
  }

  if (status === 'already') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-20 h-20 rounded-full bg-blue-100 mx-auto flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-blue-500" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-brown)] mb-4">
          Đã Mở Khóa Trước Đó
        </h1>
        <p className="text-[var(--color-brown)]/70 mb-2">
          Sản phẩm <strong>{unlockedProduct?.name}</strong> đã được mở khóa trong bản đồ của bạn.
        </p>
        <Link href="/ban-do" className="btn-primary inline-flex items-center gap-2 mt-6">
          <MapPin size={18} />
          Xem Bản Đồ
        </Link>
      </motion.div>
    );
  }

  // Success state
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className="w-20 h-20 rounded-full gradient-gold mx-auto flex items-center justify-center mb-6">
        <CheckCircle size={40} className="text-white" />
      </div>
      
      <h1 className="text-2xl font-bold text-[var(--color-brown)] mb-2">
        Mở Khóa Thành Công! 🎉
      </h1>
      
      <p className="text-[var(--color-brown)]/70 mb-6">
        {isUnlockAll ? (
          <>Bạn đã mở khóa <strong className="text-[var(--color-gold)]">toàn bộ 6 sản phẩm</strong> từ ba miền Việt Nam!</>
        ) : (
          <>Bạn đã mở khóa <strong className="text-[var(--color-gold)]">{unlockedProduct?.name}</strong></>
        )}
      </p>

      {/* New Badge Alert */}
      {newBadge && badgeInfo[newBadge as keyof typeof badgeInfo] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-[var(--color-gold)]/20 to-[var(--color-red)]/20 border-2 border-[var(--color-gold)]"
        >
          <span className="text-4xl mb-2 block">
            {badgeInfo[newBadge as keyof typeof badgeInfo].icon}
          </span>
          <p className="text-lg font-bold text-[var(--color-brown)]">
            Danh Hiệu Mới!
          </p>
          <p className="text-xl font-bold text-[var(--color-gold)]">
            {badgeInfo[newBadge as keyof typeof badgeInfo].name}
          </p>
          <p className="text-sm text-[var(--color-brown)]/70 mt-2">
            {badgeInfo[newBadge as keyof typeof badgeInfo].description}
          </p>
        </motion.div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/ban-do" className="btn-primary inline-flex items-center justify-center gap-2">
          <MapPin size={18} />
          Xem Bản Đồ Di Sản
        </Link>
        <Link href="/cua-hang" className="btn-secondary inline-flex items-center justify-center gap-2">
          Tiếp Tục Mua Sắm
        </Link>
      </div>
    </motion.div>
  );
}

export default function UnlockPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pattern-bg py-12 px-4">
      <div className="card p-8 max-w-md w-full">
        <Suspense fallback={
          <div className="text-center">
            <Loader2 size={48} className="animate-spin text-[var(--color-gold)] mx-auto mb-4" />
            <p className="text-[var(--color-brown)]">Đang tải...</p>
          </div>
        }>
          <UnlockContent />
        </Suspense>
      </div>
    </div>
  );
}
