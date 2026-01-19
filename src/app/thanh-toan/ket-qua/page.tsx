'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, X, Loader2, Package, Home } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useCartStore } from '@/store/cartStore';

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCartStore();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    async function verifyPayment() {
      try {
        const response = await fetch(`/api/vnpay/verify?${searchParams.toString()}`);
        const data = await response.json();

        if (data.success) {
          setStatus('success');
          setOrderId(data.orderId);
          
          // Update order status in Supabase
          if (data.orderId) {
            await supabase
              .from('orders')
              .update({ status: 'confirmed', payment_status: 'paid' })
              .eq('id', data.orderId);
          }
          
          clearCart();
        } else {
          setStatus('failed');
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setStatus('failed');
      }
    }

    verifyPayment();
  }, [searchParams, clearCart]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-8 max-w-lg w-full text-center shadow-2xl"
      >
        {status === 'loading' && (
          <div className="space-y-4">
            <Loader2 className="w-16 h-16 text-[var(--color-gold)] animate-spin mx-auto" />
            <h2 className="text-2xl font-bold text-[var(--color-brown)]">Đang xác thực thanh toán...</h2>
            <p className="text-[var(--color-brown)]/60">Vui lòng không đóng trình duyệt.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-[var(--color-brown)]">Thanh Toán Thành Công!</h2>
            <p className="text-[var(--color-brown)]/70">
              Cảm ơn bạn đã mua hàng. Đơn hàng <strong>#{orderId?.slice(0, 8).toUpperCase()}</strong> của bạn đang được xử lý.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={() => router.push('/don-hang')}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Package size={20} />
                Xem đơn hàng
              </button>
              <button
                onClick={() => router.push('/')}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Home size={20} />
                Về trang chủ
              </button>
            </div>
          </div>
        )}

        {status === 'failed' && (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <X className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-[var(--color-brown)]">Thanh Toán Thất Bại</h2>
            <p className="text-[var(--color-brown)]/70">
              Đã có lỗi xảy ra trong quá trình thanh toán hoặc giao dịch đã bị hủy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={() => router.push('/thanh-toan')}
                className="btn-primary"
              >
                Thử thanh toán lại
              </button>
              <button
                onClick={() => router.push('/')}
                className="btn-secondary"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <div className="min-h-screen pattern-bg py-12">
      <Suspense fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-[var(--color-gold)] animate-spin" />
        </div>
      }>
        <PaymentResultContent />
      </Suspense>
    </div>
  );
}
