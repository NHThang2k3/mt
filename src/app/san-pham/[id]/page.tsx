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
import { useLanguageStore } from '@/store/languageStore';
import { translations } from '@/data/translations';

export default function ProductDetailPage() {
  const { language } = useLanguageStore();
  const t = translations[language];

  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const product = products.find(p => p.id === productId);
  const relatedPost = posts.find(p => p.productId === productId);
  
  const [activeImage, setActiveImage] = useState(product?.image || '');
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isPack10, setIsPack10] = useState(false);
  const [selectedSelections, setSelectedSelections] = useState<string[]>([]);
  const addItem = useCartStore((state) => state.addItem);
  const { user } = useAuthStore();
  const { showToast } = useToast();

  useEffect(() => {
    if (product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveImage(product.image);
    }
  }, [product?.image]);


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
    nam: { bg: 'from-green-500 to-green-600', light: 'bg-green-50' },
    combo: { bg: 'from-amber-500 to-red-500', light: 'bg-amber-50' }
  };

  const regionEmoji = {
    bac: '🍑',
    trung: '🌸',
    nam: '🥥',
    combo: '🎁'
  };

  // Product-specific emoji mapping
  const productEmoji: Record<string, string> = {
    'bac-man': '🍑',
    'bac-mo': '🍑',
    'trung-sen': '🌸',
    'trung-dau': '🍓',
    'nam-dua': '🥥',
    'nam-mangcau': '🍈',
    'combo-6-vi': '🎁'
  };

  const handleAddToCart = async () => {
    if (!user) {
      showToast('error', language === 'vi' ? 'Vui lòng đăng nhập để thêm vào giỏ hàng' : 'Please login to add to cart');
      router.push('/dang-nhap');
      return;
    }
    
    if (product.comboChoices && selectedSelections.length !== product.comboChoices) {
      showToast('error', language === 'vi' ? `Vui lòng chọn đủ ${product.comboChoices} hương vị` : `Please choose all ${product.comboChoices} flavors`);
      return;
    }


    setIsAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    addItem(product, {
      selectedSelections: product.comboChoices ? selectedSelections : undefined,
      isPack10: !product.isCombo ? isPack10 : false,
      quantity
    });
    // Track add to cart
    trackAddToCart(product.id, product.name, (isPack10 ? 450000 : product.price) * quantity, user?.id);
    showToast('cart', language === 'vi' 
      ? `Đã thêm ${quantity} ${isPack10 ? 'Gói 10 hũ ' : ''}${product.name} vào giỏ hàng`
      : `Added ${quantity} ${isPack10 ? 'Pack of 10 ' : ''}${product.nameEn} to cart`);

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
          {t.backToStore}
        </Link>

      </div>

      {/* Product Section */}
      <section className="section pt-0">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4"
          >
            {/* Main Image */}
            <div className="relative">
              {activeImage && !activeImage.includes('/products/') ? (
                /* Full-size product image */
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative bg-white">
                  <motion.img 
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={activeImage} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Region Badge */}
                  <div className={`absolute top-6 left-6 px-4 py-2 rounded-full bg-gradient-to-r ${regionColors[product.region].bg} text-white font-semibold shadow-lg`}>
                    {language === 'vi' ? product.regionName : product.regionNameEn}
                  </div>

                </div>
              ) : (
                /* Fallback with emoji */
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
                    <div className="w-56 h-56 md:w-72 md:h-72 rounded-2xl bg-white shadow-2xl flex items-center justify-center">
                      <span className="text-8xl md:text-9xl">{productEmoji[product.id] || regionEmoji[product.region]}</span>
                    </div>
                  </motion.div>

                  {/* Region Badge */}
                  <div className={`absolute top-6 left-6 px-4 py-2 rounded-full bg-gradient-to-r ${regionColors[product.region].bg} text-white font-semibold shadow-lg`}>
                    {language === 'vi' ? product.regionName : product.regionNameEn}
                  </div>

                </div>
              )}
            </div>

            {/* Album Thumbnails */}
            {product.album && product.album.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.album.map((img, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImage === img ? 'border-[var(--color-gold)] shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            )}
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
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-brown)] mb-2">
              {language === 'vi' ? product.name : product.nameEn}
            </h1>
            <p className="text-lg text-[var(--color-brown)]/50 font-medium mb-4">
              {language === 'vi' ? product.nameEn : product.name}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-[var(--color-gold)]">
                {formatPrice(isPack10 ? 450000 : product.price)}
              </span>
              {product.weight && (
                <span className="text-lg text-[var(--color-brown)]/60">
                   {isPack10 ? '/ 10 hũ x 250g' : `/ ${product.weight}`}
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                {t.inStock}
              </span>
            </div>

            <p className="text-[var(--color-brown)]/70 text-lg leading-relaxed mb-6">
              {language === 'vi' ? product.description : product.descriptionEn}
            </p>


            {/* Story */}
            <div className="bg-[var(--color-cream)] rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-[var(--color-brown)] mb-2 flex items-center gap-2">
                <MapPin size={18} className="text-[var(--color-gold)]" />
                {t.productStory}
              </h3>
              <p className="text-[var(--color-brown)]/70 italic">
                &quot;{language === 'vi' ? product.story : product.storyEn}&quot;
              </p>

            </div>

            {/* Options for Combo */}
            {product.comboChoices && (
              <div className="mb-6">
                <h3 className="font-semibold text-[var(--color-brown)] mb-3">
                  {t.chooseFlavors} ({selectedSelections.length}/{product.comboChoices}):
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {products.filter(p => !p.isCombo).map(p => {
                    const isSelected = selectedSelections.includes(p.name);
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedSelections(prev => prev.filter(name => name !== p.name));
                          } else if (selectedSelections.length < product.comboChoices!) {
                            setSelectedSelections(prev => [...prev, p.name]);
                          } else {
                            showToast('error', t.maxFlavors);
                          }
                        }}
                        className={`p-3 rounded-xl border-2 text-left transition-colors flex items-center gap-2 ${
                          isSelected 
                            ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-brown)]' 
                            : 'border-[var(--border)] hover:border-[var(--color-gold)]/50 text-[var(--color-brown)]/80'
                        }`}
                      >
                        <span className="text-xl">{productEmoji[p.id]}</span>
                        <span className="text-sm font-medium leading-tight">{p.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Pack of 10 Option for Regular Products */}
            {!product.isCombo && (
              <div className="mb-6">
                <h3 className="font-semibold text-[var(--color-brown)] mb-3">{t.purchaseOptions}:</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setIsPack10(false)}
                    className={`flex-1 p-3 rounded-xl border-2 text-center transition-colors ${
                      !isPack10 
                        ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-brown)] font-bold' 
                        : 'border-[var(--border)] hover:border-[var(--color-gold)]/50 text-[var(--color-brown)]/80'
                    }`}
                  >
                    {t.singleJar} (250g) <br />
                    <span className="text-[var(--color-gold)] font-bold">{formatPrice(product.price)}</span>
                  </button>
                  <button
                        onClick={() => setIsPack10(!isPack10)}
                        className={`flex-1 p-3 rounded-xl border-2 transition-all text-left ${
                          isPack10 
                            ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/5' 
                            : 'border-[var(--border)] hover:border-[var(--color-gold)]/30'
                        }`}
                      >
                        <p className="font-bold text-[var(--color-brown)]">{t.pack10Option}</p>
                        <p className="text-sm text-[var(--color-gold)] font-bold">450.000đ</p>
                      </button>

                </div>
              </div>
            )}

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
                    <span className="sm:hidden">{t.adding}</span>
                    <span className="hidden sm:inline">{t.adding}</span>
                  </>

                ) : (
                  <>
                    <ShoppingCart size={20} />
                    <span className="sm:hidden">{t.addToCart}</span>
                    <span className="hidden sm:inline">{t.addToCart}</span>
                  </>

                )}
              </motion.button>
            </div>

            <a 
              href="https://www.facebook.com/Omni9.EM.VietCharm/?rdid=JNezluwJcQ30VNhc" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mb-6 btn-secondary text-center flex items-center justify-center gap-2 py-3 border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-white transition-colors rounded-full"
            >
              <Share2 size={18} />
              {t.bulkPurchase}
            </a>


            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-[var(--color-brown)]/60 hover:text-[var(--color-red)] transition-colors">
                <Heart size={18} />
                {t.wishlist}
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
                {t.shareFacebook}
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
            {t.exploreCulture}
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
                  {language === 'vi' ? relatedPost.title : relatedPost.titleEn}
                </h3>
                <p className="text-[var(--color-brown)]/70">{language === 'vi' ? relatedPost.excerpt : relatedPost.excerptEn}</p>
              </div>
            </motion.div>
          </Link>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section">
          <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-6">
            {t.relatedRegions}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/san-pham/${p.id}`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="card p-4 flex flex-row gap-4"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[var(--color-cream)] flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl sm:text-3xl">{regionEmoji[p.region]}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-[var(--color-brown)] hover:text-[var(--color-gold)] transition-colors text-sm sm:text-base line-clamp-2">
                      {language === 'vi' ? p.name : p.nameEn}
                    </h3>


                    <p className="text-xs sm:text-sm text-[var(--color-brown)]/60">{language === 'vi' ? p.regionName : p.regionNameEn}</p>

                    <p className="font-bold text-[var(--color-gold)] mt-1 text-sm sm:text-base">{formatPrice(p.price)}</p>
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
