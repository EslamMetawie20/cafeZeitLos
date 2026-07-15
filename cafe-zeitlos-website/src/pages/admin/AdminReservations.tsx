import { useTranslation } from 'react-i18next';
import { useReservations } from '../../hooks/useSyncState';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export function AdminReservations() {
  const { t } = useTranslation();
  const { reservations, updateReservation } = useReservations();

  const handleStatusChange = (id: string, newStatus: any) => {
    updateReservation(id, { status: newStatus });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'confirmed': return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Sort: pending first, then confirmed, then cancelled
  const statusPriority: Record<string, number> = {
    pending: 1,
    confirmed: 2,
    cancelled: 3
  };

  const sortedReservations = [...reservations].sort((a, b) => {
    return statusPriority[a.status] - statusPriority[b.status];
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-espresso-900">Reservierungen</h1>
          <p className="text-sm text-espresso-400 mt-1">Bestätigen oder lehnen Sie Reservierungsanfragen ab.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-warm-ivory-200 overflow-hidden">
        {/* Mobile View */}
        <div className="block md:hidden">
          {sortedReservations.map((res, i) => (
            <motion.div 
              key={res.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 border-b border-warm-ivory-100 last:border-0"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-espresso-900">{res.name}</p>
                  <p className="text-xs text-espresso-500">{res.date} um {res.time} Uhr</p>
                </div>
                <span className={`px-2.5 py-1 text-xs rounded-full font-medium border ${getStatusColor(res.status)}`}>
                  {t(`dashboard.status_${res.status}`)}
                </span>
              </div>
              <div className="text-sm text-espresso-600 mb-3 flex items-center gap-2">
                <UsersIcon size={14} /> {res.guests} Personen
              </div>
              {res.status === 'pending' && (
                <div className="flex gap-2">
                  <button onClick={() => handleStatusChange(res.id, 'confirmed')} className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"><CheckCircle size={16}/> Bestätigen</button>
                  <button onClick={() => handleStatusChange(res.id, 'cancelled')} className="flex-1 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium flex items-center justify-center gap-2"><XCircle size={16}/> Ablehnen</button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-warm-ivory-50 border-b border-warm-ivory-200 text-xs uppercase tracking-wider text-espresso-400">
                <th className="px-6 py-4 font-semibold">Datum & Zeit</th>
                <th className="px-6 py-4 font-semibold">Gast</th>
                <th className="px-6 py-4 font-semibold">Personen</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-ivory-100">
              {sortedReservations.map((res, i) => (
                <motion.tr 
                  key={res.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-warm-ivory-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-espresso-900">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-espresso-400" />
                      {res.date} • {res.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-espresso-800 font-medium">{res.name}</td>
                  <td className="px-6 py-4 text-sm text-espresso-600">{res.guests}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs rounded-full font-medium border inline-flex items-center gap-1.5 ${getStatusColor(res.status)}`}>
                      {res.status === 'pending' && <Clock size={12} />}
                      {res.status === 'confirmed' && <CheckCircle size={12} />}
                      {res.status === 'cancelled' && <XCircle size={12} />}
                      {t(`dashboard.status_${res.status}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {res.status === 'pending' && (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleStatusChange(res.id, 'confirmed')} className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">Bestätigen</button>
                        <button onClick={() => handleStatusChange(res.id, 'cancelled')} className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm font-medium transition-colors">Ablehnen</button>
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
              {sortedReservations.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-espresso-400">
                    Keine Reservierungen vorhanden.
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

function UsersIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
