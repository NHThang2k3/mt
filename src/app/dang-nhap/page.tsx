
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

type AuthMode = 'login' | 'register';

export default function AuthPage() {
const router = useRouter();
const { user, isLoading, signIn, signUp, initialize, isInitialized } = useAuthStore();
const [mode, setMode] = useState<AuthMode>('login');
const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState<string | null>(null);

const [formData, setFormData] = useState({
name: '',
email: '',
password: '',
confirmPassword: ''
});

useEffect(() => {
if (!isInitialized) {
initialize();
}
}, [isInitialized, initialize]);

useEffect(() => {
if (user) {
router.push('/');
}
}, [user, router]);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
setError(null);
};

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setError(null);


if (mode === 'register' && formData.password !== formData.confirmPassword) {
  setError('Mật khẩu xác nhận không khớp');
  return;
}

if (mode === 'login') {
  const result = await signIn(formData.email, formData.password);
  if (result.error) {
    setError(result.error);
  }
} else {
  const result = await signUp(formData.email, formData.password, formData.name);
  if (result.error) {
    setError(result.error);
  } else {
    setError(null);
    alert('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.');
  }
}

};

return (
<div className="min-h-screen flex items-center justify-center pattern-bg py-16 px-4">
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="w-full max-w-md"
>
<div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
{/* Logo */}
<div className="text-center mb-10">
<div className="w-20 h-20 rounded-full gradient-gold mx-auto flex items-center justify-center mb-5 shadow-lg">
<span className="text-white text-3xl font-bold">M</span>
</div>
<h1 className="text-3xl font-bold text-[var(--color-brown)]">
{mode === 'login' ? 'Đăng Nhập' : 'Đăng Ký'}
</h1>
<p className="text-[var(--color-brown)]/60 text-sm mt-2">
{mode === 'login'
? 'Chào mừng bạn quay trở lại!'
: 'Tạo tài khoản để bắt đầu hành trình'}
</p>
</div>


{/* Tabs */}
      <div className="flex bg-[var(--color-cream)] rounded-full p-1.5 mb-10">
        <button
          onClick={() => { setMode('login'); setError(null); }}
          className={`flex-1 py-3 px-4 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            mode === 'login'
              ? 'bg-white text-[var(--color-brown)] shadow-md'
              : 'text-[var(--color-brown)]/60 hover:text-[var(--color-brown)]'
          }`}
        >
          <LogIn size={16} />
          Đăng Nhập
        </button>
        <button
          onClick={() => { setMode('register'); setError(null); }}
          className={`flex-1 py-3 px-4 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            mode === 'register'
              ? 'bg-white text-[var(--color-brown)] shadow-md'
              : 'text-[var(--color-brown)]/60 hover:text-[var(--color-brown)]'
          }`}
        >
          <UserPlus size={16} />
          Đăng Ký
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-600"
        >
          <AlertCircle size={20} />
          <span className="text-sm">{error}</span>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === 'register' && (
          <div>
            <label className="block text-sm font-semibold text-[var(--color-brown)] mb-3">
              Họ và Tên
            </label>
            <div className="relative">
              <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-brown)]/40" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-[var(--border)] bg-[var(--color-cream)]/30 focus:border-[var(--color-gold)] focus:bg-white focus:outline-none transition-all text-[var(--color-brown)]"
                placeholder="Nguyễn Văn A"
                required
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-[var(--color-brown)] mb-3">
            Email
          </label>
          <div className="relative">
            <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-brown)]/40" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-14 pr-4 py-4 rounded-xl border-2 border-[var(--border)] bg-[var(--color-cream)]/30 focus:border-[var(--color-gold)] focus:bg-white focus:outline-none transition-all text-[var(--color-brown)]"
              placeholder="email@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--color-brown)] mb-3">
            Mật Khẩu
          </label>
          <div className="relative">
            <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-brown)]/40" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-14 pr-14 py-4 rounded-xl border-2 border-[var(--border)] bg-[var(--color-cream)]/30 focus:border-[var(--color-gold)] focus:bg-white focus:outline-none transition-all text-[var(--color-brown)]"
              placeholder="••••••••"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-brown)]/40 hover:text-[var(--color-brown)] transition-colors p-1"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {mode === 'register' && (
          <div>
            <label className="block text-sm font-semibold text-[var(--color-brown)] mb-3">
              Xác Nhận Mật Khẩu
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-brown)]/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-14 pr-4 py-4 rounded-xl border-2 border-[var(--border)] bg-[var(--color-cream)]/30 focus:border-[var(--color-gold)] focus:bg-white focus:outline-none transition-all text-[var(--color-brown)]"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full py-4 text-lg disabled:opacity-50 mt-8"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Đang xử lý...
            </span>
          ) : (
            mode === 'login' ? 'Đăng Nhập' : 'Tạo Tài Khoản'
          )}
        </button>
      </form>

      {/* Info */}
      <p className="mt-8 text-center text-sm text-[var(--color-brown)]/50">
        Bằng việc đăng ký, bạn đồng ý với điều khoản sử dụng của chúng tôi.
      </p>
    </div>
  </motion.div>
</div>

);
}