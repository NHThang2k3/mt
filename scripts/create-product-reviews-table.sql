-- ==============================================
-- Script SQL tạo bảng product_reviews trong Supabase
-- ==============================================
-- Chạy script này trong Supabase SQL Editor:
-- 1. Đăng nhập Supabase Dashboard
-- 2. Vào mục "SQL Editor" 
-- 3. Paste và chạy đoạn code dưới đây
-- ==============================================

-- Tạo bảng product_reviews để lưu đánh giá sản phẩm
CREATE TABLE IF NOT EXISTS product_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id VARCHAR(255) NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tạo index để truy vấn nhanh theo product_id
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON product_reviews(product_id);

-- Tạo index để truy vấn nhanh theo user_id
CREATE INDEX IF NOT EXISTS idx_product_reviews_user_id ON product_reviews(user_id);

-- Bật Row Level Security (RLS)
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Cho phép tất cả người dùng ĐỌC đánh giá
CREATE POLICY "Anyone can read reviews" ON product_reviews
  FOR SELECT
  USING (true);

-- Policy: Cho phép người dùng đã đăng nhập TẠO đánh giá
CREATE POLICY "Authenticated users can create reviews" ON product_reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Cho phép người dùng XÓA đánh giá của chính họ
CREATE POLICY "Users can delete own reviews" ON product_reviews
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Cho phép người dùng CẬP NHẬT đánh giá của chính họ
CREATE POLICY "Users can update own reviews" ON product_reviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ==============================================
-- HOÀN TẤT! Bảng product_reviews đã sẵn sàng sử dụng
-- ==============================================
