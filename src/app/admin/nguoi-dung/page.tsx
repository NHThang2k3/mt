'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Mail, 
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  DollarSign,
  Award,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Loader2,
  Search,
  Package
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import { ADMIN_EMAIL } from '@/types/database';
import { formatPrice } from '@/data/products';
import type { Profile, Order } from '@/types/database';
import { badgeInfo } from '@/store/userStore';

interface UserWithStats extends Profile {
  totalSpent: number;
  orderCount: number;
  productCount: number;
  orders: Order[];
}

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

export default function AdminUsersPage() {
  const router = useRouter();
  const { user, isInitialized, initialize } = useAuthStore();
  const [users, setUsers] = useState<UserWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  useEffect(() => {
    if (isInitialized && (!user || user.email !== ADMIN_EMAIL)) {
      router.push('/');
    }
  }, [user, isInitialized, router]);

  useEffect(() => {
    if (isInitialized && user?.email === ADMIN_EMAIL) {
      fetchUsers();
    }
  }, [isInitialized, user?.email]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Fetch all profiles
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profileError) {
        console.error('Error fetching profiles:', profileError);
        setIsLoading(false);
        return;
      }

      // Fetch all orders
      const { data: orders, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (orderError) {
        console.error('Error fetching orders:', orderError);
      }

      // Combine profiles with order stats
      const usersWithStats: UserWithStats[] = (profiles || []).map(profile => {
        const userOrders = (orders || []).filter(o => o.user_id === profile.id);
        const totalSpent = userOrders.reduce((sum, o) => sum + Number(o.total), 0);
        const productCount = userOrders.reduce((sum, o) => {
          const items = o.items as unknown as OrderItem[];
          return sum + items.reduce((itemSum, item) => itemSum + item.quantity, 0);
        }, 0);

        return {
          ...profile,
          totalSpent,
          orderCount: userOrders.length,
          productCount,
          orders: userOrders
        };
      });

      setUsers(usersWithStats);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter users
  const filteredUsers = users.filter(u => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      u.name?.toLowerCase().includes(searchLower) ||
      u.email?.toLowerCase().includes(searchLower)
    );
  });

  // Calculate totals
  const totalUsers = users.length;
  const totalRevenue = users.reduce((sum, u) => sum + u.totalSpent, 0);
  const totalOrders = users.reduce((sum, u) => sum + u.orderCount, 0);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-amber-500" />
      </div>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return null;
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
              <h1 className="text-3xl font-bold text-gray-800">Quản Lý Người Dùng</h1>
              <p className="text-gray-500">Xem thông tin và thống kê người dùng</p>
            </div>
          </div>

          <button
            onClick={fetchUsers}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Loader2 size={18} className={isLoading ? 'animate-spin' : ''} />
            Làm mới
          </button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Users size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Tổng người dùng</p>
                <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <DollarSign size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Tổng doanh thu</p>
                <p className="text-2xl font-bold text-gray-800">{formatPrice(totalRevenue)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <ShoppingBag size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Tổng đơn hàng</p>
                <p className="text-2xl font-bold text-gray-800">{totalOrders}</p>
              </div>
            </div>
          </div>
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
              placeholder="Tìm theo tên hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>
        </motion.div>

        {/* Users List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={40} className="animate-spin text-amber-500" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-12 text-center shadow-lg"
          >
            <Users size={64} className="text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">Không có người dùng</h2>
            <p className="text-gray-500">
              {searchTerm ? 'Không tìm thấy người dùng phù hợp' : 'Chưa có người dùng nào đăng ký'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredUsers.map((userData, index) => {
              const isExpanded = expandedUser === userData.id;
              // Get last order's shipping info for phone/address
              const lastOrder = userData.orders[0];
              const shippingInfo = lastOrder?.shipping_info as unknown as ShippingInfo | undefined;
              
              return (
                <motion.div
                  key={userData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* User Header */}
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedUser(isExpanded ? null : userData.id)}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {userData.name?.[0]?.toUpperCase() || userData.email?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">
                            {userData.name || 'Chưa có tên'}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Mail size={14} />
                              {userData.email || 'N/A'}
                            </span>
                            {shippingInfo?.phone && (
                              <span className="flex items-center gap-1">
                                <Phone size={14} />
                                {shippingInfo.phone}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(userData.created_at).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                          {/* Badges */}
                          {userData.badges && userData.badges.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {userData.badges.map(badge => {
                                const info = badgeInfo[badge as keyof typeof badgeInfo];
                                return info ? (
                                  <span 
                                    key={badge}
                                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium"
                                  >
                                    <span>{info.icon}</span>
                                    {info.name}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-amber-600">{formatPrice(userData.totalSpent)}</p>
                          <p className="text-xs text-gray-500">Tổng chi tiêu</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">{userData.orderCount}</p>
                          <p className="text-xs text-gray-500">Đơn hàng</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{userData.productCount}</p>
                          <p className="text-xs text-gray-500">Sản phẩm</p>
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
                        <div className="p-6">
                          <div className="grid lg:grid-cols-2 gap-6">
                            {/* User Info */}
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Users size={18} />
                                Thông tin người dùng
                              </h4>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                  <Mail size={16} className="text-gray-400 mt-0.5" />
                                  <div>
                                    <p className="text-gray-500 text-xs">Email</p>
                                    <p className="text-gray-800">{userData.email || 'N/A'}</p>
                                  </div>
                                </div>
                                {shippingInfo?.phone && (
                                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                    <Phone size={16} className="text-gray-400 mt-0.5" />
                                    <div>
                                      <p className="text-gray-500 text-xs">Số điện thoại</p>
                                      <p className="text-gray-800">{shippingInfo.phone}</p>
                                    </div>
                                  </div>
                                )}
                                {shippingInfo?.address && (
                                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                    <MapPin size={16} className="text-gray-400 mt-0.5" />
                                    <div>
                                      <p className="text-gray-500 text-xs">Địa chỉ gần nhất</p>
                                      <p className="text-gray-800">{shippingInfo.address}</p>
                                    </div>
                                  </div>
                                )}
                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                  <Award size={16} className="text-gray-400 mt-0.5" />
                                  <div>
                                    <p className="text-gray-500 text-xs">Danh hiệu</p>
                                    <p className="text-gray-800">
                                      {userData.badges && userData.badges.length > 0 
                                        ? userData.badges.map(b => badgeInfo[b as keyof typeof badgeInfo]?.name || b).join(', ')
                                        : 'Chưa có danh hiệu'
                                      }
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                  <Package size={16} className="text-gray-400 mt-0.5" />
                                  <div>
                                    <p className="text-gray-500 text-xs">Sản phẩm đã mở khóa</p>
                                    <p className="text-gray-800">
                                      {userData.unlocked_products?.length || 0} sản phẩm
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Recent Orders */}
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <ShoppingBag size={18} />
                                Đơn hàng gần đây
                              </h4>
                              {userData.orders.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                  Chưa có đơn hàng nào
                                </div>
                              ) : (
                                <div className="space-y-3 max-h-64 overflow-y-auto">
                                  {userData.orders.slice(0, 5).map(order => {
                                    const items = order.items as unknown as OrderItem[];
                                    return (
                                      <div key={order.id} className="p-3 bg-gray-50 rounded-xl">
                                        <div className="flex justify-between items-start mb-2">
                                          <span className="font-mono text-xs text-gray-500">
                                            #{order.id.slice(0, 8).toUpperCase()}
                                          </span>
                                          <span className={`text-xs px-2 py-1 rounded-full ${
                                            order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                                            'bg-yellow-100 text-yellow-700'
                                          }`}>
                                            {order.status === 'delivered' ? 'Đã giao' :
                                             order.status === 'shipped' ? 'Đang giao' : 'Chờ xử lý'}
                                          </span>
                                        </div>
                                        <p className="text-sm text-gray-800 font-medium">
                                          {formatPrice(order.total)}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {items.length} sản phẩm • {new Date(order.created_at).toLocaleDateString('vi-VN')}
                                        </p>
                                      </div>
                                    );
                                  })}
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
