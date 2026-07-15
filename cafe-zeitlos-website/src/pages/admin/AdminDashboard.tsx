import { useTranslation } from 'react-i18next';
import { useOrders, useReservations } from '../../hooks/useSyncState';
import { TrendingUp, TrendingDown, Users, ShoppingBag, DollarSign, AlertCircle, Clock, CheckCircle, Package, ArrowRight, Activity, Percent, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { db } from '../../storage/demoDatabase';
import { Link, useNavigate } from 'react-router-dom';


export function AdminDashboard() {
  const { t } = useTranslation();
  const { orders, updateOrder } = useOrders();
  const { reservations, updateReservation } = useReservations();
  const navigate = useNavigate();

  const todayStr = new Date().toISOString().split('T')[0];
  const todaysOrders = orders.filter(o => o.createdAt.startsWith(todayStr));
  const todaysRevenue = todaysOrders.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = todaysOrders.length > 0 ? todaysRevenue / todaysOrders.length : 0;
  
  const pendingOrders = orders.filter(o => o.status === 'pending');
  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const activeOrdersCount = pendingOrders.length + preparingOrders.length;
  
  const pendingReservations = reservations.filter(r => r.status === 'pending');
  const todaysReservations = reservations.filter(r => r.date === todayStr && r.status === 'confirmed');

  // Dummy logic for "delayed" orders (older than 30 mins)
  const delayedOrders = pendingOrders.filter(o => {
    const orderTime = new Date(o.createdAt).getTime();
    const now = new Date().getTime();
    return (now - orderTime) > 30 * 60 * 1000;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-espresso-900">Dashboard</h1>
          <p className="text-sm text-espresso-400 mt-1">Willkommen zurück. Hier ist Ihre Übersicht für heute.</p>
        </div>
        <button 
          onClick={() => { if(confirm(t('dashboard.admin_reset_confirm'))) db.reset(); }}
          className="px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl font-medium transition-colors shadow-sm"
        >
          {t('dashboard.admin_reset')}
        </button>
      </div>

      {/* 1. URGENT ACTION ITEMS (Attention Needed) */}
      {(pendingOrders.length > 0 || pendingReservations.length > 0 || delayedOrders.length > 0) && (
        <section>
          <h2 className="text-sm font-bold text-terracotta-700 uppercase tracking-wider mb-4 flex items-center gap-2">
            <AlertCircle size={16} /> Sofortige Aufmerksamkeit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {delayedOrders.length > 0 && (
              <ActionCard 
                icon={<Clock className="text-red-600" />}
                title={`${delayedOrders.length} Verspätete Bestellungen`}
                desc="Kunden warten länger als 30 Minuten."
                bg="bg-red-50" border="border-red-200" text="text-red-900"
                onClick={() => navigate('/admin/orders')}
              />
            )}
            {pendingOrders.length > 0 && (
              <ActionCard 
                icon={<ShoppingBag className="text-terracotta-600" />}
                title={`${pendingOrders.length} Neue Bestellungen`}
                desc="Müssen bestätigt und zubereitet werden."
                bg="bg-terracotta-50" border="border-terracotta-200" text="text-terracotta-900"
                onClick={() => navigate('/admin/orders')}
              />
            )}
            {pendingReservations.length > 0 && (
              <ActionCard 
                icon={<Calendar className="text-yellow-600" />}
                title={`${pendingReservations.length} Offene Reservierungen`}
                desc="Warten auf Ihre Bestätigung."
                bg="bg-yellow-50" border="border-yellow-200" text="text-yellow-900"
                onClick={() => navigate('/admin/reservations')}
              />
            )}
          </div>
        </section>
      )}

      {/* 2. KPIs (Business Health) */}
      <section>
        <h2 className="text-sm font-bold text-espresso-400 uppercase tracking-wider mb-4">Heutige Performance</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <KpiCard 
            title="Umsatz Heute"
            value={`€${todaysRevenue.toFixed(2)}`} 
            trend="+12%" isPositive={true}
            icon={<DollarSign className="text-green-600" size={24} />} 
            delay={0.1} 
            colorStyle="green"
          />
          <KpiCard 
            title="Bestellungen"
            value={todaysOrders.length.toString()} 
            trend="+5%" isPositive={true}
            icon={<ShoppingBag className="text-terracotta-600" size={24} />} 
            delay={0.2} 
            colorStyle="terracotta"
          />
          <KpiCard 
            title="Durchschnittswert"
            value={`€${avgOrderValue.toFixed(2)}`} 
            trend="-2%" isPositive={false}
            icon={<Activity className="text-blue-600" size={24} />} 
            delay={0.3} 
            colorStyle="blue"
          />
          <KpiCard 
            title="Reservierungen"
            value={todaysReservations.length.toString()} 
            trend="0%" isPositive={null}
            icon={<Users className="text-purple-600" size={24} />} 
            delay={0.4} 
            colorStyle="purple"
          />
        </div>
      </section>

      {/* 3. ACTIVE DATA TABLES */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Active Orders */}
        <section className="bg-white rounded-2xl shadow-sm border border-warm-ivory-200 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-warm-ivory-100 flex justify-between items-center bg-warm-ivory-50/50">
            <h2 className="text-lg font-semibold text-espresso-900 flex items-center gap-2">
              <ShoppingBag size={18} className="text-espresso-400"/> Aktive Bestellungen
            </h2>
            <Link to="/admin/orders" className="text-sm font-medium text-terracotta-600 hover:text-terracotta-700 flex items-center gap-1">
              Alle ansehen <ArrowRight size={16} />
            </Link>
          </div>
          <div className="p-0 overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <tbody className="divide-y divide-warm-ivory-100">
                {[...pendingOrders, ...preparingOrders].slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-warm-ivory-50/30 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-espresso-900">{order.customerName}</p>
                      <p className="text-xs text-espresso-400 mt-0.5">#{order.id.substring(0,5)} • {order.createdAt.substring(11, 16)}</p>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full font-medium border
                        ${order.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-terracotta-50 text-terracotta-700 border-terracotta-200'}
                      `}>
                        {order.status === 'pending' ? <Clock size={12}/> : <Package size={12}/>}
                        {t(`dashboard.status_${order.status}`)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      {order.status === 'pending' && (
                        <button onClick={() => updateOrder(order.id, {status: 'preparing'})} className="px-3 py-1.5 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-lg text-xs font-medium transition-colors shadow-sm">Zubereiten</button>
                      )}
                      {order.status === 'preparing' && (
                        <button onClick={() => updateOrder(order.id, {status: 'ready'})} className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition-colors shadow-sm">Fertig</button>
                      )}
                    </td>
                  </tr>
                ))}
                {activeOrdersCount === 0 && (
                  <tr><td colSpan={3} className="px-5 py-8 text-center text-espresso-400 text-sm">Keine aktiven Bestellungen.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Today's Reservations */}
        <section className="bg-white rounded-2xl shadow-sm border border-warm-ivory-200 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-warm-ivory-100 flex justify-between items-center bg-warm-ivory-50/50">
            <h2 className="text-lg font-semibold text-espresso-900 flex items-center gap-2">
              <Calendar size={18} className="text-espresso-400"/> Heutige Reservierungen
            </h2>
            <Link to="/admin/reservations" className="text-sm font-medium text-terracotta-600 hover:text-terracotta-700 flex items-center gap-1">
              Alle ansehen <ArrowRight size={16} />
            </Link>
          </div>
          <div className="p-0 overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <tbody className="divide-y divide-warm-ivory-100">
                {todaysReservations.slice(0, 5).map((res) => (
                  <tr key={res.id} className="hover:bg-warm-ivory-50/30 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-espresso-900">{res.name}</p>
                      <p className="text-xs text-espresso-400 mt-0.5">{res.guests} Personen</p>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-espresso-700">
                        <Clock size={14} className="text-espresso-400"/>
                        {res.time} Uhr
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                       <span className="inline-flex px-2.5 py-1 text-xs rounded-full font-medium border bg-green-50 text-green-700 border-green-200">
                        Bestätigt
                      </span>
                    </td>
                  </tr>
                ))}
                {todaysReservations.length === 0 && (
                  <tr><td colSpan={3} className="px-5 py-8 text-center text-espresso-400 text-sm">Keine bestätigten Reservierungen für heute.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}

function ActionCard({ icon, title, desc, bg, border, text, onClick }: any) {
  return (
    <motion.button 
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`text-left w-full p-4 rounded-2xl border ${bg} ${border} shadow-sm transition-all`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 p-2 rounded-full bg-white/60 shadow-sm ${text}`}>
          {icon}
        </div>
        <div>
          <h3 className={`font-semibold ${text}`}>{title}</h3>
          <p className={`text-xs mt-1 opacity-80 ${text}`}>{desc}</p>
        </div>
      </div>
    </motion.button>
  );
}

function KpiCard({ title, value, trend, isPositive, icon, delay, colorStyle }: any) {
  const bgColors: any = {
    green: 'bg-green-50',
    terracotta: 'bg-terracotta-50',
    blue: 'bg-blue-50',
    purple: 'bg-purple-50',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="bg-white p-5 rounded-2xl border border-warm-ivory-200 shadow-sm flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl ${bgColors[colorStyle]}`}>
          {icon}
        </div>
        {trend && (
          <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full 
            ${isPositive === true ? 'text-green-700 bg-green-50' : isPositive === false ? 'text-red-700 bg-red-50' : 'text-gray-600 bg-gray-100'}
          `}>
            {isPositive === true && <TrendingUp size={12} />}
            {isPositive === false && <TrendingDown size={12} />}
            {isPositive === null && <Percent size={12} />}
            {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-espresso-900 tracking-tight">{value}</h3>
        <p className="text-xs sm:text-sm font-medium text-espresso-400 mt-1">{title}</p>
      </div>
    </motion.div>
  );
}
