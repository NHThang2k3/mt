import Link from 'next/link';
import { Facebook, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-brown)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full gradient-gold flex items-center justify-center">
                <span className="text-white text-2xl font-bold">M</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-gold-light)]">Mứt 3 Miền</h3>
                <p className="text-sm text-white/70">Di Sản Hương Vị Việt</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed mb-6 max-w-md">
              Mang đến những hương vị mứt truyền thống từ ba miền Bắc - Trung - Nam, 
              kết hợp câu chuyện văn hóa vùng miền trong từng sản phẩm.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--color-gold)] flex items-center justify-center transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--color-gold)] flex items-center justify-center transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-[var(--color-gold-light)] mb-4">Liên Kết Nhanh</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/cua-hang" className="text-white/80 hover:text-[var(--color-gold-light)] transition-colors">
                Cửa Hàng
              </Link>
              <Link href="/ban-do" className="text-white/80 hover:text-[var(--color-gold-light)] transition-colors">
                Bản Đồ Di Sản
              </Link>
              <Link href="/blog" className="text-white/80 hover:text-[var(--color-gold-light)] transition-colors">
                Văn Hóa Vùng Miền
              </Link>
              <Link href="/ve-chung-toi" className="text-white/80 hover:text-[var(--color-gold-light)] transition-colors">
                Về Chúng Tôi
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-[var(--color-gold-light)] mb-4">Liên Hệ</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:0123456789" className="flex items-center gap-2 text-white/80 hover:text-[var(--color-gold-light)] transition-colors">
                <Phone size={16} />
                <span>0123 456 789</span>
              </a>
              <a href="mailto:info@mut3mien.vn" className="flex items-center gap-2 text-white/80 hover:text-[var(--color-gold-light)] transition-colors">
                <Mail size={16} />
                <span>info@mut3mien.vn</span>
              </a>
              <div className="flex items-start gap-2 text-white/80">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>TP. Hồ Chí Minh, Việt Nam</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/60 text-sm">
            © 2026 Mứt 3 Miền. Dự án Marketing Điện Tử.
          </p>
        </div>
      </div>
    </footer>
  );
}
