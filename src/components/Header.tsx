'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, LogOut, Shield, Package } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { ADMIN_EMAIL } from '@/types/database';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const itemCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));
  const { user, profile, signOut, initialize, isInitialized } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    if (!isInitialized) {
      initialize();
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInitialized, initialize]);

  const isAdmin = user?.email === ADMIN_EMAIL;

  const navLinks = [
    { href: '/', label: 'Trang Chủ' },
    { href: '/cua-hang', label: 'Cửa Hàng' },
    { href: '/ban-do', label: 'Bản Đồ Di Sản' },
    { href: '/blog', label: 'Văn Hóa' },
    ...(isAdmin ? [{ href: '/admin', label: 'Admin', icon: Shield }] : []),
  ];

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoggingOut(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? 'bg-white shadow-lg'
            : 'bg-transparent'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="/images/logo.jpg" 
              alt="VietCharm Logo" 
              className="w-12 h-12 rounded-full object-cover shadow-md"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gradient">VietCharm</h1>
              <p className="text-xs text-[var(--color-brown)] -mt-1">Mứt Trái Cây 3 Miền</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1 text-[var(--color-brown)] hover:text-[var(--color-gold)] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {mounted && user && (
              <Link
                href="/gio-hang"
                className="relative p-2 rounded-full hover:bg-[var(--color-cream-dark)] transition-colors"
              >
                <ShoppingCart size={24} className="text-[var(--color-brown)]" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--color-red)] text-white text-xs flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>
            )}
            
            {mounted && user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/don-hang"
                  className="p-2 rounded-full hover:bg-[var(--color-cream-dark)] transition-colors"
                  title="Đơn hàng của tôi"
                >
                  <Package size={20} className="text-[var(--color-brown)]" />
                </Link>
                <div className="text-right">
                  <p className="text-sm font-medium text-[var(--color-brown)]">
                    {profile?.name || user.email?.split('@')[0]}
                  </p>
                  <p className="text-xs text-[var(--color-brown)]/60">
                    {profile?.badges?.length || 0} danh hiệu
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  disabled={isLoggingOut}
                  className="p-2 rounded-full hover:bg-[var(--color-cream-dark)] transition-colors disabled:opacity-50"
                  title="Đăng xuất"
                >
                  {isLoggingOut ? (
                    <div className="w-5 h-5 border-2 border-[var(--color-brown)] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <LogOut size={20} className="text-[var(--color-brown)]" />
                  )}
                </button>
              </div>
            ) : (
              <Link
                href="/dang-nhap"
                className="hidden sm:flex items-center gap-2 btn-secondary py-2 px-4"
              >
                <User size={18} />
                <span>Đăng Nhập</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X size={24} className="text-[var(--color-brown)]" />
              ) : (
                <Menu size={24} className="text-[var(--color-brown)]" />
              )}
            </button>
          </div>
        </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 z-40 bg-white overflow-y-auto">
          <nav className="flex flex-col gap-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[var(--color-cream-dark)] transition-colors text-[var(--color-brown)] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <div className="px-4 py-3 border-t border-[var(--border)] mt-2">
                  <p className="font-medium text-[var(--color-brown)]">
                    {profile?.name || user.email}
                  </p>
                  <p className="text-sm text-[var(--color-brown)]/60">
                    {profile?.badges?.length || 0} danh hiệu
                  </p>
                </div>
                <Link
                  href="/don-hang"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[var(--color-cream-dark)] transition-colors text-[var(--color-brown)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package size={18} />
                  Đơn Hàng Của Tôi
                </Link>
                <button
                  onClick={handleSignOut}
                  disabled={isLoggingOut}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors disabled:opacity-50"
                >
                  {isLoggingOut ? (
                    <div className="w-[18px] h-[18px] border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <LogOut size={18} />
                  )}
                  {isLoggingOut ? 'Đang xử lý...' : 'Đăng Xuất'}
                </button>
              </>
            ) : (
              <Link
                href="/dang-nhap"
                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[var(--color-cream-dark)] transition-colors text-[var(--color-brown)]"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} />
                Đăng Nhập
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
