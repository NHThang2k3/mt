'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, CreditCard, Truck, User, MapPin, Phone, Mail } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { formatPrice } from '@/data/products';
import { trackPurchase } from '@/lib/analytics';

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, getTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    note: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[var(--color-gold)] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (items.length === 0) {
    router.push('/gio-hang');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Track purchase
    const orderId = `MUT3MIEN_${Date.now().toString().slice(-6)}`;
    const total = getTotal();
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    trackPurchase(orderId, total, itemCount, user?.id);
    
    setStep(3);
    setIsSubmitting(false);
  };

  const handleComplete = () => {
    clearCart();
    router.push('/');
  };

  return (
    <div className="min-h-screen pattern-bg py-12">
      <div className="section max-w-4xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[
            { num: 1, label: 'Thông tin' },
            { num: 2, label: 'Thanh toán' },
            { num: 3, label: 'Hoàn tất' }
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s.num 
                  ? 'gradient-gold text-white' 
                  : 'bg-white text-[var(--color-brown)]/50'
              }`}>
                {step > s.num ? <Check size={20} /> : s.num}
              </div>
              <span className={`ml-2 hidden sm:block ${
                step >= s.num ? 'text-[var(--color-brown)]' : 'text-[var(--color-brown)]/50'
              }`}>
                {s.label}
              </span>
              {i < 2 && (
                <div className={`w-12 h-1 mx-4 rounded ${
                  step > s.num ? 'bg-[var(--color-gold)]' : 'bg-white'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Shipping Info */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-8"
          >
            <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-6 flex items-center gap-2">
              <Truck size={24} />
              Thông Tin Giao Hàng
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-brown)] mb-2">
                  <User size={16} className="inline mr-1" /> Họ và Tên *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-brown)] mb-2">
                  <Phone size={16} className="inline mr-1" /> Số Điện Thoại *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                  placeholder="0123 456 789"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--color-brown)] mb-2">
                  <Mail size={16} className="inline mr-1" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                  placeholder="email@example.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--color-brown)] mb-2">
                  <MapPin size={16} className="inline mr-1" /> Địa Chỉ Giao Hàng *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                  placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--color-brown)] mb-2">
                  Ghi Chú
                </label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors resize-none"
                  placeholder="Ghi chú cho đơn hàng (tùy chọn)"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!formData.name || !formData.phone || !formData.address}
              className="btn-primary w-full mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Tiếp Tục Thanh Toán
            </button>
          </motion.div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-8"
          >
            <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-6 flex items-center gap-2">
              <CreditCard size={24} />
              Thanh Toán
            </h2>

            {/* Order Summary */}
            <div className="bg-[var(--color-cream)] rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-[var(--color-brown)] mb-4">Đơn hàng của bạn</h3>
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between py-2 border-b border-[var(--border)] last:border-0">
                  <span className="text-[var(--color-brown)]/80">
                    {item.product.name} x {item.quantity}
                  </span>
                  <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-4 mt-2 border-t-2 border-[var(--color-gold)]">
                <span className="font-bold text-[var(--color-brown)]">Tổng cộng</span>
                <span className="font-bold text-xl text-[var(--color-gold)]">{formatPrice(getTotal())}</span>
              </div>
            </div>

            {/* VietQR Payment */}
            <div className="text-center mb-6">
              <p className="text-[var(--color-brown)]/80 mb-4">
                Quét mã QR để chuyển khoản
              </p>
              <div className="inline-block p-4 bg-white rounded-2xl shadow-lg">
                {/* Placeholder QR Code */}
                <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-xl">
                  <div className="text-center">
                    <span className="text-4xl">📱</span>
                    <p className="text-xs text-gray-500 mt-2">VietQR</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-[var(--color-brown)]/60">
                Nội dung chuyển khoản: <span className="font-mono font-bold">MUT3MIEN_{Date.now().toString().slice(-6)}</span>
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary flex-1"
              >
                Quay Lại
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                {isSubmitting ? 'Đang xử lý...' : 'Xác Nhận Đã Chuyển Khoản'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Complete */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-8 text-center"
          >
            <div className="w-20 h-20 rounded-full gradient-gold mx-auto flex items-center justify-center mb-6">
              <Check size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-4">
              Đặt Hàng Thành Công!
            </h2>
            <p className="text-[var(--color-brown)]/70 mb-8">
              Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.
              <br />
              Đừng quên quét mã QR trên sản phẩm để thắp sáng Bản Đồ Di Sản!
            </p>
            <button onClick={handleComplete} className="btn-primary">
              Về Trang Chủ
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
