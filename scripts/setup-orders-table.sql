-- ==============================================
-- Script SQL cập nhật RLS cho bảng orders trong Supabase
-- ==============================================
-- Chạy script này trong Supabase SQL Editor:
-- 1. Đăng nhập Supabase Dashboard
-- 2. Vào mục "SQL Editor" 
-- 3. Paste và chạy đoạn code dưới đây
-- ==============================================

-- Kiểm tra và tạo bảng orders nếu chưa tồn tại
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  items JSONB NOT NULL,
  total NUMERIC NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered')),
  shipping_info JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tạo index để truy vấn nhanh theo user_id
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

-- Tạo index để truy vấn nhanh theo status
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Bật Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Xóa policies cũ nếu tồn tại (để tránh lỗi duplicate)
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
DROP POLICY IF EXISTS "Admins can update orders" ON orders;

-- Policy: Cho phép TẤT CẢ người dùng (kể cả chưa đăng nhập) TẠO đơn hàng
CREATE POLICY "Anyone can create orders" ON orders
  FOR INSERT
  WITH CHECK (true);

-- Policy: Cho phép người dùng XEM đơn hàng của chính họ
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Cho phép admin xem tất cả đơn hàng
-- (Thay email admin của bạn vào đây)
CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT
  USING (
    auth.jwt() ->> 'email' = 'nguyenhuuthang02032003@gmail.com'
  );

-- Policy: Cho phép admin cập nhật trạng thái đơn hàng
CREATE POLICY "Admins can update orders" ON orders
  FOR UPDATE
  USING (
    auth.jwt() ->> 'email' = 'nguyenhuuthang02032003@gmail.com'
  )
  WITH CHECK (
    auth.jwt() ->> 'email' = 'nguyenhuuthang02032003@gmail.com'
  );

-- Policy: Cho phép người dùng cập nhật đơn hàng của chính họ (để xác nhận đã nhận hàng)
DROP POLICY IF EXISTS "Users can update own orders" ON orders;
CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ==============================================
-- HOÀN TẤT PHẦN ORDERS!
-- ==============================================

-- ==============================================
-- CẬP NHẬT RLS CHO BẢNG PROFILES (Quản lý người dùng)
-- ==============================================

-- Bật RLS cho bảng profiles nếu chưa bật
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Xóa policies cũ nếu tồn tại
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Policy: Cho phép người dùng xem profile của chính họ
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Cho phép người dùng cập nhật profile của chính họ
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Cho phép admin xem tất cả profiles
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT
  USING (
    auth.jwt() ->> 'email' = 'nguyenhuuthang02032003@gmail.com'
  );

-- ==============================================
-- HOÀN TẤT! Cả hai bảng đã sẵn sàng sử dụng
-- ==============================================
