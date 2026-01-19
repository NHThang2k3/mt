'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Share2, ShoppingBag } from 'lucide-react';
import { posts } from '@/data/posts';
import { products } from '@/data/products';
import { trackShare } from '@/lib/analytics';
import { useAuthStore } from '@/store/authStore';

export default function BlogDetailPage() {
  const params = useParams();
  const postId = params.id as string;
  const post = posts.find(p => p.id === postId);
  const { user } = useAuthStore();

  if (!post) {
    notFound();
  }

  const relatedProduct = products.find(p => p.id === post.productId);

  const regionColors = {
    bac: { gradient: 'from-blue-500 to-blue-600', light: 'bg-blue-50', text: 'text-blue-600' },
    trung: { gradient: 'from-orange-500 to-orange-600', light: 'bg-orange-50', text: 'text-orange-600' },
    nam: { gradient: 'from-green-500 to-green-600', light: 'bg-green-50', text: 'text-green-600' }
  };

  const regionNames = {
    bac: 'Miền Bắc',
    trung: 'Miền Trung',
    nam: 'Miền Nam'
  };

  const regionEmoji = {
    bac: '🌸',
    trung: '🏯',
    nam: '🥥'
  };

  const handleShare = () => {
    trackShare('blog', post.id, 'unknown', user?.id);
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép link!');
    }
  };

  // Parse markdown-like content
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    return lines.map((line, index) => {
      // Heading 1
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl md:text-4xl font-bold text-[var(--color-brown)] mb-6 mt-8 first:mt-0">
            {line.replace('# ', '')}
          </h1>
        );
      }
      // Heading 2
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-[var(--color-brown)] mb-4 mt-8">
            {line.replace('## ', '')}
          </h2>
        );
      }
      // Heading 3
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-bold text-[var(--color-brown)] mb-3 mt-6">
            {line.replace('### ', '')}
          </h3>
        );
      }
      // Empty line
      if (line.trim() === '') {
        return <div key={index} className="h-4" />;
      }
      // Paragraph
      return (
        <p key={index} className="text-[var(--color-brown)]/80 leading-relaxed mb-4 text-lg">
          {line}
        </p>
      );
    });
  };

  // Get other posts from same region
  const relatedPosts = posts.filter(p => p.region === post.region && p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen pattern-bg">
      {/* Hero Section */}
      <section className={`relative py-20 ${regionColors[post.region].light}`}>
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white/30 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-white/30 blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="section relative">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[var(--color-brown)]/60 hover:text-[var(--color-brown)] transition-colors"
            >
              <ArrowLeft size={18} />
              Quay lại Văn Hóa
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            {/* Region Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${regionColors[post.region].gradient} text-white text-sm font-medium mb-6`}
            >
              <MapPin size={14} />
              {regionNames[post.region]}
            </motion.div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-brown)] mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-[var(--color-brown)]/60">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(post.createdAt).toLocaleDateString('vi-VN', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-[var(--color-gold)] transition-colors"
              >
                <Share2 size={16} />
                Chia sẻ
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="section py-0 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className={`aspect-video rounded-3xl ${regionColors[post.region].light} flex items-center justify-center shadow-2xl overflow-hidden`}>
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="text-9xl"
            >
              {regionEmoji[post.region]}
            </motion.span>
          </div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="max-w-3xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="prose prose-lg max-w-none"
          >
            {renderContent(post.content)}
          </motion.article>

          {/* Excerpt Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`mt-12 p-8 rounded-2xl ${regionColors[post.region].light} border-l-4 border-current ${regionColors[post.region].text}`}
          >
            <p className="text-lg italic text-[var(--color-brown)]/80">
              "{post.excerpt}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Related Product */}
      {relatedProduct && (
        <section className="section">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-6 flex items-center gap-3">
                <ShoppingBag size={24} className="text-[var(--color-gold)]" />
                Sản Phẩm Liên Quan
              </h2>

              <Link href={`/san-pham/${relatedProduct.id}`}>
                <div className="card p-6 flex flex-col sm:flex-row gap-6 group hover:shadow-xl transition-shadow">
                  <div className={`w-full sm:w-32 h-32 rounded-xl ${regionColors[post.region].light} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-5xl">{regionEmoji[post.region]}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--color-brown)] group-hover:text-[var(--color-gold)] transition-colors mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-[var(--color-brown)]/70 mb-4 line-clamp-2">
                      {relatedProduct.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[var(--color-gold)]">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(relatedProduct.price)}
                      </span>
                      <span className={`px-4 py-2 rounded-full bg-gradient-to-r ${regionColors[post.region].gradient} text-white text-sm font-medium`}>
                        Xem sản phẩm
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-6">
                Bài Viết Khác Từ {regionNames[post.region]}
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                    <div className="card p-4 group hover:shadow-lg transition-shadow">
                      <div className={`h-32 rounded-xl ${regionColors[relatedPost.region].light} flex items-center justify-center mb-4`}>
                        <span className="text-4xl opacity-60">{regionEmoji[relatedPost.region]}</span>
                      </div>
                      <h3 className="font-bold text-[var(--color-brown)] group-hover:text-[var(--color-gold)] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-[var(--color-brown)]/60 mt-2">
                        {new Date(relatedPost.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className="section text-center pb-20">
        <Link href="/blog">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Xem Tất Cả Bài Viết
          </motion.button>
        </Link>
      </section>
    </div>
  );
}
