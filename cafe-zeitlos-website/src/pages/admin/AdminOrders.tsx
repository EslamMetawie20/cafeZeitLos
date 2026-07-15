import { useTranslation } from 'react-i18next';
import { useOrders } from '../../hooks/useSyncState';
import { ShoppingBag, Clock, CheckCircle, Package } from 'lucide-react';
import { motion } from 'framer-motion';

export function AdminOrders() {
  const { t } = useTranslation();
  const { orders, updateOrder } = useOrders();

  const handleStatusChange = (id: string, newStatus: any) => {
    updateOrder(id, { status: newStatus });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'preparing': return 'bg-terracotta-50 text-terracotta-700 border-terracotta-200';
      case 'ready': return 'bg-green-50 text-green-700 border-green-200';
      case 'delivered': return 'bg-warm-ivory-100 text-espresso-600 border-warm-ivory-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Sort orders by priority: pending -> preparing -> ready -> delivered
  const statusPriority: Record<string, number> = {
    pending: 1,
    preparing: 2,
    ready: 3,
    delivered: 4
  };

  const sortedOrders = [...orders].sort((a, b) => {
    return statusPriority[a.status] - statusPriority[b.status];
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-espresso-900">Bestellungen</h1>
          <p className="text-sm text-espresso-400 mt-1">Verwalten Sie alle aktiven und abgeschlossenen Bestellungen.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-warm-ivory-200 overflow-hidden">
        {/* Mobile View: Cards */}
        <div className="block md:hidden">
          {sortedOrders.map((order, i) => (
            <motion.div 
              key={order.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 border-b border-warm-ivory-100 last:border-0"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-bold text-espresso-400">#{order.id.substring(0, 5)}</span>
                  <p className="font-semibold text-espresso-900">{order.customerName}</p>
                </div>
                <span className={`px-2.5 py-1 text-xs rounded-full font-medium border ${getStatusColor(order.status)}`}>
                  {t(`dashboard.status_${order.status}`)}
                </span>
              </div>
              <div className="text-sm text-espresso-600 mb-3">
                <p>Uhrzeit: {order.createdAt.substring(11, 16)}</p>
                <p className="font-medium text-espresso-900 mt-1">Total: €{order.total.toFixed(2)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {order.status === 'pending' && <button onClick={() => handleStatusChange(order.id, 'preparing')} className="flex-1 py-2 bg-terracotta-600 text-white rounded-lg text-sm font-medium">In Zubereitung</button>}
                {order.status === 'preparing' && <button onClick={() => handleStatusChange(order.id, 'ready')} className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-medium">Abholbereit</button>}
                {order.status === 'ready' && <button onClick={() => handleStatusChange(order.id, 'delivered')} className="flex-1 py-2 bg-warm-ivory-200 text-espresso-800 rounded-lg text-sm font-medium">Abgeschlossen</button>}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-warm-ivory-50 border-b border-warm-ivory-200 text-xs uppercase tracking-wider text-espresso-400">
                <th className="px-6 py-4 font-semibold">Bestellung</th>
                <th className="px-6 py-4 font-semibold">Kunde</th>
                <th className="px-6 py-4 font-semibold">Uhrzeit</th>
                <th className="px-6 py-4 font-semibold">Betrag</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Aktion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-ivory-100">
              {sortedOrders.map((order, i) => (
                <motion.tr 
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-warm-ivory-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-espresso-900">#{order.id.substring(0, 5)}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-espresso-800 font-medium">{order.customerName}</td>
                  <td className="px-6 py-4 text-sm text-espresso-600">{order.createdAt.substring(11, 16)}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-espresso-900">€{order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs rounded-full font-medium border inline-flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                      {order.status === 'pending' && <Clock size={12} />}
                      {order.status === 'preparing' && <Package size={12} />}
                      {order.status === 'ready' && <CheckCircle size={12} />}
                      {t(`dashboard.status_${order.status}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {order.status === 'pending' && <button onClick={() => handleStatusChange(order.id, 'preparing')} className="px-3 py-1.5 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">Zubereiten</button>}
                      {order.status === 'preparing' && <button onClick={() => handleStatusChange(order.id, 'ready')} className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">Fertig</button>}
                      {order.status === 'ready' && <button onClick={() => handleStatusChange(order.id, 'delivered')} className="px-3 py-1.5 bg-warm-ivory-200 hover:bg-warm-ivory-300 text-espresso-800 rounded-lg text-sm font-medium transition-colors">Abschließen</button>}
                    </div>
                  </td>
                </motion.tr>
              ))}
              {sortedOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-espresso-400">
                    Keine Bestellungen vorhanden.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
