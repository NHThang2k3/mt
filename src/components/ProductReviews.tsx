'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, Send, User, Trash2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/components/Toast';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { user } = useAuthStore();
  const { showToast } = useToast();
  
  // Mock initial reviews
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Hoàng Long',
      rating: 5,
      comment: 'Mứt rất ngon, vị ngọt thanh tự nhiên. Đóng gói rất đẹp, rất thích hợp làm quà tặng.',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Minh Thúy',
      rating: 4,
      comment: 'Vị đặc trưng của miền Tây, rất thơm. Ship hàng nhanh.',
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    }
  ]);

  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [hoverRating, pHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast('error', 'Vui lòng đăng nhập để gửi đánh giá');
      return;
    }
    if (!newComment.trim()) {
      showToast('error', 'Vui lòng nhập nội dung đánh giá');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const newReview: Review = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id || 'unknown',
      userName: user.email?.split('@')[0] || 'Khách hàng',
      rating: newRating,
      comment: newComment,
      createdAt: new Date().toISOString(),
    };

    setReviews([newReview, ...reviews]);
    setNewComment('');
    setNewRating(5);
    setIsSubmitting(false);
    showToast('success', 'Cảm ơn bạn đã đánh giá sản phẩm!');
  };

  const handleDelete = (id: string) => {
    setReviews(reviews.filter(r => r.id !== id));
    showToast('success', 'Đã xóa đánh giá');
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="section mt-12 bg-white rounded-3xl p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-brown)] flex items-center gap-3 mb-2">
            <MessageSquare size={24} className="text-[var(--color-gold)]" />
            Đánh giá từ khách hàng
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  className={star <= Math.round(averageRating) ? "fill-[var(--color-gold)] text-[var(--color-gold)]" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-lg font-bold text-[var(--color-brown)]">
              {averageRating.toFixed(1)} / 5
            </span>
            <span className="text-[var(--color-brown)]/50">
              ({reviews.length} đánh giá)
            </span>
          </div>
        </div>

        {user && (
          <button 
            onClick={() => document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary whitespace-nowrap"
          >
            Viết đánh giá của bạn
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Review Form */}
        <div className="lg:col-span-1 border-r border-[var(--border)] pr-0 lg:pr-12">
          {user ? (
            <form id="review-form" onSubmit={handleSubmit} className="sticky top-24">
              <h3 className="font-bold text-[var(--color-brown)] mb-6">Gửi đánh giá của bạn</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--color-brown)]/60 mb-2">
                  Đánh giá của bạn
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => pHoverRating(star)}
                      onMouseLeave={() => pHoverRating(0)}
                      onClick={() => setNewRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={28}
                        className={(hoverRating || newRating) >= star 
                          ? "fill-[var(--color-gold)] text-[var(--color-gold)]" 
                          : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--color-brown)]/60 mb-2">
                  Nội dung bình luận
                </label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                  className="w-full rounded-2xl border-[var(--border)] p-4 focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent min-h-[120px] resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Đang gửi...</span>
                ) : (
                  <>
                    <Send size={18} />
                    Gửi đánh giá
                  </>
                )}
              </motion.button>
            </form>
          ) : (
            <div className="bg-[var(--color-cream)] rounded-2xl p-6 text-center">
              <p className="text-[var(--color-brown)]/70 mb-4">
                Vui lòng đăng nhập để gửi đánh giá cho sản phẩm này.
              </p>
              <a href="/dang-nhap" className="btn-secondary w-full inline-block">Đăng nhập ngay</a>
            </div>
          )}
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="popLayout">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="border-b border-[var(--border)] pb-8 last:border-0"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center text-[var(--color-gold)]">
                        <User size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--color-brown)]">{review.userName}</h4>
                        <span className="text-xs text-[var(--color-brown)]/50">
                          {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </div>
                    {user?.id === review.userId && (
                      <button 
                        onClick={() => handleDelete(review.id)}
                        className="text-[var(--color-red)]/40 hover:text-[var(--color-red)] transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className={star <= review.rating ? "fill-[var(--color-gold)] text-[var(--color-gold)]" : "text-gray-300"}
                      />
                    ))}
                  </div>

                  <p className="text-[var(--color-brown)]/80 leading-relaxed">
                    {review.comment}
                  </p>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 text-[var(--color-brown)]/50">
                Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên!
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
