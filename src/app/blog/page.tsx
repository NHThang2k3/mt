'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, MapPin } from 'lucide-react';
import { posts } from '@/data/posts';

export default function BlogPage() {
  const regionColors = {
    bac: 'from-blue-500 to-blue-600',
    trung: 'from-orange-500 to-orange-600',
    nam: 'from-green-500 to-green-600'
  };

  const regionNames = {
    bac: 'Miền Bắc',
    trung: 'Miền Trung',
    nam: 'Miền Nam'
  };

  return (
    <div className="min-h-screen pattern-bg">
      {/* Header */}
      <section className="py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-brown)] mb-4">
            Văn Hóa Vùng Miền
          </h1>
          <p className="text-[var(--color-brown)]/70 max-w-2xl mx-auto px-4">
            Khám phá những câu chuyện văn hóa ẩn chứa trong từng hũ mứt truyền thống
          </p>
        </motion.div>
      </section>

      {/* Blog Grid */}
      <section className="section pt-0">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.id}`} className="block group">
                <div className="card overflow-hidden">
                  {/* Image Placeholder */}
                  <div className="relative h-48 bg-[var(--color-cream-dark)] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl opacity-50">
                        {post.region === 'bac' ? '🌸' : post.region === 'trung' ? '🏯' : '🥥'}
                      </span>
                    </div>
                    
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
                      <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                    
                    <h2 className="text-lg font-bold text-[var(--color-brown)] mb-2 group-hover:text-[var(--color-gold)] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-[var(--color-brown)]/70 text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-1 text-[var(--color-gold)] font-medium text-sm group-hover:gap-2 transition-all">
                      Đọc Thêm
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
