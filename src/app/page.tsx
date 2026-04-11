'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Sparkles, Gift } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useLanguageStore } from '@/store/languageStore';
import { translations } from '@/data/translations';

export default function Home() {
  const { language } = useLanguageStore();
  const t = translations[language];
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pattern-bg">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[var(--color-gold)]/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[var(--color-red)]/10 blur-3xl" />
        
        <div className="section w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-sm font-medium mb-6">
                <Sparkles size={16} />
                {t.heroSparkle}
              </span>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                <span className="text-gradient">VietCharm</span>
                <br />
                <span className="text-[var(--color-brown)]">{t.heroTitle}</span>
              </h1>
              
              <p className="text-lg text-[var(--color-brown)]/80 mb-8 max-w-lg leading-relaxed">
                {t.heroDesc}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/blog" className="btn-primary flex items-center gap-2">
                  {t.exploreNow}
                  <ArrowRight size={18} />
                </Link>
                <Link href="/ban-do" className="btn-secondary flex items-center gap-2">
                  <MapPin size={18} />
                  {t.heritageMapTitle}
                </Link>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Main Circle */}
                <div className="absolute inset-0 rounded-full gradient-heritage opacity-20 animate-pulse-glow" />
                <div className="absolute inset-4 rounded-full bg-[var(--color-cream)] flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-8xl">🍯</span>
                    <p className="mt-4 text-[var(--color-brown)] font-medium">{t.heritageFlavor}</p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-0 right-10 w-20 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center"
                >
                  <span className="text-3xl">🍑</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-10 left-0 w-20 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center"
                >
                  <span className="text-3xl">🥥</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute bottom-20 right-0 w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center"
                >
                  <span className="text-2xl">🍓</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Region Intro Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="section">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brown)] mb-4">
                {t.regionsTitle}
              </h2>
              <p className="text-[var(--color-brown)]/70 max-w-3xl mx-auto">
                {t.regionsDesc}
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                region: t.north,
                icon: '🏔️',
                products: language === 'vi' ? 'Mứt Mận Mộc Châu, Mứt Mơ Ba Vì' : 'Moc Chau Plum Jam, Ba Vi Apricot Jam',
                description: language === 'vi' ? 'Vị chua thanh, ngọt dịu của đất trời phía Bắc. Nhịp sống chậm, ký ức được gìn giữ qua từng nếp sinh hoạt đời thường.' : 'The fresh and subtle sweet taste of the North. A slow pace of life where memories are preserved through daily activities.',
                color: 'from-green-500 to-emerald-600'
              },
              {
                region: t.central,
                icon: '🌸',
                products: language === 'vi' ? 'Mứt Hạt Sen Huế, Mứt Dâu Tây Đà Lạt' : 'Hue Lotus Seed Jam, Da Lat Strawberry Jam',
                description: language === 'vi' ? 'Vị ngọt thanh, mộc mạc của nắng gió. Vùng đất khắc nghiệt nhưng giàu chiều sâu, con người chắt chiu từng sản vật.' : 'Rustic and subtle sweetness of sun and wind. A harsh yet deep land where people cherish every natural product.',
                color: 'from-purple-500 to-pink-600'
              },
              {
                region: t.south,
                icon: '🌴',
                products: language === 'vi' ? 'Mứt Dừa Bến Tre, Mứt Mãng Cầu Tiền Giang' : 'Ben Tre Coconut Jam, Tien Giang Custard Apple Jam',
                description: language === 'vi' ? 'Vị ngọt đậm, phóng khoáng của miệt vườn sông nước. Con người hiền hòa, những khu vườn trĩu quả mang cảm giác đủ đầy.' : 'Bold and generous sweetness of river orchards. Gentle people and fruit-laden gardens bringing a sense of abundance.',
                color: 'from-orange-500 to-amber-600'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-cream)] to-white p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full`} />
                <span className="text-5xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-bold text-[var(--color-brown)] mb-2">
                  {item.region}
                </h3>
                <p className="text-sm text-[var(--color-gold)] font-medium mb-3">
                  {item.products}
                </p>
                <p className="text-[var(--color-brown)]/70 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 pattern-bg">
        <div className="section">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🗺️',
                title: t.heritageMapTitle,
                description: t.featuresHeritageMap
              },
              {
                icon: '📱',
                title: t.featuresQrCode.split(' ')[0] + ' ' + t.featuresQrCode.split(' ')[1], // Simplifying Title
                description: t.featuresQrCode
              },
              {
                icon: '🌿',
                title: t.featuresHandcraftedTitle,
                description: t.featuresHandcrafted
              }

            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
              >
                <span className="text-5xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-semibold text-[var(--color-brown)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[var(--color-brown)]/70">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-20 bg-white">
        <div className="section">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-sm font-medium mb-4">
                <Gift size={16} />
                {t.featuredProducts}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brown)] mb-4">
                {t.discoverVietCharm}
              </h2>
              <p className="text-[var(--color-brown)]/70 max-w-2xl mx-auto">
                {t.featuredDesc}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/cua-hang" className="btn-primary inline-flex items-center gap-2">
              {t.viewAllProducts}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 gradient-heritage">
        <div className="section text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.readyToExplore}
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              {t.ctaDesc}
            </p>
            <Link 
              href="/cua-hang" 
              className="inline-flex items-center gap-2 bg-white text-[var(--color-brown)] px-8 py-4 rounded-full font-semibold hover:bg-[var(--color-cream)] transition-colors"
            >
              {t.startNow}
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
