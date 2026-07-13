import { useTranslation } from 'react-i18next';
import { useOrders, useReservations } from '../../hooks/useSyncState';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { db } from '../../storage/demoDatabase';

export function AdminDashboard() {
  const { t } = useTranslation();
  const { orders } = useOrders();
  const { reservations } = useReservations();

  const todayStr = new Date().toISOString().split('T')[0];
  const todaysOrders = orders.filter(o => o.createdAt.startsWith(todayStr));
  const todaysRevenue = todaysOrders.reduce((sum, order) => sum + order.total, 0);
  
  const activeReservations = reservations.filter(r => r.date >= todayStr && r.status === 'confirmed').length;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif text-espresso-900">{t('dashboard.admin_title')}</h1>
        <button 
          onClick={() => { if(confirm(t('dashboard.admin_reset_confirm'))) db.reset(); }}
          className="px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-md font-medium transition-colors"
        >
          {t('dashboard.admin_reset')}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title={t('dashboard.admin_revenue')}
          value={`€${todaysRevenue.toFixed(2)}`} 
          trend="+12.5%" 
          icon={<DollarSign className="text-green-600" size={24} />} 
          delay={0.1} 
        />
        <KpiCard 
          title={t('dashboard.admin_orders')}
          value={todaysOrders.length.toString()} 
          trend="+5.2%" 
          icon={<ShoppingBag className="text-terracotta-600" size={24} />} 
          delay={0.2} 
        />
        <KpiCard 
          title={t('dashboard.admin_reservations')}
          value={activeReservations.toString()} 
          trend={t('dashboard.admin_trend_stable')}
          icon={<Users className="text-blue-600" size={24} />} 
          delay={0.3} 
          trendNeutral
        />
        <KpiCard 
          title={t('dashboard.admin_conversion')}
          value="4.8%" 
          trend="+1.1%" 
          icon={<TrendingUp className="text-purple-600" size={24} />} 
          delay={0.4} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-warm-ivory-200 p-6">
          <h2 className="text-lg font-semibold text-espresso-900 mb-4">{t('dashboard.admin_recent_orders')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-warm-ivory-200 text-sm text-espresso-400">
                  <th className="pb-3 font-medium">{t('dashboard.admin_col_id')}</th>
                  <th className="pb-3 font-medium">{t('dashboard.admin_col_customer')}</th>
                  <th className="pb-3 font-medium">{t('dashboard.admin_col_status')}</th>
                  <th className="pb-3 font-medium text-right">{t('dashboard.admin_col_total')}</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map(order => (
                  <tr key={order.id} className="border-b border-warm-ivory-100 last:border-0">
                    <td className="py-3 text-sm font-medium text-espresso-900">#{order.id.substring(0,4)}</td>
                    <td className="py-3 text-sm">{order.customerName}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-1 text-xs rounded-full font-medium
                        ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${order.status === 'preparing' ? 'bg-terracotta-100 text-terracotta-800' : ''}
                        ${order.status === 'ready' ? 'bg-green-100 text-green-800' : ''}
                        ${order.status === 'delivered' ? 'bg-gray-100 text-gray-800' : ''}
                      `}>
                        {t(`dashboard.status_${order.status}`)}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-right font-medium">€{order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-espresso-900 rounded-2xl shadow-sm p-6 text-cream-50">
          <h2 className="text-lg font-semibold mb-4">{t('dashboard.admin_actions')}</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-espresso-800 hover:bg-espresso-700 rounded-xl text-sm font-medium transition-colors">
              {t('dashboard.admin_edit_menu')}
            </button>
            <button className="w-full text-left px-4 py-3 bg-espresso-800 hover:bg-espresso-700 rounded-xl text-sm font-medium transition-colors flex justify-between items-center">
              {t('dashboard.admin_pause_orders')}
              <div className="w-8 h-4 bg-green-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-0 shadow"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, trend, icon, delay, trendNeutral = false }: any) {
  const { t } = useTranslation();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white p-6 rounded-2xl border border-warm-ivory-200 shadow-sm flex items-start justify-between"
    >
      <div>
        <p className="text-sm font-medium text-espresso-400 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-espresso-900">{value}</h3>
        <p className={`text-xs mt-2 font-medium ${trendNeutral ? 'text-gray-500' : 'text-green-600'}`}>
          {trend} {trend !== t('dashboard.admin_trend_stable') && t('dashboard.admin_trend_week')}
        </p>
      </div>
      <div className="p-3 bg-warm-ivory-50 rounded-xl">
        {icon}
      </div>
    </motion.div>
  );
}
