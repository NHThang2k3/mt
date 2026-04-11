'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  MapPin, 
  Calendar,
  ShoppingBag,
  ChevronRight,
  Loader2,
  AlertCircle,
  PackageCheck
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';
import { formatPrice } from '@/data/products';
import type { Order } from '@/types/database';
import { useToast } from '@/components/Toast';
import { useLanguageStore } from '@/store/languageStore';
import { translations } from '@/data/translations';


interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ShippingInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
}

export default function OrdersPage() {
  const { language } = useLanguageStore();
  const t = translations[language];
  const router = useRouter();
  const { showToast } = useToast();
  const { user, isInitialized, initialize, isLoading: authLoading } = useAuthStore();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [confirmingOrderId, setConfirmingOrderId] = useState<string | null>(null);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (!isInitialized && !authLoading) {
      initialize();
    }
  }, [isInitialized, authLoading, initialize]);

  useEffect(() => {
    // Only redirect after auth is fully initialized AND we confirmed there's no user
    // Also prevent multiple redirects
    if (isInitialized && !authLoading && !user && !hasRedirected) {
      setHasRedirected(true);
      router.push('/dang-nhap?redirect=/don-hang');
    }
  }, [user, isInitialized, authLoading, router, hasRedirected]);

  useEffect(() => {
    if (isInitialized && user) {
      fetchOrders();
    }
  }, [user, isInitialized]);

  const fetchRef = useRef(false);

  const fetchOrders = async (retryCount = 0) => {
    if (!user?.id) {
      console.warn('fetchOrders: No user ID available');
      setIsLoading(false);
      return;
    }

    // Prevent concurrent fetches unless it's a deliberate retry
    if (fetchRef.current && retryCount === 0) {
      console.log('fetchOrders: Fetch already in progress, skipping');
      return;
    }
    
    fetchRef.current = true;
    console.log(`fetchOrders: Fetching for user ${user.id} (Attempt ${retryCount + 1})`);
    setIsLoading(true);
    setFetchError(null);

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error; // Throw so it's caught by our unified error handler
      }

      console.log(`fetchOrders: Found ${data?.length || 0} orders`);
      setOrders(data || []);
      setIsLoading(false);
      fetchRef.current = false;
    } catch (error: unknown) {
      console.error(`fetchOrders error (Attempt ${retryCount + 1}):`, error);
      
      const errorMessage = error instanceof Error ? error.message : '';
      const errorName = error instanceof Error ? error.name : '';
      
      const isAbortError = errorName === 'AbortError' || 
                         errorMessage.includes('aborted') || 
                         errorMessage.includes('AbortError') ||
                         errorMessage.includes('signal is aborted');


      if (isAbortError && retryCount < 3) {
        const delay = (retryCount + 1) * 1500;
        console.warn(`fetchOrders: Request aborted, retrying in ${delay}ms...`);
        
        setTimeout(() => {
          fetchRef.current = false;
          fetchOrders(retryCount + 1);
        }, delay);
      } else {
        // Final failure
        fetchRef.current = false;
        setIsLoading(false);
        
        if (isAbortError) {
          setFetchError(language === 'vi' ? 'Kết nối tới máy chủ bị gián đoạn. Vui lòng kiểm tra lại mạng hoặc tải lại trang.' : 'Server connection interrupted. Please check your network or refresh the page.');
        } else {
          setFetchError(`${language === 'vi' ? 'Lỗi hệ thống' : 'System error'}: ${errorMessage || t.fetchErrorMsg}`);

        }

      }
    }
  };

  const confirmReceived = async (orderId: string) => {
    setConfirmingOrderId(orderId);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'delivered' })
        .eq('id', orderId);

      if (error) {
        console.error('Error confirming order:', error);
        showToast('error', t.confirmErrorMsg);
        return;
      }

      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'delivered' as const } : order
      ));

      showToast('success', t.confirmSuccessMsg);
    } catch (error) {
      console.error('Error:', error);
      showToast('error', language === 'vi' ? 'Có lỗi xảy ra' : 'An error occurred');
    } finally {
      setConfirmingOrderId(null);
    }

  };

  const getStatusInfo = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return { 
          label: t.orderPending, 
          color: 'bg-yellow-100 text-yellow-700',
          icon: <Clock size={16} />
        };
      case 'confirmed':
        return { 
          label: t.orderConfirmed, 
          color: 'bg-blue-100 text-blue-700',
          icon: <CheckCircle size={16} />
        };
      case 'shipped':
        return { 
          label: t.orderShipped, 
          color: 'bg-purple-100 text-purple-700',
          icon: <Truck size={16} />
        };
      case 'delivered':
        return { 
          label: t.orderDelivered, 
          color: 'bg-green-100 text-green-700',
          icon: <CheckCircle size={16} />
        };
      default:
        return { 
          label: t.orderUnknown, 
          color: 'bg-gray-100 text-gray-700',
          icon: <AlertCircle size={16} />
        };

    }
  };

  if (!isInitialized || authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center pattern-bg">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-[var(--color-gold)] mx-auto mb-4" />
          <p className="text-[var(--color-brown)]">{t.loading || (language === 'vi' ? 'Đang tải...' : 'Loading...')}</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen pattern-bg py-12">
      <div className="section max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-full gradient-gold mx-auto flex items-center justify-center mb-4">
            <Package size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--color-brown)] mb-2">
            {t.myOrders}
          </h1>
          <p className="text-[var(--color-brown)]/60">
            {t.orderStatusDesc}
          </p>

        </motion.div>

        {/* Error Display */}
        {fetchError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-8 text-center mb-8 border-2 border-red-200 bg-red-50"
          >
            <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-700 mb-2">
              {fetchError}
            </h2>
            <p className="text-red-600/70 mb-6">
              {language === 'vi' ? 'Vui lòng kiểm tra kết nối mạng và thử lại.' : 'Please check your connection and try again.'}
            </p>
            <button
              onClick={() => fetchOrders(0)}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Loader2 size={18} className={isLoading ? 'animate-spin' : 'hidden'} />
              {t.retry}
            </button>

          </motion.div>
        )}

        {/* Orders List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={40} className="animate-spin text-[var(--color-gold)]" />
          </div>
        ) : !fetchError && orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-12 text-center"
          >
            <ShoppingBag size={64} className="text-[var(--color-brown)]/20 mx-auto mb-6" />
            <h2 className="text-xl font-bold text-[var(--color-brown)] mb-2">
              {t.noOrders}
            </h2>
            <p className="text-[var(--color-brown)]/60 mb-8">
              {t.noOrdersDesc}
            </p>
            <Link href="/cua-hang" className="btn-primary inline-flex items-center gap-2">
              <ShoppingBag size={18} />
              {t.shopNow}
            </Link>

          </motion.div>
        ) : !fetchError && (
          <div className="space-y-6">
            {orders.map((order, index) => {
              const statusInfo = getStatusInfo(order.status);
              const items = order.items as unknown as OrderItem[];
              const shipping = order.shipping_info as unknown as ShippingInfo;
              const isConfirming = confirmingOrderId === order.id;
              
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b border-[var(--border)]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm text-[var(--color-brown)]/60">{t.orderId}:</span>
                          <span className="font-mono font-bold text-[var(--color-brown)]">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[var(--color-brown)]/60">
                          <Calendar size={14} />
                          {new Date(order.created_at).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>

                      </div>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${statusInfo.color}`}>
                        {statusInfo.icon}
                        {statusInfo.label}
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6 bg-[var(--color-cream)]/30">
                    <div className="space-y-3">
                      {items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[var(--color-gold)]/10 flex items-center justify-center">
                              <span className="text-lg">🍯</span>
                            </div>
                            <div>
                              <p className="font-medium text-[var(--color-brown)]">{item.name}</p>
                              <p className="text-sm text-[var(--color-brown)]/60">x{item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-medium text-[var(--color-brown)]">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Confirm Received Button for shipped orders */}
                  {order.status === 'shipped' && (
                    <div className="p-6 bg-purple-50 border-t border-purple-100">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3 text-purple-700">
                          <Truck size={24} />
                          <div>
                            <p className="font-semibold">{t.orderShippingMsg}</p>
                            <p className="text-sm text-purple-600">{t.orderConfirmHint}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => confirmReceived(order.id)}
                          disabled={isConfirming}
                          className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 whitespace-nowrap"
                        >
                          {isConfirming ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <PackageCheck size={18} />
                          )}
                          {isConfirming ? (language === 'vi' ? 'Đang xử lý...' : 'Processing...') : t.confirmReceived}
                        </button>

                      </div>
                    </div>
                  )}

                  {/* Order Footer */}
                  <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-2 text-sm text-[var(--color-brown)]/70">
                      <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{shipping.address}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-sm text-[var(--color-brown)]/60">{t.orderTotal}:</span>
                        <p className="text-xl font-bold text-[var(--color-gold)]">
                          {formatPrice(order.total)}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                        className="p-2 hover:bg-[var(--color-cream)] rounded-lg transition-colors"
                      >
                        <ChevronRight 
                          size={20} 
                          className={`text-[var(--color-brown)] transition-transform ${
                            selectedOrder?.id === order.id ? 'rotate-90' : ''
                          }`} 
                        />
                      </button>
                    </div>
                  </div>

                  {/* Order Details (Expanded) */}
                  {selectedOrder?.id === order.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6 border-t border-[var(--border)]"
                    >
                      <div className="pt-6 grid sm:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-[var(--color-brown)] mb-3">{t.shippingInfo}</h4>
                          <div className="space-y-2 text-sm text-[var(--color-brown)]/70">
                            <p><strong>{t.recipient}:</strong> {shipping.name}</p>
                            <p><strong>{t.phone}:</strong> {shipping.phone}</p>
                            {shipping.email && <p><strong>Email:</strong> {shipping.email}</p>}
                            <p><strong>{t.address}:</strong> {shipping.address}</p>
                            {shipping.note && <p><strong>{t.note}:</strong> {shipping.note}</p>}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[var(--color-brown)] mb-3">{t.paymentDetails}</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-[var(--color-brown)]/70">{t.subtotal}:</span>
                              <span>{formatPrice(order.total)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[var(--color-brown)]/70">{t.shippingFee}:</span>
                              <span className="text-green-600">{t.free}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-[var(--border)]">
                              <span className="font-semibold text-[var(--color-brown)]">{t.orderTotal}:</span>
                              <span className="font-bold text-[var(--color-gold)]">{formatPrice(order.total)}</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Back to shopping */}
        {orders.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link href="/cua-hang" className="btn-secondary inline-flex items-center gap-2">
              <ShoppingBag size={18} />
              {t.continueShopping}
            </Link>
          </motion.div>

        )}
      </div>
    </div>
  );
}
