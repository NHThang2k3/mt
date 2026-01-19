'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Sparkles, Gift } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function Home() {
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
                Khám phá di sản ẩm thực
              </span>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                <span className="text-gradient">Mứt Trái Cây</span>
                <br />
                <span className="text-[var(--color-brown)]">3 Miền Việt Nam</span>
              </h1>
              
              <p className="text-lg text-[var(--color-brown)]/80 mb-8 max-w-lg leading-relaxed">
                Hành trình khám phá hương vị truyền thống từ Bắc vào Nam. 
                Mỗi hũ mứt là một câu chuyện văn hóa, một phần di sản cần được gìn giữ.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/cua-hang" className="btn-primary flex items-center gap-2">
                  Khám Phá Ngay
                  <ArrowRight size={18} />
                </Link>
                <Link href="/ban-do" className="btn-secondary flex items-center gap-2">
                  <MapPin size={18} />
                  Bản Đồ Di Sản
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
                    <p className="mt-4 text-[var(--color-brown)] font-medium">Di Sản Hương Vị</p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-0 right-10 w-20 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center"
                >
                  <span className="text-3xl">🌸</span>
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
                  <span className="text-2xl">🍋</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="section">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🗺️',
                title: 'Bản Đồ Di Sản',
                description: 'Thắp sáng bản đồ Việt Nam qua từng sản phẩm bạn sở hữu'
              },
              {
                icon: '📜',
                title: 'Câu Chuyện Văn Hóa',
                description: 'Mỗi hũ mứt đi kèm câu chuyện văn hóa vùng miền độc đáo'
              },
              {
                icon: '🏆',
                title: 'Danh Hiệu Đặc Biệt',
                description: 'Sưu tập đủ bộ để nhận danh hiệu "Đại Sứ Di Sản Việt"'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl hover:bg-[var(--color-cream)] transition-colors"
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
      <section className="py-20 pattern-bg">
        <div className="section">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-sm font-medium mb-4">
                <Gift size={16} />
                Sản phẩm nổi bật
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brown)] mb-4">
                Khám Phá Hương Vị
              </h2>
              <p className="text-[var(--color-brown)]/70 max-w-2xl mx-auto">
                Những món mứt được yêu thích nhất, mang đậm hương vị truyền thống Việt Nam
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
              Xem Tất Cả Sản Phẩm
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-heritage">
        <div className="section text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sẵn Sàng Khám Phá?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Bắt đầu hành trình thắp sáng bản đồ di sản Việt Nam ngay hôm nay. 
              Mỗi sản phẩm là một bước tiến trên con đường trở thành Đại Sứ Di Sản!
            </p>
            <Link 
              href="/cua-hang" 
              className="inline-flex items-center gap-2 bg-white text-[var(--color-brown)] px-8 py-4 rounded-full font-semibold hover:bg-[var(--color-cream)] transition-colors"
            >
              Bắt Đầu Ngay
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
