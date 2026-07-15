import { Coffee } from 'lucide-react';

export function AdminMenu() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-espresso-900">Speisekarte</h1>
          <p className="text-sm text-espresso-400 mt-1">Verwalten Sie Artikel und Verfügbarkeiten.</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-warm-ivory-200 p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warm-ivory-100 text-espresso-400 mb-4">
          <Coffee size={32} />
        </div>
        <h2 className="text-xl font-medium text-espresso-900 mb-2">Menü-Verwaltung</h2>
        <p className="text-espresso-500 max-w-md mx-auto">
          In der Demoversion können hier keine Artikel dauerhaft geändert werden. Die öffentliche Speisekarte wird aus der Datenbank geladen.
        </p>
      </div>
    </div>
  );
}
