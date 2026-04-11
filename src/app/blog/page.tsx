'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, MapPin } from 'lucide-react';
import { posts } from '@/data/posts';
import { products } from '@/data/products';
import { useLanguageStore } from '@/store/languageStore';
import { translations } from '@/data/translations';


export default function BlogPage() {
  const { language } = useLanguageStore();
  const t = translations[language];
  const regionColors = {

    bac: 'from-green-500 to-emerald-600',
    trung: 'from-purple-500 to-pink-600',
    nam: 'from-orange-500 to-amber-600'
  };

  const regionNames = {
    bac: t.north,
    trung: t.central,
    nam: t.south
  };


  const regionEmoji = {
    bac: '🍑',
    trung: '🌸',
    nam: '🥥'
  };

  // Product-specific emoji mapping
  const productEmoji: Record<string, string> = {
    'bac-man': '🍑',
    'bac-mo': '🍑',
    'trung-sen': '🌸',
    'trung-dau': '🍓',
    'nam-dua': '🥥',
    'nam-mangcau': '🍈'
  };

  // Get product image by productId
  const getProductImage = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product?.image && !product.image.includes('/products/')) {
      return product.image;
    }
    return null;
  };

  return (
    <div className="min-h-screen pattern-bg">
      {/* Header */}
      <section className="py-8 md:py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-brown)] mb-4">
            {t.cultureTitle}
          </h1>
          <p className="text-[var(--color-brown)]/70 max-w-2xl mx-auto px-4">
            {t.cultureDesc}
          </p>
        </motion.div>

      </section>

      {/* Blog Grid */}
      <section className="section pt-0">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            const productImage = getProductImage(post.productId);
            
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.id}`} className="block group">
                  <div className="card overflow-hidden">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      {productImage ? (
                        <>
                          <img 
                            src={productImage} 
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-[var(--color-cream-dark)] flex items-center justify-center">
                          <span className="text-6xl opacity-50">
                            {productEmoji[post.productId] || regionEmoji[post.region]}
                          </span>
                        </div>
                      )}
                      
                      {/* Region Badge */}
                      <div className={`absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r ${regionColors[post.region]} text-white text-xs font-semibold flex items-center gap-1`}>
                        <MapPin size={12} />
                        {regionNames[post.region]}
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[var(--color-gold)]/0 group-hover:bg-[var(--color-gold)]/20 transition-colors duration-300" />
                    </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-[var(--color-brown)]/60 mb-3">
                      <Calendar size={14} />
                      <span>{new Date(post.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')}</span>
                    </div>
                    
                    <h2 className="text-lg font-bold text-[var(--color-brown)] mb-2 group-hover:text-[var(--color-gold)] transition-colors line-clamp-2">
                      {language === 'vi' ? post.title : post.titleEn}
                    </h2>
                    
                    <p className="text-[var(--color-brown)]/70 text-sm line-clamp-3 mb-4">
                      {language === 'vi' ? post.excerpt : post.excerptEn}
                    </p>


                    <span className="inline-flex items-center gap-1 text-[var(--color-gold)] font-medium text-sm group-hover:gap-2 transition-all">
                      {t.readMore}
                      <ArrowRight size={16} />
                    </span>

                  </div>
                </div>
              </Link>
            </motion.article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
