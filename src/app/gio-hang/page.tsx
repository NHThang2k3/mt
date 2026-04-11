'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Package, Sparkles, User, Loader2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useLanguageStore } from '@/store/languageStore';
import { translations } from '@/data/translations';
import { formatPrice } from '@/data/products';


export default function CartPage() {
  const { language } = useLanguageStore();
  const t = translations[language];
  const [mounted, setMounted] = useState(false);

  const [isClearing, setIsClearing] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const { user, profile, isInitialized, initialize } = useAuthStore();

  const rawTotal = getTotal();
  const titleCount = profile?.badges?.length || 0;
  let discountPercent = 0;
  if (titleCount >= 3) discountPercent = 35;
  else if (titleCount === 2) discountPercent = 25;
  else if (titleCount === 1) discountPercent = 20;
  
  const discountAmount = Math.floor(rawTotal * discountPercent / 100);
  const finalTotal = rawTotal - discountAmount;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (!isInitialized) {

      initialize();
    }
  }, [isInitialized, initialize]);

  if (!mounted || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-[var(--color-gold)] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Login required screen
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pattern-bg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center"
          >
            <User size={48} className="text-[var(--color-gold)]" />
          </motion.div>
          <h1 className="text-2xl font-bold text-[var(--color-brown)] mb-4">
            {t.pleaseLogin}
          </h1>
          <p className="text-[var(--color-brown)]/70 mb-8">
            {t.needLoginCart}
          </p>
          <Link href="/dang-nhap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center gap-2"
            >
              <User size={18} />
              {t.login}
            </motion.button>
          </Link>

        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pattern-bg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            🛒
          </motion.div>
          <h1 className="text-2xl font-bold text-[var(--color-brown)] mb-4">
            {t.emptyCart}
          </h1>
          <p className="text-[var(--color-brown)]/70 mb-8">
            {language === 'vi' ? 'Hãy khám phá các sản phẩm mứt tuyệt vời của chúng tôi' : 'Let\'s explore our amazing fruit jams'}
          </p>
          <Link href="/cua-hang">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center gap-2"
            >
              <ShoppingBag size={18} />
              {t.store}
            </motion.button>
          </Link>

        </motion.div>
      </div>
    );
  }

  const regionEmoji: Record<string, string> = {
    bac: '🌸',
    trung: '🏯',
    nam: '🥥'
  };

  return (
    <div className="min-h-screen pattern-bg py-12">
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-12 h-12 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center">
            <Package size={24} className="text-[var(--color-gold)]" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-brown)]">
              {t.cart}
            </h1>
            <p className="text-[var(--color-brown)]/60">{items.length} {t.items}</p>
          </div>

        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card p-4 flex flex-col sm:flex-row gap-4"
                >
                  {/* Product Image Placeholder */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 rounded-xl bg-gradient-to-br from-[var(--color-cream)] to-white flex items-center justify-center flex-shrink-0 shadow-inner"
                  >
                    <span className="text-4xl">{regionEmoji[item.product.region] || '🍯'}</span>
                  </motion.div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-[var(--color-brown)]">
                          {item.product.name} {item.isPack10 ? `(${t.pack10})` : ''}
                        </h3>

                        {item.selectedSelections && item.selectedSelections.length > 0 && (
                          <p className="text-xs text-[var(--color-brown)]/80 mt-1 mb-1 italic">
                            {t.selected}: {item.selectedSelections.join(', ')}
                          </p>
                        )}

                        <p className="text-sm text-[var(--color-brown)]/60">
                          {item.product.regionName}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 bg-[var(--color-cream)] rounded-full p-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                        >
                          <Minus size={14} />
                        </motion.button>
                        <span className="w-10 text-center font-bold text-[var(--color-brown)]">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                        >
                          <Plus size={14} />
                        </motion.button>
                      </div>

                      <span className="font-bold text-lg text-[var(--color-gold)]">
                        {formatPrice((item.isPack10 ? 450000 : item.product.price) * item.quantity)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={async () => {
                setIsClearing(true);
                await new Promise(resolve => setTimeout(resolve, 300));
                clearCart();
                setIsClearing(false);
              }}
              disabled={isClearing}
              className="text-red-500 hover:text-red-600 text-sm font-medium hover:underline disabled:opacity-50 flex items-center gap-2"
            >
              {isClearing ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  {t.clearing}
                </>
              ) : (
                t.clearAll
              )}
            </motion.button>

          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-6 sticky top-28"
            >
              <h2 className="text-xl font-bold text-[var(--color-brown)] mb-6 flex items-center gap-2">
                <Sparkles size={20} className="text-[var(--color-gold)]" />
                {t.cartSummary}
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[var(--color-brown)]/70">
                  <span>{t.subtotal} ({items.reduce((acc, item) => acc + item.quantity, 0)} {t.items})</span>
                  <span>{formatPrice(rawTotal)}</span>
                </div>
                
                {discountPercent > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>{t.membershipDiscount} ({discountPercent}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-[var(--color-brown)]/70">
                  <span>{t.shipping}</span>
                  <span className="text-green-600 font-medium">{t.free}</span>
                </div>
                <div className="border-t-2 border-dashed border-[var(--border)] pt-4">
                  <div className="flex justify-between text-lg font-bold text-[var(--color-brown)]">
                    <span>{t.total}</span>
                    <span className="text-xl text-[var(--color-gold)]">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={async () => {
                  setIsCheckingOut(true);
                  await new Promise(resolve => setTimeout(resolve, 300));
                  router.push('/thanh-toan');
                }}
                disabled={isCheckingOut}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {t.processing}
                  </>
                ) : (
                  <>
                    {t.checkoutBtn}
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>

              <Link
                href="/cua-hang"
                className="block text-center mt-4 text-[var(--color-brown)]/70 hover:text-[var(--color-gold)] transition-colors"
              >
                ← {t.continueShopping}
              </Link>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
