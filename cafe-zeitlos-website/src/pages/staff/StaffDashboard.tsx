import { useTranslation } from 'react-i18next';
import { useOrders } from '../../hooks/useSyncState';
import { db } from '../../storage/demoDatabase';
import type { Order } from '../../types/models';
import { Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function StaffDashboard() {
  const { t } = useTranslation();
  const { orders } = useOrders();
  
  const pendingOrders = orders.filter(o => o.status === 'pending');
  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const readyOrders = orders.filter(o => o.status === 'ready');

  const updateStatus = (order: Order, newStatus: Order['status']) => {
    db.saveOrder({ ...order, status: newStatus, updatedAt: new Date().toISOString() });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-espresso-900">{t('dashboard.staff_title')}</h1>
          <p className="text-sm text-espresso-400">{t('dashboard.staff_subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* PENDING COLUMN */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-warm-ivory-200 flex flex-col h-[70vh]">
          <div className="flex items-center justify-between mb-4 border-b border-warm-ivory-100 pb-3">
            <h2 className="font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              {t('dashboard.status_new')} ({pendingOrders.length})
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            <AnimatePresence>
              {pendingOrders.map(order => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  actionLabel={t('dashboard.action_confirm')}
                  onAction={() => updateStatus(order, 'preparing')}
                />
              ))}
            </AnimatePresence>
            {pendingOrders.length === 0 && <EmptyState text={t('dashboard.empty_new')} />}
          </div>
        </div>

        {/* PREPARING COLUMN */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-warm-ivory-200 flex flex-col h-[70vh]">
          <div className="flex items-center justify-between mb-4 border-b border-warm-ivory-100 pb-3">
            <h2 className="font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-terracotta-400"></span>
              {t('dashboard.status_preparing')} ({preparingOrders.length})
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            <AnimatePresence>
              {preparingOrders.map(order => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  actionLabel={t('dashboard.action_ready')}
                  onAction={() => updateStatus(order, 'ready')}
                  actionColor="bg-green-600 hover:bg-green-700 text-white"
                />
              ))}
            </AnimatePresence>
            {preparingOrders.length === 0 && <EmptyState text={t('dashboard.empty_preparing')} />}
          </div>
        </div>

        {/* READY COLUMN */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-warm-ivory-200 flex flex-col h-[70vh]">
          <div className="flex items-center justify-between mb-4 border-b border-warm-ivory-100 pb-3">
            <h2 className="font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              {t('dashboard.status_ready')} ({readyOrders.length})
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            <AnimatePresence>
              {readyOrders.map(order => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  actionLabel={t('dashboard.action_delivered')}
                  onAction={() => updateStatus(order, 'delivered')}
                  actionColor="bg-espresso-100 hover:bg-espresso-200 text-espresso-800"
                />
              ))}
            </AnimatePresence>
            {readyOrders.length === 0 && <EmptyState text={t('dashboard.empty_ready')} />}
          </div>
        </div>

      </div>
    </div>
  );
}

function OrderCard({ order, actionLabel, onAction, actionColor = "bg-terracotta-600 hover:bg-terracotta-700 text-white" }: any) {
  const timeStr = new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className="bg-warm-ivory-50 border border-warm-ivory-200 rounded-xl p-4 shadow-sm"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="font-bold text-espresso-900">#{order.id.substring(0, 4)}</span>
          <p className="text-xs text-espresso-400 mt-1 flex items-center gap-1">
            <Clock size={12} /> {timeStr} • Tisch {order.tableNumber || 'Takeaway'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold">{order.customerName}</p>
        </div>
      </div>
      
      <ul className="space-y-2 mb-4 border-t border-b border-warm-ivory-200 py-3">
        {order.items.map((item: any) => (
          <li key={item.id} className="text-sm flex justify-between">
            <span><span className="font-semibold">{item.quantity}x</span> {item.name}</span>
          </li>
        ))}
      </ul>
      
      <button 
        onClick={onAction}
        className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${actionColor}`}
      >
        {actionLabel}
      </button>
    </motion.div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="h-full flex items-center justify-center text-espresso-300 text-sm italic">
      {text}
    </div>
  );
}
