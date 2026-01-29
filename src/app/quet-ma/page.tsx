'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  QrCode, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  ArrowLeft,
  MapPin,
  RefreshCw,
  Gift,
  XCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { getProductFromCode } from '@/data/products';
import confetti from 'canvas-confetti';

export default function QRScanPage() {
  const router = useRouter();
  const { user, profile, isInitialized, isLoading, unlockProduct } = useAuthStore();
  
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'invalid' | 'already' | 'error'>('idle');
  const [scanResult, setScanResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [cameraError, setCameraError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  
  const scannerRef = useRef<any>(null);

  // Sound effects (optional, can be added later)
  const playSuccessSound = () => {
    // const audio = new Audio('/sounds/success.mp3');
    // audio.play().catch(() => {});
  };

  // Helper to extract code from various QR formats
  const extractCodeFromQR = useCallback((qrContent: string): string => {
    // Handle URL format: https://.../unlock?code=BAC_MAN_01
    if (qrContent.includes('/unlock?code=')) {
      const match = qrContent.match(/[?&]code=([^&]+)/);
      if (match) return match[1];
    }
    
    // Default return original string (if it's already just the code)
    return qrContent;
  }, []);

  // Check if QR is valid system code
  const isValidSystemQR = useCallback((text: string) => {
    const code = extractCodeFromQR(text);
    // Special dev code or product codes
    if (code === 'VIETCHARM_ALL') return true;
    return !!getProductFromCode(code);
  }, [extractCodeFromQR]);

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
      scannerRef.current = null;
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
      
      // Unlock all products using internal IDs
      const allProductIds = [
        'bac-man', 'bac-mo', 
        'trung-sen', 'trung-dau', 
        'nam-dua', 'nam-mangcau'
      ];
      
      for (const id of allProductIds) {
        unlockProduct(id);
      }
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
      return;
    }

    // Get product info
    const product = getProductFromCode(code);
    if (!product) {
      setStatus('invalid');
      setErrorMessage('Không tìm thấy thông tin sản phẩm');
      return;
    }

    // Check if already unlocked locally using product ID
    if (profile?.unlocked_products?.includes(product.id)) {
      setScanResult({ product, code });
      setStatus('already');
      return;
    }

    // Attempt to unlock using internal product ID
    try {
      setScanResult({ product, code });
      setStatus('success');
      unlockProduct(product.id); // Use internal ID (e.g. 'bac-man')
      playSuccessSound();
      
      // Trigger confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Unlock error:', err);
      setStatus('error');
      setErrorMessage('Có lỗi xảy ra khi lưu tiến độ. Vui lòng thử lại.');
    }
  }, [isValidSystemQR, extractCodeFromQR, profile, unlockProduct]);

  // Start scanning
  const startScanning = useCallback(() => {
    setCameraError('');
    setStatus('scanning');
    setIsScanning(true);
  }, []);

  // Effect to initialize camera when status becomes 'scanning'
  useEffect(() => {
    let active = true;

    const initCamera = async () => {
      if (status !== 'scanning') return;
      
      // Small delay for DOM and animations
      await new Promise(resolve => setTimeout(resolve, 500));
      if (!active) return;

      try {
        // Clear references
        if (scannerRef.current) {
          try {
            await scannerRef.current.stop();
          } catch (e) {}
          scannerRef.current = null;
        }

        let readerElement = document.getElementById('qr-reader');
        if (!readerElement) {
          // One more retry
          await new Promise(resolve => setTimeout(resolve, 500));
          readerElement = document.getElementById('qr-reader');
        }

        if (!readerElement) {
          setCameraError('Lỗi khởi tạo: Không tìm thấy khung quét. Vui lòng thử lại.');
          setStatus('idle');
          setIsScanning(false);
          return;
        }

        const { Html5Qrcode } = await import('html5-qrcode');
        if (!active) return;
        
        const html5QrCode = new Html5Qrcode('qr-reader');
        scannerRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText: string) => {
            if (active) handleScanSuccess(decodedText);
          },
          () => {} // Ignore errors
        );
      } catch (err: any) {
        if (!active) return;
        console.error('Camera error:', err);
        setIsScanning(false);
        setCameraError(err.message?.includes('Permission') 
          ? 'Vui lòng cho phép truy cập camera.' 
          : `Lỗi: ${err.message || 'Không thể khởi động camera'}`);
        setStatus('idle');
        scannerRef.current = null;
      }
    };

    initCamera();

    return () => {
      active = false;
    };
  }, [status, handleScanSuccess]);

  // Stop scanning
  const stopScanning = useCallback(async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch (e) {
        console.log('Scanner already stopped');
      }
      scannerRef.current = null;
    }
    setIsScanning(false);
    setStatus('idle');
  }, []);

  // Reset to scan again
  const resetScanner = useCallback(() => {
    setStatus('idle');
    setScanResult(null);
    setErrorMessage('');
    setCameraError('');
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card max-w-md w-full p-8 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center mx-auto mb-6">
            <QrCode size={40} />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-brown)] mb-4">
            Tham Gia Hành Trình Di Sản
          </h1>
          <p className="text-[var(--color-brown)]/70 mb-8">
            Vui lòng đăng nhập để lưu trữ bộ sưu tập quà tặng ba miền và mở khóa bản đồ của bạn.
          </p>
          <div className="flex flex-col gap-4">
            <Link href="/dang-nhap" className="btn-primary w-full py-4 text-center">
              Đăng Nhập Ngay
            </Link>
            <Link href="/" className="text-sm text-[var(--color-brown)]/60 hover:text-[var(--color-gold)] transition-colors">
              Quay về trang chủ
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pattern-bg py-12 px-4 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
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
          className="card p-6 min-h-[400px] flex flex-col items-center justify-center relative shadow-xl border-2 border-[var(--color-gold)]/20"
        >
          {/* QR Reader - Permanently in DOM for stability */}
          <div 
            className={`w-full max-w-[400px] mx-auto transition-all duration-300 ${status === 'scanning' ? 'opacity-100 h-auto visible relative py-4' : 'opacity-0 h-0 overflow-hidden invisible absolute'}`}
          >
            <div className="text-center">
              <div className="relative mb-6">
                <div 
                  id="qr-reader" 
                  className="w-full aspect-square rounded-2xl overflow-hidden bg-black shadow-inner border-4 border-white"
                />
                {/* Scanning overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 border-4 border-[var(--color-gold)] rounded-2xl opacity-40" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white/50 rounded-xl">
                    <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-[var(--color-gold)] rounded-tl-lg" />
                    <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-[var(--color-gold)] rounded-tr-lg" />
                    <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-[var(--color-gold)] rounded-bl-lg" />
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-[var(--color-gold)] rounded-br-lg" />
                  </div>
                </div>
              </div>
              
              <p className="text-[var(--color-brown)] mb-6 flex items-center justify-center gap-2">
                <RefreshCw size={18} className="animate-spin text-[var(--color-gold)]" />
                Đang tìm mã QR...
              </p>

              <button
                onClick={stopScanning}
                className="btn-secondary inline-flex items-center gap-2 px-8"
              >
                <X size={20} />
                Hủy Quét
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Idle State */}
            {status === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center w-full"
              >
                <div className="w-32 h-32 rounded-3xl gradient-gold mx-auto flex items-center justify-center mb-6 shadow-lg rotate-3">
                  <QrCode size={64} className="text-white" />
                </div>
                
                <h2 className="text-xl font-bold text-[var(--color-brown)] mb-2">
                  Sẵn Sàng Quét
                </h2>
                <p className="text-[var(--color-brown)]/70 mb-8">
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
                  className="btn-primary inline-flex items-center gap-3 text-lg px-10 py-5 shadow-lg shadow-[var(--color-gold)]/20"
                >
                  <Camera size={24} />
                  Mở Camera & Quét
                </button>

                <div className="mt-8 p-4 rounded-xl bg-[var(--color-cream)] border border-[var(--color-gold)]/20">
                  <h3 className="font-semibold text-[var(--color-brown)] mb-2 text-sm uppercase tracking-wider">
                    💡 Hướng dẫn quét
                  </h3>
                  <ul className="text-sm text-[var(--color-brown)]/70 text-left space-y-1">
                    <li>• Đưa mã QR vào chính giữa khung hình.</li>
                    <li>• Đảm bảo môi trường đủ ánh sáng.</li>
                    <li>• Giữ điện thoại cố định trong vài giây.</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Success State */}
            {status === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center w-full"
              >
                <div className="w-24 h-24 rounded-full gradient-gold mx-auto flex items-center justify-center mb-6 shadow-lg">
                  <CheckCircle size={48} className="text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-2">
                  {scanResult?.isSpecial ? '🎉 Mở Khóa Tuyệt Đỉnh!' : '🎉 Tuyệt Vời!'}
                </h2>
                
                <p className="text-[var(--color-brown)]/70 mb-6">
                  {scanResult?.isSpecial ? (
                    <span>Bạn đã thắp sáng <strong className="text-[var(--color-gold)] underline">toàn bộ 6 sản phẩm</strong> di sản!</span>
                  ) : (
                    <span>Bạn đã thắp sáng hương vị <strong className="text-[var(--color-gold)] underline">{scanResult?.product?.name}</strong>!</span>
                  )}
                </p>

                {scanResult?.product && (
                  <div className="mb-8 p-4 rounded-2xl bg-[var(--color-cream)] border-2 border-[var(--color-gold)]/10 flex items-center gap-4 shadow-sm">
                    <img 
                      src={scanResult.product.image} 
                      alt={scanResult.product.name}
                      className="w-20 h-20 rounded-xl object-cover shadow-md border-2 border-white"
                    />
                    <div className="text-left">
                      <p className="font-bold text-[var(--color-brown)] text-lg">{scanResult.product.name}</p>
                      <p className="text-sm text-[var(--color-gold)] font-medium">✨ {scanResult.product.regionName}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3 max-w-[280px] mx-auto">
                  <Link 
                    href="/ban-do" 
                    className="btn-primary inline-flex items-center justify-center gap-2 py-4"
                  >
                    <MapPin size={20} />
                    Xem Bản Đồ Di Sản
                  </Link>
                  <button 
                    onClick={resetScanner}
                    className="btn-secondary py-3"
                  >
                    Quét Sản Phẩm Khác
                  </button>
                </div>
              </motion.div>
            )}

            {/* Already Unlocked */}
            {status === 'already' && (
              <motion.div
                key="already"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center w-full"
              >
                <div className="w-24 h-24 rounded-full bg-blue-50 mx-auto flex items-center justify-center mb-6">
                  <Gift size={48} className="text-blue-500" />
                </div>
                
                <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-2">
                  Đã Khám Phá
                </h2>
                
                <p className="text-[var(--color-brown)]/70 mb-6">
                  Hương vị <strong>{scanResult?.product?.name}</strong> đã được bạn thắp sáng trước đó rồi.
                </p>

                <div className="flex flex-col gap-3 max-w-[280px] mx-auto">
                  <Link 
                    href="/ban-do" 
                    className="btn-primary inline-flex items-center justify-center gap-2 py-4 shadow-md bg-blue-600 hover:bg-blue-700"
                  >
                    <MapPin size={20} />
                    Vào Bản Đồ Di Sản
                  </Link>
                  <button 
                    onClick={resetScanner}
                    className="btn-secondary py-3 italic"
                  >
                    Thử quét mã khác
                  </button>
                </div>
              </motion.div>
            )}

            {/* Invalid / Error */}
            {(status === 'invalid' || status === 'error') && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center w-full"
              >
                <div className="w-24 h-24 rounded-full bg-red-50 mx-auto flex items-center justify-center mb-6 text-red-500">
                  <AlertTriangle size={48} />
                </div>
                
                <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-2">
                  Chưa Thành Công
                </h2>
                <p className="text-[var(--color-brown)]/70 mb-8 max-w-xs mx-auto">
                  {errorMessage || 'Rất tiếc, mã QR này không thể xử lý được lúc này.'}
                </p>

                <button 
                  onClick={resetScanner}
                  className="btn-primary px-12"
                >
                  Thử Lại
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Progress Tracker Appears when Logged In */}
        {user && profile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 card p-5 bg-white shadow-lg border border-[var(--color-gold)]/10"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-[var(--color-brown)] flex items-center gap-2">
                🏠 Tiến độ bộ sưu tập
              </span>
              <span className="text-sm font-bold text-[var(--color-gold)]">
                {profile.unlocked_products?.length || 0} / 6
              </span>
            </div>
            <div className="w-full h-3 bg-[var(--color-cream)] rounded-full overflow-hidden shadow-inner p-[2px]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((profile.unlocked_products?.length || 0) / 6) * 100}%` }}
                className="h-full gradient-gold rounded-full"
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
