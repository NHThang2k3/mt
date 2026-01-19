'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  Share2, 
  MousePointerClick,
  ThumbsDown,
  ShoppingCart,
  DollarSign,
  Eye,
  Calendar,
  BarChart3,
  RefreshCw,
  Shield,
  QrCode
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import { ADMIN_EMAIL } from '@/types/database';
import type { AnalyticsDaily } from '@/types/database';

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  change?: number;
  color: string;
}

function MetricCard({ title, value, icon, change, color }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          {typeof change === 'number' && (
            <p className={`text-sm mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% so với hôm qua
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const { user, isInitialized, initialize } = useAuthStore();
  const [analytics, setAnalytics] = useState<AnalyticsDaily[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState<'7d' | '30d' | 'all'>('7d');

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
    if (user?.email === ADMIN_EMAIL) {
      fetchAnalytics();
    }
  }, [user, selectedRange]);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('analytics_daily')
        .select('*')
        .order('date', { ascending: false });

      if (selectedRange === '7d') {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        query = query.gte('date', sevenDaysAgo.toISOString().split('T')[0]);
      } else if (selectedRange === '30d') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        query = query.gte('date', thirtyDaysAgo.toISOString().split('T')[0]);
      }

      const { data, error } = await query;

      if (error) throw error;
      setAnalytics(data || []);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate totals
  const totals = analytics.reduce(
    (acc, day) => ({
      fanReach: acc.fanReach + day.fan_reach,
      pageViews: acc.pageViews + day.page_views,
      engagement: acc.engagement + day.engagement,
      storytellers: acc.storytellers + day.storytellers,
      clicks: acc.clicks + day.total_clicks,
      negativeFeedback: acc.negativeFeedback + day.negative_feedback,
      orders: acc.orders + day.total_orders,
      revenue: acc.revenue + day.total_revenue
    }),
    { fanReach: 0, pageViews: 0, engagement: 0, storytellers: 0, clicks: 0, negativeFeedback: 0, orders: 0, revenue: 0 }
  );

  // Calculate CTR (clicks / page_views * 100)
  const ctr = totals.pageViews > 0 ? ((totals.clicks / totals.pageViews) * 100).toFixed(2) : '0.00';

  // Calculate change from yesterday
  const today = analytics[0];
  const yesterday = analytics[1];
  const getChange = (todayVal: number, yesterdayVal: number) => {
    if (!yesterdayVal) return 0;
    return Math.round(((todayVal - yesterdayVal) / yesterdayVal) * 100);
  };

  if (!isInitialized || !user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-[var(--color-gold)] border-t-transparent rounded-full"
        />
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
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
              <Shield className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-500">Theo dõi tiêu chí đo lường</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Date Range Selector */}
            <div className="flex bg-white rounded-xl p-1 shadow-sm">
              {(['7d', '30d', 'all'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedRange === range
                      ? 'bg-amber-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {range === '7d' ? '7 ngày' : range === '30d' ? '30 ngày' : 'Tất cả'}
                </button>
              ))}
            </div>

            <button
              onClick={fetchAnalytics}
              className="p-3 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
              title="Làm mới dữ liệu"
            >
              <RefreshCw size={20} className={`text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            {/* Orders Management Button */}
            <Link
              href="/admin/don-hang"
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-sm hover:from-purple-600 hover:to-purple-700 transition-all"
              title="Quản lý đơn hàng"
            >
              <ShoppingCart size={20} />
              <span className="hidden sm:inline font-medium">Đơn Hàng</span>
            </Link>

            {/* Users Management Button */}
            <Link
              href="/admin/nguoi-dung"
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-sm hover:from-blue-600 hover:to-blue-700 transition-all"
              title="Quản lý người dùng"
            >
              <Users size={20} />
              <span className="hidden sm:inline font-medium">Người Dùng</span>
            </Link>

            {/* QR Codes Button */}
            <Link
              href="/qr-codes/qr-codes-preview.html"
              target="_blank"
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-xl shadow-sm hover:from-amber-600 hover:to-orange-600 transition-all"
              title="Xem QR Codes sản phẩm"
            >
              <QrCode size={20} />
              <span className="hidden sm:inline font-medium">QR Codes</span>
            </Link>
          </div>
        </motion.div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Fan Reach (Người dùng)"
            value={totals.fanReach.toLocaleString()}
            icon={<Users className="text-white" size={24} />}
            change={today && yesterday ? getChange(today.fan_reach, yesterday.fan_reach) : undefined}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <MetricCard
            title="Engagement (Tương tác)"
            value={totals.engagement.toLocaleString()}
            icon={<TrendingUp className="text-white" size={24} />}
            change={today && yesterday ? getChange(today.engagement, yesterday.engagement) : undefined}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <MetricCard
            title="Storytellers (Chia sẻ)"
            value={totals.storytellers.toLocaleString()}
            icon={<Share2 className="text-white" size={24} />}
            change={today && yesterday ? getChange(today.storytellers, yesterday.storytellers) : undefined}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <MetricCard
            title="CTR (Tỷ lệ click)"
            value={`${ctr}%`}
            icon={<MousePointerClick className="text-white" size={24} />}
            color="bg-gradient-to-br from-amber-500 to-orange-500"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Lượt xem trang"
            value={totals.pageViews.toLocaleString()}
            icon={<Eye className="text-white" size={24} />}
            color="bg-gradient-to-br from-cyan-500 to-cyan-600"
          />
          <MetricCard
            title="Tổng clicks"
            value={totals.clicks.toLocaleString()}
            icon={<MousePointerClick className="text-white" size={24} />}
            color="bg-gradient-to-br from-indigo-500 to-indigo-600"
          />
          <MetricCard
            title="Negative Feedback"
            value={totals.negativeFeedback.toLocaleString()}
            icon={<ThumbsDown className="text-white" size={24} />}
            change={today && yesterday ? getChange(today.negative_feedback, yesterday.negative_feedback) : undefined}
            color="bg-gradient-to-br from-red-500 to-red-600"
          />
          <MetricCard
            title="Đơn hàng"
            value={totals.orders.toLocaleString()}
            icon={<ShoppingCart className="text-white" size={24} />}
            color="bg-gradient-to-br from-pink-500 to-pink-600"
          />
        </div>

        {/* Revenue Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 shadow-lg mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-lg mb-2">Tổng Doanh Thu</p>
              <p className="text-4xl font-bold text-white">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totals.revenue)}
              </p>
            </div>
            <div className="p-4 bg-white/20 rounded-2xl">
              <DollarSign className="text-white" size={40} />
            </div>
          </div>
        </motion.div>

        {/* Daily Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <BarChart3 className="text-amber-500" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Chi Tiết Theo Ngày</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      Ngày
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Fan Reach</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Page Views</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Engagement</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Storytellers</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">CTR</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Neg. Feedback</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Doanh thu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {analytics.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      {isLoading ? 'Đang tải...' : 'Chưa có dữ liệu analytics'}
                    </td>
                  </tr>
                ) : (
                  analytics.map((day, index) => {
                    const dayCtr = day.page_views > 0 ? ((day.total_clicks / day.page_views) * 100).toFixed(2) : '0.00';
                    return (
                      <motion.tr
                        key={day.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                          {new Date(day.date).toLocaleDateString('vi-VN', {
                            weekday: 'short',
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 text-right">{day.fan_reach.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 text-right">{day.page_views.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 text-right">{day.engagement.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 text-right">{day.storytellers.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 text-right">{dayCtr}%</td>
                        <td className="px-6 py-4 text-sm text-right">
                          <span className={day.negative_feedback > 0 ? 'text-red-600 font-medium' : 'text-gray-600'}>
                            {day.negative_feedback}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 text-right font-medium">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(day.total_revenue)}
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
