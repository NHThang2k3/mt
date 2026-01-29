'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  QrCode, 
  Camera, 
  X, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Lock,
  RefreshCw,
  ArrowLeft,
  Gift,
  MapPin
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { products } from '@/data/products';
import Link from 'next/link';
import confetti from 'canvas-confetti';

// Valid QR code patterns for our system
const VALID_QR_PATTERNS = [
  /^BAC_MAN_\d{2}$/,      // Mứt Mận Mộc Châu
  /^BAC_MO_\d{2}$/,       // Mứt Mơ Ba Vì
  /^TRUNG_SEN_\d{2}$/,    // Mứt Hạt Sen Huế
  /^TRUNG_DAU_\d{2}$/,    // Mứt Dâu Tây Đà Lạt
  /^NAM_DUA_\d{2}$/,      // Mứt Dừa Bến Tre
  /^NAM_MANGCAU_\d{2}$/,  // Mứt Mãng Cầu Tiền Giang
  /^VIETCHARM_ALL$/,      // Mã đặc biệt mở khóa tất cả
];

type ScanStatus = 'idle' | 'scanning' | 'success' | 'error' | 'invalid' | 'already';

interface ScanResult {
  code: string;
  product?: typeof products[0];
  isSpecial?: boolean;
}

export default function QRScannerPage() {
  const router = useRouter();
  const { user, profile, unlockProduct, initialize, isInitialized, isLoading } = useAuthStore();
  
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string>('');
  
  const scannerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize auth
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  // Extract code from QR content (could be URL or just code)
  const extractCodeFromQR = useCallback((qrContent: string): string => {
    // If it's a URL, extract the code parameter
    if (qrContent.includes('/unlock?code=')) {
      const match = qrContent.match(/[?&]code=([^&]+)/);
      if (match) {
        return match[1];
      }
    }
    // Otherwise, it's a direct code
    return qrContent;
  }, []);

  // Validate QR code belongs to our system
  const isValidSystemQR = useCallback((qrContent: string): boolean => {
    const code = extractCodeFromQR(qrContent);
    console.log('QR Scanner: Extracted code:', code);
    return VALID_QR_PATTERNS.some(pattern => pattern.test(code));
  }, [extractCodeFromQR]);

  // Get product from QR code
  const getProductFromCode = useCallback((code: string): typeof products[0] | undefined => {
    if (code === 'VIETCHARM_ALL') return undefined;
    
    // Convert QR code to product ID: BAC_MAN_01 -> bac-man
    const productId = code.toLowerCase().replace(/_\d+$/, '').replace('_', '-');
    return products.find(p => p.id === productId);
  }, []);

  // Handle successful scan
  const handleScanSuccess = useCallback(async (decodedText: string) => {
    console.log('QR Scanner: Scanned text:', decodedText);
    
    // Stop scanning immediately
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch (e) {
        console.log('Scanner already stopped');
      }
      scannerRef.current = null; // Clear ref để có thể start lại
    }
    setIsScanning(false);

    // Check if valid system QR
    if (!isValidSystemQR(decodedText)) {
      console.log('QR Scanner: Invalid QR code');
      setStatus('invalid');
      setErrorMessage('Mã QR này không thuộc hệ thống VietCharm');
      return;
    }

    // Extract the actual code from URL if needed
    const code = extractCodeFromQR(decodedText);
    console.log('QR Scanner: Processing code:', code);

    // Check for special code
    if (code === 'VIETCHARM_ALL') {
      console.log('QR Scanner: Special code detected');
      setScanResult({ code, isSpecial: true });
      setStatus('success');
      
      // Unlock all products
      const allProductIds = ['bac-man', 'bac-mo', 'trung-sen', 'trung-dau', 'nam-dua', 'nam-mangcau'];
      for (const productId of allProductIds) {
        if (!profile?.unlocked_products?.includes(productId)) {
          console.log('QR Scanner: Unlocking', productId);
          await unlockProduct(productId);
        }
      }
      
      // Fire confetti
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 }
      });
      return;
    }

    // Get product info using the extracted code
    const product = getProductFromCode(code);
    console.log('QR Scanner: Product from code:', product?.id);
    
    if (!product) {
      console.log('QR Scanner: Product not found');
      setStatus('error');
      setErrorMessage('Không tìm thấy sản phẩm tương ứng');
      return;
    }

    // Check if already unlocked
    const productId = product.id;
    console.log('QR Scanner: Checking if already unlocked:', productId);
    console.log('QR Scanner: Current unlocked products:', profile?.unlocked_products);
    
    if (profile?.unlocked_products?.includes(productId)) {
      console.log('QR Scanner: Already unlocked');
      setScanResult({ code, product });
      setStatus('already');
      return;
    }

    // Unlock the product
    console.log('QR Scanner: Calling unlockProduct for:', productId);
    await unlockProduct(productId);
    console.log('QR Scanner: unlockProduct completed');
    
    setScanResult({ code, product });
    setStatus('success');
    
    // Fire confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  }, [isValidSystemQR, extractCodeFromQR, getProductFromCode, profile, unlockProduct]);

  // Start scanning
  const startScanning = useCallback(async () => {
    setStatus('scanning');
    setCameraError('');
    setIsScanning(true);

    // Use setTimeout to ensure the qr-reader div is mounted first
    setTimeout(async () => {
      try {
        // Cleanup previous scanner if exists
        if (scannerRef.current) {
          try {
            const state = scannerRef.current.getState?.();
            if (state === 2) { // SCANNING state
              await scannerRef.current.stop();
            }
          } catch (e) {
            console.log('Cleanup previous scanner:', e);
          }
          scannerRef.current = null;
        }

        // Check if qr-reader element exists
        const readerElement = document.getElementById('qr-reader');
        if (!readerElement) {
          console.error('qr-reader element not found');
          setCameraError('Không tìm thấy khung quét. Vui lòng thử lại.');
          setStatus('idle');
          setIsScanning(false);
          return;
        }

        // Dynamically import html5-qrcode
        const { Html5Qrcode } = await import('html5-qrcode');
        
        const html5QrCode = new Html5Qrcode('qr-reader');
        scannerRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            handleScanSuccess(decodedText);
          },
          (errorMessage) => {
            // Ignore scan errors, just means no QR found yet
          }
        );
      } catch (err: any) {
        console.error('Camera error:', err);
        console.error('Camera error name:', err.name);
        console.error('Camera error message:', err.message);
        setIsScanning(false);
        
        // Phân loại lỗi chi tiết hơn
        let errorMsg = 'Không thể khởi động camera.';
        
        if (err.name === 'NotAllowedError' || err.message?.includes('Permission')) {
          errorMsg = 'Bạn cần cho phép truy cập camera. Vui lòng:\n1. Nhấn vào biểu tượng khóa 🔒 cạnh URL\n2. Bật quyền "Camera"\n3. Tải lại trang';
        } else if (err.name === 'NotFoundError' || err.message?.includes('not found')) {
          errorMsg = 'Không tìm thấy camera trên thiết bị này.';
        } else if (err.name === 'NotReadableError' || err.message?.includes('in use')) {
          errorMsg = 'Camera đang được sử dụng bởi ứng dụng khác. Vui lòng đóng các ứng dụng khác và thử lại.';
        } else if (err.name === 'OverconstrainedError') {
          errorMsg = 'Camera không hỗ trợ cấu hình yêu cầu.';
        } else if (err.message?.includes('insecure')) {
          errorMsg = 'Camera chỉ hoạt động trên kết nối bảo mật (HTTPS).';
        } else {
          errorMsg = `Không thể khởi động camera: ${err.message || 'Lỗi không xác định'}`;
        }
        
        setCameraError(errorMsg);
        setStatus('idle');
        
        // Clear scanner ref on error
        scannerRef.current = null;
      }
    }, 150); // Delay 150ms để React render xong
  }, [handleScanSuccess]);

  // Stop scanning
  const stopScanning = useCallback(async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch (e) {
        console.log('Scanner stop error:', e);
      }
      scannerRef.current = null;
    }
    setIsScanning(false);
    setStatus('idle');
  }, []);

  // Reset to scan again
  const resetScanner = useCallback(async () => {
    // Cleanup scanner before reset
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch (e) {
        console.log('Reset scanner cleanup:', e);
      }
      scannerRef.current = null;
    }
    setStatus('idle');
    setScanResult(null);
    setErrorMessage('');
    setCameraError('');
    setIsScanning(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, []);

  // Show loading while checking auth
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pattern-bg">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--color-brown)]">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Require login
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pattern-bg py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-8 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-[var(--color-gold)]/20 mx-auto flex items-center justify-center mb-6">
            <Lock size={40} className="text-[var(--color-gold)]" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-brown)] mb-4">
            Vui Lòng Đăng Nhập
          </h1>
          <p className="text-[var(--color-brown)]/70 mb-8">
            Bạn cần đăng nhập để sử dụng chức năng quét mã QR và thắp sáng Bản Đồ Di Sản
          </p>
          <Link 
            href={`/dang-nhap?redirect=${encodeURIComponent('/quet-ma')}`}
            className="btn-primary inline-flex items-center gap-2"
          >
            Đăng Nhập Ngay
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pattern-bg py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft size={24} className="text-[var(--color-brown)]" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-brown)]">
              Quét Mã QR
            </h1>
            <p className="text-sm text-[var(--color-brown)]/60">
              Quét mã QR sản phẩm để thắp sáng bản đồ
            </p>
          </div>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <AnimatePresence mode="wait">
            {/* Idle State - Ready to Scan */}
            {status === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-32 h-32 rounded-3xl gradient-gold mx-auto flex items-center justify-center mb-6 shadow-lg">
                  <QrCode size={64} className="text-white" />
                </div>
                
                <h2 className="text-xl font-bold text-[var(--color-brown)] mb-2">
                  Sẵn Sàng Quét
                </h2>
                <p className="text-[var(--color-brown)]/70 mb-6">
                  Nhấn nút bên dưới để mở camera và quét mã QR trên sản phẩm VietCharm
                </p>

                {cameraError && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                    <AlertTriangle size={20} className="inline mr-2" />
                    {cameraError}
                  </div>
                )}

                <button
                  onClick={startScanning}
                  className="btn-primary inline-flex items-center gap-3 text-lg px-8 py-4"
                >
                  <Camera size={24} />
                  Mở Camera & Quét
                </button>

                {/* Info Box */}
                <div className="mt-8 p-4 rounded-xl bg-[var(--color-cream)] border border-[var(--color-gold)]/20">
                  <h3 className="font-semibold text-[var(--color-brown)] mb-2">
                    💡 Lưu ý
                  </h3>
                  <ul className="text-sm text-[var(--color-brown)]/70 text-left space-y-1">
                    <li>• Chỉ quét được mã QR của sản phẩm VietCharm</li>
                    <li>• Đảm bảo camera có đủ ánh sáng</li>
                    <li>• Giữ điện thoại ổn định khi quét</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Scanning State */}
            {status === 'scanning' && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div 
                    id="qr-reader" 
                    ref={containerRef}
                    className="w-full aspect-square rounded-2xl overflow-hidden bg-black"
                  />
                  {/* Scanning overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 border-4 border-[var(--color-gold)] rounded-2xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white/50 rounded-xl">
                      <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[var(--color-gold)] rounded-tl-lg" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[var(--color-gold)] rounded-tr-lg" />
                      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[var(--color-gold)] rounded-bl-lg" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[var(--color-gold)] rounded-br-lg" />
                    </div>
                  </div>
                </div>
                
                <p className="text-[var(--color-brown)] mb-4 flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin" />
                  Đang tìm mã QR...
                </p>

                <button
                  onClick={stopScanning}
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <X size={20} />
                  Hủy Quét
                </button>
              </motion.div>
            )}

            {/* Success State */}
            {status === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full gradient-gold mx-auto flex items-center justify-center mb-6">
                  <CheckCircle size={40} className="text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-2">
                  {scanResult?.isSpecial ? '🎉 Mở Khóa Toàn Bộ!' : '🎉 Mở Khóa Thành Công!'}
                </h2>
                
                <p className="text-[var(--color-brown)]/70 mb-6">
                  {scanResult?.isSpecial ? (
                    <span>Bạn đã mở khóa <strong className="text-[var(--color-gold)]">toàn bộ 6 sản phẩm</strong> từ ba miền!</span>
                  ) : (
                    <span>Bạn đã mở khóa <strong className="text-[var(--color-gold)]">{scanResult?.product?.name}</strong></span>
                  )}
                </p>

                {scanResult?.product && (
                  <div className="mb-6 p-4 rounded-xl bg-[var(--color-cream)] flex items-center gap-4">
                    <img 
                      src={scanResult.product.image} 
                      alt={scanResult.product.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-[var(--color-brown)]">{scanResult.product.name}</p>
                      <p className="text-sm text-[var(--color-brown)]/60">{scanResult.product.regionName}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <Link 
                    href="/ban-do" 
                    className="btn-primary inline-flex items-center justify-center gap-2"
                  >
                    <MapPin size={18} />
                    Xem Bản Đồ Di Sản
                  </Link>
                  <button
                    onClick={resetScanner}
                    className="btn-secondary inline-flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={18} />
                    Quét Mã Khác
                  </button>
                </div>
              </motion.div>
            )}

            {/* Already Unlocked State */}
            {status === 'already' && (
              <motion.div
                key="already"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-blue-100 mx-auto flex items-center justify-center mb-6">
                  <Gift size={40} className="text-blue-500" />
                </div>
                
                <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-2">
                  Đã Mở Khóa Trước Đó
                </h2>
                
                <p className="text-[var(--color-brown)]/70 mb-6">
                  Sản phẩm <strong>{scanResult?.product?.name}</strong> đã được thắp sáng trên bản đồ của bạn rồi!
                </p>

                {scanResult?.product && (
                  <div className="mb-6 p-4 rounded-xl bg-[var(--color-cream)] flex items-center gap-4">
                    <img 
                      src={scanResult.product.image} 
                      alt={scanResult.product.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-[var(--color-brown)]">{scanResult.product.name}</p>
                      <p className="text-sm text-[var(--color-brown)]/60">{scanResult.product.regionName}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <Link 
                    href="/ban-do" 
                    className="btn-primary inline-flex items-center justify-center gap-2"
                  >
                    <MapPin size={18} />
                    Xem Bản Đồ Di Sản
                  </Link>
                  <button
                    onClick={resetScanner}
                    className="btn-secondary inline-flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={18} />
                    Quét Mã Khác
                  </button>
                </div>
              </motion.div>
            )}

            {/* Invalid QR State */}
            {status === 'invalid' && (
              <motion.div
                key="invalid"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-orange-100 mx-auto flex items-center justify-center mb-6">
                  <AlertTriangle size={40} className="text-orange-500" />
                </div>
                
                <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-2">
                  Mã QR Không Hợp Lệ
                </h2>
                
                <p className="text-[var(--color-brown)]/70 mb-6">
                  {errorMessage}
                </p>

                <div className="mb-6 p-4 rounded-xl bg-orange-50 border border-orange-200 text-left">
                  <p className="text-sm text-orange-700">
                    <strong>Lưu ý:</strong> Chỉ có thể quét mã QR chính thức trên sản phẩm VietCharm. 
                    Vui lòng kiểm tra lại mã QR trên sản phẩm của bạn.
                  </p>
                </div>

                <button
                  onClick={resetScanner}
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  <RefreshCw size={18} />
                  Thử Lại
                </button>
              </motion.div>
            )}

            {/* Error State */}
            {status === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-red-100 mx-auto flex items-center justify-center mb-6">
                  <XCircle size={40} className="text-red-500" />
                </div>
                
                <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-2">
                  Đã Xảy Ra Lỗi
                </h2>
                
                <p className="text-[var(--color-brown)]/70 mb-6">
                  {errorMessage || 'Không thể xử lý mã QR. Vui lòng thử lại.'}
                </p>

                <button
                  onClick={resetScanner}
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  <RefreshCw size={18} />
                  Thử Lại
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Progress Info */}
        {user && profile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 card p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-[var(--color-brown)]">
                Tiến độ khám phá
              </span>
              <span className="text-sm font-bold text-[var(--color-gold)]">
                {profile.unlocked_products?.length || 0} / 6 sản phẩm
              </span>
            </div>
            <div className="w-full h-2 bg-[var(--color-cream)] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((profile.unlocked_products?.length || 0) / 6) * 100}%` }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="h-full gradient-gold rounded-full"
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
