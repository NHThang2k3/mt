'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Product, formatPrice } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/components/Toast';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const { user } = useAuthStore();
  const { showToast } = useToast();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const regionColors = {
    bac: { bg: 'from-blue-500 to-blue-600', light: 'bg-blue-100' },
    trung: { bg: 'from-orange-500 to-orange-600', light: 'bg-orange-100' },
    nam: { bg: 'from-green-500 to-green-600', light: 'bg-green-100' }
  };

  const regionEmoji = {
    bac: '🌸',
    trung: '🏯',
    nam: '🥥'
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      showToast('error', 'Vui lòng đăng nhập để thêm vào giỏ hàng');
      router.push('/dang-nhap');
      return;
    }
    
    setIsAddingToCart(true);
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    addItem(product);
    showToast('cart', `Đã thêm ${product.name} vào giỏ hàng`);
    setIsAddingToCart(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link href={`/san-pham/${product.id}`}>
        <div className="card overflow-hidden cursor-pointer">
          {/* Image Container */}
          <div className="relative h-40 sm:h-64 overflow-hidden">
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${regionColors[product.region].light} to-white`} />
            
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-4 border-current" />
              <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full border-2 border-current" />
            </div>
            
            {/* Product Emoji/Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-white/80 backdrop-blur-sm shadow-xl flex items-center justify-center">
                  <span className="text-4xl sm:text-6xl">{regionEmoji[product.region]}</span>
                </div>
                {/* Sparkle effect */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4"
                >
                  <Sparkles className="absolute top-0 left-1/2 text-[var(--color-gold)] opacity-60" size={16} />
                  <Sparkles className="absolute bottom-0 right-0 text-[var(--color-gold)] opacity-40" size={12} />
                </motion.div>
              </motion.div>
            </div>
            
            {/* Region Badge */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className={`absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r ${regionColors[product.region].bg} text-white text-xs font-semibold shadow-lg`}
            >
              {product.regionName}
            </motion.div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-8">
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="w-12 h-12 rounded-full bg-white text-[var(--color-gold)] flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 disabled:opacity-70"
                >
                  {isAddingToCart ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <ShoppingCart size={20} />
                  )}
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-full bg-white text-[var(--color-brown)] flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
                >
                  <Eye size={20} />
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const url = `${window.location.protocol}//${window.location.host}/san-pham/${product.id}`;
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
                  }}
                  className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    width="20" 
                    height="20" 
                    fill="currentColor"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-3 sm:p-5">
            <h3 className="text-sm sm:text-lg font-bold text-[var(--color-brown)] mb-1 group-hover:text-[var(--color-gold)] transition-colors line-clamp-1">
              {product.name}
            </h3>
            {/* Hide on mobile */}
            <p className="hidden sm:block text-xs text-[var(--color-brown)]/50 mb-2 uppercase tracking-wide">
              {product.nameEn}
            </p>
            <p className="hidden sm:block text-sm text-[var(--color-brown)]/70 line-clamp-2 mb-4">
              {product.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mt-2 sm:mt-0">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-base sm:text-xl font-bold text-[var(--color-gold)]">
                  {formatPrice(product.price)}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full sm:w-auto px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-dark)] text-white text-xs sm:text-sm font-medium shadow-lg hover:shadow-xl transition-shadow disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isAddingToCart ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span className="hidden sm:inline">Đang thêm...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={14} className="sm:hidden" />
                    <span className="hidden sm:inline">Thêm</span>
                    <span className="sm:hidden">Thêm</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
