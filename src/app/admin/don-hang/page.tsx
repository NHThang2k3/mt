'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  MapPin, 
  Calendar,
  Phone,
  Mail,
  User,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Loader2,
  Search,
  Filter,
  Shield
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import { ADMIN_EMAIL } from '@/types/database';
import { formatPrice } from '@/data/products';
import type { Order } from '@/types/database';
import { useToast } from '@/components/Toast';

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

export default function AdminOrdersPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { user, isInitialized, initialize, isLoading: authLoading } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (!isInitialized && !authLoading) {
      initialize();
    }
  }, [isInitialized, authLoading, initialize]);

  useEffect(() => {
    // Only redirect after auth is fully initialized
    if (isInitialized && !authLoading && (!user || user.email !== ADMIN_EMAIL) && !hasRedirected) {
      setHasRedirected(true);
      router.push('/');
    }
  }, [user, isInitialized, authLoading, router, hasRedirected]);

  useEffect(() => {
    if (isInitialized && !authLoading && user?.email === ADMIN_EMAIL) {
      fetchOrders();
    }
  }, [isInitialized, authLoading, user?.email]);

  const fetchRef = useRef(false);

  const fetchOrders = async (retryCount = 0) => {
    // Prevent concurrent fetches unless it's a deliberate retry
    if (fetchRef.current && retryCount === 0) {
      console.log('Admin fetchOrders: Fetch already in progress, skipping');
      return;
    }

    fetchRef.current = true;
    console.log(`Admin: Fetching all orders... (Attempt ${retryCount + 1})`);
    setIsLoading(true);
    setFetchError(null);
    let caughtError: any = null;
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Admin: Error fetching orders:', error.message, error.details);
        setFetchError(`Lỗi hệ thống: ${error.message || 'Không thể tải danh sách đơn hàng'}`);
        showToast('error', 'Không thể tải danh sách đơn hàng');
      } else {
        console.log(`Admin: Found ${data?.length || 0} orders`);
        setOrders(data || []);
      }
    } catch (error: any) {
      caughtError = error;
      console.error('Admin: Caught error:', error);
      
      const isAbortError = error.name === 'AbortError' || 
                         error.message?.includes('aborted') || 
                         error.message?.includes('AbortError');

      if (isAbortError) {
        console.warn('Admin AbortError caught. Retrying...');
        if (retryCount < 2) {
          const delay = (retryCount + 1) * 1000;
          setTimeout(() => {
            fetchRef.current = false;
            fetchOrders(retryCount + 1);
          }, delay);
          return;
        }
        setFetchError('Kết nối bị gián đoạn. Vui lòng thử lại.');
      } else {
        setFetchError('Lỗi kết nối: ' + (error.message || 'Không thể kết nối đến máy chủ.'));
      }
    } finally {
      const isAbortError = caughtError?.name === 'AbortError' || caughtError?.message?.includes('aborted');
      if (!isAbortError || retryCount >= 2) {
        setIsLoading(false);
      }
      if (retryCount >= 0) {
        fetchRef.current = false;
      }
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    setUpdatingOrderId(orderId);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) {
        console.error('Error updating order:', error);
        showToast('error', 'Không thể cập nhật trạng thái đơn hàng');
        return;
      }

      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      const statusLabels: Record<Order['status'], string> = {
        pending: 'Chờ xác nhận',
        confirmed: 'Đã xác nhận',
        shipped: 'Đang giao hàng',
        delivered: 'Đã giao hàng'
      };

      showToast('success', `Đã cập nhật trạng thái: ${statusLabels[newStatus]}`);
    } catch (error) {
      console.error('Error:', error);
      showToast('error', 'Có lỗi xảy ra');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const getStatusInfo = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return { 
          label: 'Chờ xác nhận', 
          color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
          icon: <Clock size={16} />
        };
      case 'confirmed':
        return { 
          label: 'Đã xác nhận', 
          color: 'bg-blue-100 text-blue-700 border-blue-200',
          icon: <CheckCircle size={16} />
        };
      case 'shipped':
        return { 
          label: 'Đang giao hàng', 
          color: 'bg-purple-100 text-purple-700 border-purple-200',
          icon: <Truck size={16} />
        };
      case 'delivered':
        return { 
          label: 'Đã giao hàng', 
          color: 'bg-green-100 text-green-700 border-green-200',
          icon: <CheckCircle size={16} />
        };
      default:
        return { 
          label: 'Không xác định', 
          color: 'bg-gray-100 text-gray-700 border-gray-200',
          icon: <Package size={16} />
        };
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const shipping = order.shipping_info as unknown as ShippingInfo;
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipping.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipping.phone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  // Count by status
  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  };

  if (!isInitialized || authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 size={40} className="animate-spin text-amber-500 mb-4" />
        <p className="text-gray-500 animate-pulse">Đang kiểm tra quyền truy cập...</p>
      </div>
    );
  }

  if (!user || user?.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <Shield size={64} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Truy cập bị từ chối</h1>
        <p className="text-gray-500 text-center mb-6">Bạn không có quyền quản lý đơn hàng.</p>
        <Link href="/" className="btn-primary">
          Quay về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <Link 
              href="/admin"
              className="p-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Quản Lý Đơn Hàng</h1>
              <p className="text-gray-500">Xem và xử lý đơn hàng của khách hàng</p>
            </div>
          </div>

          <button
            onClick={() => fetchOrders(0)}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Loader2 size={18} className={isLoading ? 'animate-spin' : ''} />
            Làm mới
          </button>
        </motion.div>

        {/* Status Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {[
            { key: 'all', label: 'Tất cả' },
            { key: 'pending', label: 'Chờ xác nhận' },
            { key: 'shipped', label: 'Đang giao' },
            { key: 'delivered', label: 'Đã giao' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filterStatus === tab.key
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
              <span className="ml-2 px-2 py-0.5 rounded-full bg-black/10 text-xs">
                {statusCounts[tab.key as keyof typeof statusCounts]}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo mã đơn, tên, SĐT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>
        </motion.div>

        {/* Orders List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={40} className="animate-spin text-amber-500" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-12 text-center shadow-lg"
          >
            <Package size={64} className="text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">Không có đơn hàng</h2>
            <p className="text-gray-500">
              {filterStatus !== 'all' ? 'Không có đơn hàng nào ở trạng thái này' : 'Chưa có đơn hàng nào'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order, index) => {
              const statusInfo = getStatusInfo(order.status);
              const items = order.items as unknown as OrderItem[];
              const shipping = order.shipping_info as unknown as ShippingInfo;
              const isExpanded = expandedOrder === order.id;
              const isUpdating = updatingOrderId === order.id;
              
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* Order Header */}
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-amber-100">
                          <Package size={24} className="text-amber-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-mono font-bold text-gray-800">
                              #{order.id.slice(0, 8).toUpperCase()}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                              {statusInfo.icon}
                              {statusInfo.label}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <User size={14} />
                              {shipping.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone size={14} />
                              {shipping.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(order.created_at).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{items.length} sản phẩm</p>
                          <p className="text-xl font-bold text-amber-600">{formatPrice(order.total)}</p>
                        </div>
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-100"
                      >
                        <div className="p-6 grid lg:grid-cols-3 gap-6">
                          {/* Products */}
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3">Sản phẩm</h4>
                            <div className="space-y-2">
                              {items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                  <span className="text-gray-600">{item.name} x{item.quantity}</span>
                                  <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                                </div>
                              ))}
                              <div className="pt-2 border-t border-gray-100 flex justify-between font-semibold">
                                <span>Tổng cộng</span>
                                <span className="text-amber-600">{formatPrice(order.total)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Shipping Info */}
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3">Thông tin giao hàng</h4>
                            <div className="space-y-2 text-sm text-gray-600">
                              <p className="flex items-center gap-2">
                                <User size={14} />
                                {shipping.name}
                              </p>
                              <p className="flex items-center gap-2">
                                <Phone size={14} />
                                {shipping.phone}
                              </p>
                              {shipping.email && (
                                <p className="flex items-center gap-2">
                                  <Mail size={14} />
                                  {shipping.email}
                                </p>
                              )}
                              <p className="flex items-start gap-2">
                                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                                {shipping.address}
                              </p>
                              {shipping.note && (
                                <p className="italic text-gray-500">Ghi chú: {shipping.note}</p>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3">Cập nhật trạng thái</h4>
                            <div className="space-y-2">
                              {order.status === 'pending' && (
                                <button
                                  onClick={() => updateOrderStatus(order.id, 'shipped')}
                                  disabled={isUpdating}
                                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors disabled:opacity-50"
                                >
                                  {isUpdating ? (
                                    <Loader2 size={18} className="animate-spin" />
                                  ) : (
                                    <Truck size={18} />
                                  )}
                                  Xác nhận & Giao hàng
                                </button>
                              )}
                              
                              {order.status === 'shipped' && (
                                <div className="text-center py-4 px-4 bg-purple-50 rounded-xl">
                                  <Truck size={24} className="text-purple-500 mx-auto mb-2" />
                                  <p className="text-sm text-purple-700">
                                    Đang chờ khách hàng xác nhận đã nhận hàng
                                  </p>
                                </div>
                              )}

                              {order.status === 'delivered' && (
                                <div className="text-center py-4 px-4 bg-green-50 rounded-xl">
                                  <CheckCircle size={24} className="text-green-500 mx-auto mb-2" />
                                  <p className="text-sm text-green-700">
                                    Đơn hàng đã hoàn thành
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
