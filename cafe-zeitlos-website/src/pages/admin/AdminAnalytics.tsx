import { BarChart } from 'lucide-react';

export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-espresso-900">Analytics</h1>
          <p className="text-sm text-espresso-400 mt-1">Detaillierte Auswertungen und Statistiken.</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-warm-ivory-200 p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warm-ivory-100 text-espresso-400 mb-4">
          <BarChart size={32} />
        </div>
        <h2 className="text-xl font-medium text-espresso-900 mb-2">Auswertungen</h2>
        <p className="text-espresso-500 max-w-md mx-auto">
          Zukünftig sehen Sie hier detaillierte Verkaufsstatistiken, beliebte Artikel und Stoßzeiten.
        </p>
      </div>
    </div>
  );
}
