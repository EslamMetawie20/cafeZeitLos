import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useOrders } from '../../hooks/useSyncState';
import { Clock, CheckCircle2, Package, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';

export function CustomerDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { orders } = useOrders();
  
  const myOrders = orders.filter(o => o.customerId === user?.id || o.customerName === user?.name);
  const activeOrder = myOrders.find(o => o.status !== 'delivered' && o.status !== 'cancelled');

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-ivory-200">
        <h2 className="text-xl font-serif text-espresso-900 mb-2">{t('dashboard.customer_welcome', { name: user?.name })}</h2>
        <p className="text-espresso-400 text-sm">{t('dashboard.customer_welcome_sub')}</p>
      </div>

      {activeOrder && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-espresso-900 rounded-2xl p-6 text-cream-50 shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Package size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="font-semibold text-lg mb-4">{t('dashboard.customer_active')}</h3>
            
            <div className="flex flex-col space-y-4 mb-6">
              {activeOrder.items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span className="text-espresso-200">€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-espresso-800 pt-4 mb-4 flex justify-between font-semibold">
              <span>{t('dashboard.customer_total')}</span>
              <span>€{activeOrder.total.toFixed(2)}</span>
            </div>

            <div className="bg-espresso-950 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {activeOrder.status === 'pending' && <Clock className="text-yellow-400 animate-pulse" />}
                {activeOrder.status === 'preparing' && <div className="w-5 h-5 border-2 border-terracotta-400 border-t-transparent rounded-full animate-spin" />}
                {activeOrder.status === 'ready' && <CheckCircle2 className="text-green-400" />}
                
                <span className="font-medium">
                  {activeOrder.status === 'pending' && t('dashboard.status_pending_long')}
                  {activeOrder.status === 'preparing' && t('dashboard.status_preparing_long')}
                  {activeOrder.status === 'ready' && t('dashboard.status_ready_long')}
                </span>
              </div>
              <span className="text-xs text-espresso-400">
                {activeOrder.tableNumber ? `${t('dashboard.customer_table')} ${activeOrder.tableNumber}` : t('dashboard.customer_takeaway')}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {!activeOrder && (
        <div className="bg-white rounded-2xl p-8 text-center border border-warm-ivory-200">
          <div className="w-16 h-16 bg-warm-ivory-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-espresso-400" size={32} />
          </div>
          <h3 className="font-semibold text-espresso-900 mb-2">{t('dashboard.customer_empty')}</h3>
          <p className="text-espresso-400 text-sm mb-6">{t('dashboard.customer_empty_desc')}</p>
          <Button variant="secondary">{t('dashboard.customer_view_menu')}</Button>
        </div>
      )}
    </div>
  );
}
