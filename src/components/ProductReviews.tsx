'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, Send, User, Trash2, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/components/Toast';
import { supabase } from '@/lib/supabase';
import type { ProductReview } from '@/types/database';

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { user, profile } = useAuthStore();
  const { showToast } = useToast();
  
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  // Fetch reviews from database
  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    setIsLoadingReviews(true);
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        // If table doesn't exist, show empty reviews
        if (error.code === '42P01') {
          setReviews([]);
        }
      } else {
        setReviews(data || []);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoadingReviews(false);
    }
  };

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
    
    try {
      const reviewData = {
        product_id: productId,
        user_id: user.id,
        user_name: profile?.name || user.email?.split('@')[0] || 'Khách hàng',
        rating: newRating,
        comment: newComment.trim(),
      };

      const { data, error } = await supabase
        .from('product_reviews')
        .insert(reviewData)
        .select()
        .single();

      if (error) {
        console.error('Error saving review:', error);
        showToast('error', 'Không thể lưu đánh giá. Vui lòng thử lại!');
        return;
      }

      // Add the new review to the list
      setReviews([data, ...reviews]);
      setNewComment('');
      setNewRating(5);
      showToast('success', 'Cảm ơn bạn đã đánh giá sản phẩm!');
    } catch (error) {
      console.error('Error saving review:', error);
      showToast('error', 'Có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('product_reviews')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting review:', error);
        showToast('error', 'Không thể xóa đánh giá');
        return;
      }

      setReviews(reviews.filter(r => r.id !== id));
      showToast('success', 'Đã xóa đánh giá');
    } catch (error) {
      console.error('Error deleting review:', error);
      showToast('error', 'Có lỗi xảy ra');
    }
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
            onClick={() => {
              document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' });
              // Focus vào ô nhập sau khi scroll xong
              setTimeout(() => {
                commentInputRef.current?.focus();
              }, 500);
            }}
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
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
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
                  ref={commentInputRef}
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
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Đang gửi...
                  </>
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
          {isLoadingReviews ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={32} className="animate-spin text-[var(--color-gold)]" />
            </div>
          ) : (
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
                          <h4 className="font-bold text-[var(--color-brown)]">{review.user_name}</h4>
                          <span className="text-xs text-[var(--color-brown)]/50">
                            {new Date(review.created_at).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      </div>
                      {user?.id === review.user_id && (
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
          )}
        </div>
      </div>
    </div>
  );
}
