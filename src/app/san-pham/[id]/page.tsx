'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, MapPin, Heart, Share2, Minus, Plus, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { products, formatPrice } from '@/data/products';
import { posts } from '@/data/posts';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/components/Toast';
import { trackProductView, trackAddToCart, trackShare } from '@/lib/analytics';
import ProductReviews from '@/components/ProductReviews';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const product = products.find(p => p.id === productId);
  const relatedPost = posts.find(p => p.productId === productId);
  
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { user } = useAuthStore();
  const { showToast } = useToast();

  if (!product) {
    notFound();
  }

  // Track product view on mount
  useEffect(() => {
    if (product) {
      trackProductView(product.id, product.name, user?.id);
    }
  }, [product, user?.id]);

  const regionColors = {
    bac: { bg: 'from-blue-500 to-blue-600', light: 'bg-blue-50' },
    trung: { bg: 'from-orange-500 to-orange-600', light: 'bg-orange-50' },
    nam: { bg: 'from-green-500 to-green-600', light: 'bg-green-50' }
  };

  const regionEmoji = {
    bac: '🌸',
    trung: '🏯',
    nam: '🥥'
  };

  const handleAddToCart = async () => {
    if (!user) {
      showToast('error', 'Vui lòng đăng nhập để thêm vào giỏ hàng');
      router.push('/dang-nhap');
      return;
    }
    
    setIsAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    // Track add to cart
    trackAddToCart(product.id, product.name, product.price * quantity, user?.id);
    showToast('cart', `Đã thêm ${quantity} ${product.name} vào giỏ hàng`);
    setIsAddingToCart(false);
  };

  const relatedProducts = products.filter(p => p.region === product.region && p.id !== product.id);

  return (
    <div className="min-h-screen pattern-bg">
      {/* Breadcrumb */}
      <div className="section py-6">
        <Link 
          href="/cua-hang" 
          className="inline-flex items-center gap-2 text-[var(--color-brown)]/60 hover:text-[var(--color-gold)] transition-colors"
        >
          <ArrowLeft size={18} />
          Quay lại Cửa Hàng
        </Link>
      </div>

      {/* Product Section */}
      <section className="section pt-0">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className={`aspect-square rounded-3xl ${regionColors[product.region].light} flex items-center justify-center relative overflow-hidden`}>
              {/* Decorative circles */}
              <div className="absolute top-8 right-8 w-32 h-32 rounded-full border-4 border-current opacity-10" />
              <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full border-2 border-current opacity-10" />
              
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-white shadow-2xl flex items-center justify-center">
                  <span className="text-8xl md:text-9xl">{regionEmoji[product.region]}</span>
                </div>
              </motion.div>

              {/* Region Badge */}
              <div className={`absolute top-6 left-6 px-4 py-2 rounded-full bg-gradient-to-r ${regionColors[product.region].bg} text-white font-semibold shadow-lg`}>
                {product.regionName}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <span className="text-sm text-[var(--color-brown)]/50 uppercase tracking-wide mb-2">
              {product.nameEn}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-brown)] mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-[var(--color-gold)]">
                {formatPrice(product.price)}
              </span>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                Còn hàng
              </span>
            </div>

            <p className="text-[var(--color-brown)]/70 text-lg leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Story */}
            <div className="bg-[var(--color-cream)] rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-[var(--color-brown)] mb-2 flex items-center gap-2">
                <MapPin size={18} className="text-[var(--color-gold)]" />
                Câu chuyện sản phẩm
              </h3>
              <p className="text-[var(--color-brown)]/70 italic">
                "{product.story}"
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-[var(--border)]">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full hover:bg-[var(--color-cream)] flex items-center justify-center"
                >
                  <Minus size={18} />
                </motion.button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full hover:bg-[var(--color-cream)] flex items-center justify-center"
                >
                  <Plus size={18} />
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isAddingToCart ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Đang thêm...
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Thêm vào giỏ hàng
                  </>
                )}
              </motion.button>
            </div>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-[var(--color-brown)]/60 hover:text-[var(--color-red)] transition-colors">
                <Heart size={18} />
                Yêu thích
              </button>
              <button 
                onClick={() => {
                  const url = window.location.href;
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
                  trackShare('product', product.id, 'facebook', user?.id);
                }}
                className="flex items-center gap-2 text-[var(--color-brown)]/60 hover:text-[var(--color-gold)] transition-colors"
              >
                <Share2 size={18} />
                Chia sẻ Facebook
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Product Reviews */}
      <ProductReviews productId={product.id} />

      {/* Related Blog Post */}
      {relatedPost && (
        <section className="section">
          <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-6">
            Khám phá văn hóa
          </h2>
          <Link href={`/blog/${relatedPost.id}`}>
            <motion.div
              whileHover={{ y: -5 }}
              className="card p-6 flex flex-col md:flex-row gap-6"
            >
              <div className="w-full md:w-48 h-32 rounded-xl bg-[var(--color-cream)] flex items-center justify-center flex-shrink-0">
                <span className="text-4xl">{regionEmoji[product.region]}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-brown)] mb-2 hover:text-[var(--color-gold)] transition-colors">
                  {relatedPost.title}
                </h3>
                <p className="text-[var(--color-brown)]/70">{relatedPost.excerpt}</p>
              </div>
            </motion.div>
          </Link>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section">
          <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-6">
            Sản phẩm cùng miền
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/san-pham/${p.id}`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="card p-4 flex gap-4"
                >
                  <div className="w-20 h-20 rounded-xl bg-[var(--color-cream)] flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">{regionEmoji[p.region]}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-brown)] hover:text-[var(--color-gold)] transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-sm text-[var(--color-brown)]/60">{p.regionName}</p>
                    <p className="font-bold text-[var(--color-gold)] mt-1">{formatPrice(p.price)}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
