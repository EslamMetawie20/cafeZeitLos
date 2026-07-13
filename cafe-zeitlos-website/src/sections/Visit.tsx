import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Clock, Copy, Camera, Info } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { type ReservationRequest } from '../types';

export const Visit: React.FC = () => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState<ReservationRequest>({
    date: '',
    time: '',
    guests: 2,
    name: '',
    note: ''
  });
  
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerated(true);
  };

  const getSummaryText = () => {
    return `Reservierungsanfrage Café Zeitlos\nName: ${formData.name}\nDatum: ${formData.date}\nUhrzeit: ${formData.time}\nPersonen: ${formData.guests}${formData.note ? `\nNotiz: ${formData.note}` : ''}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getSummaryText());
    alert('Kopiert!');
  };

  return (
    <section id="visit" className="py-24 bg-cafe-cream/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-cafe-espresso mb-4">
            {t('visit.title')}
          </h2>
          <div className="w-20 h-1 bg-cafe-gold rounded-full mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Info Card */}
          <div className="flex-1 bg-cafe-espresso text-cafe-ivory rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cafe-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <h3 className="font-heading text-3xl font-bold mb-8 relative z-10">Café Zeitlos</h3>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cafe-cocoa flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-cafe-gold" />
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">Adresse</p>
                  <p className="text-cafe-cream/90 text-lg leading-relaxed">{t('visit.address')}</p>
                  <a 
                    href="https://maps.apple.com/?q=Rebenring+47a,+38106+Braunschweig" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-cafe-gold hover:text-white transition-colors underline underline-offset-4"
                  >
                    Route planen
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cafe-cocoa flex items-center justify-center flex-shrink-0">
                  <Clock size={24} className="text-cafe-gold" />
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">{t('visit.hours_title')}</p>
                  <p className="text-cafe-cream/90 text-lg leading-relaxed">{t('visit.hours_text')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cafe-cocoa flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-cafe-gold" />
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">Telefon</p>
                  <a href="tel:+4953112885768" className="text-cafe-cream/90 text-lg hover:text-white transition-colors">
                    {t('visit.phone')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Planner */}
          <div className="flex-1 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-cafe-cream relative">
            <h3 className="font-heading text-3xl font-bold text-cafe-espresso mb-2">{t('reservation.title')}</h3>
            <p className="text-cafe-text/70 mb-8">{t('reservation.disclaimer')}</p>

            {!isGenerated ? (
              <form onSubmit={handleGenerate} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="res-date" className="text-sm font-bold text-cafe-text block">{t('reservation.date')} *</label>
                    <input 
                      id="res-date"
                      type="date" 
                      required
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                      className="w-full bg-cafe-ivory border border-cafe-cream h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cafe-gold transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="res-time" className="text-sm font-bold text-cafe-text block">{t('reservation.time')} *</label>
                    <input 
                      id="res-time"
                      type="time" 
                      required
                      value={formData.time}
                      onChange={e => setFormData({...formData, time: e.target.value})}
                      className="w-full bg-cafe-ivory border border-cafe-cream h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cafe-gold transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="res-guests" className="text-sm font-bold text-cafe-text block">{t('reservation.guests')} *</label>
                    <input 
                      id="res-guests"
                      type="number" 
                      min="1"
                      max="20"
                      required
                      value={formData.guests}
                      onChange={e => setFormData({...formData, guests: parseInt(e.target.value) || 1})}
                      className="w-full bg-cafe-ivory border border-cafe-cream h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cafe-gold transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="res-name" className="text-sm font-bold text-cafe-text block">{t('reservation.name')} *</label>
                    <input 
                      id="res-name"
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-cafe-ivory border border-cafe-cream h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cafe-gold transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-cafe-text block">{t('reservation.note')}</label>
                  <textarea 
                    rows={3}
                    value={formData.note}
                    onChange={e => setFormData({...formData, note: e.target.value})}
                    className="w-full bg-cafe-ivory border border-cafe-cream p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cafe-gold transition-all resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <Button type="submit" fullWidth>{t('reservation.submit')}</Button>
                </div>
              </form>
            ) : (
              <div className="animate-in fade-in zoom-in duration-500">
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-xl flex items-start gap-3">
                  <Info className="text-amber-500 mt-0.5 flex-shrink-0" size={20} />
                  <p className="text-sm text-amber-800 font-medium leading-relaxed">
                    Dies ist noch keine bestätigte Reservierung. Kopiere die Anfrage und kontaktiere das Café per Instagram oder Telefon, um den Tisch zu bestätigen.
                  </p>
                </div>

                <div className="bg-cafe-ivory p-6 rounded-2xl border border-cafe-cream mb-6 whitespace-pre-wrap font-mono text-sm text-cafe-text/90">
                  {getSummaryText()}
                </div>

                <div className="flex flex-col gap-3">
                  <Button onClick={copyToClipboard} variant="secondary" className="gap-2">
                    <Copy size={20} />
                    {t('reservation.copy')}
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => window.open('https://www.instagram.com/cafezeitlos_bs/', '_blank')}
                      className="gap-2"
                    >
                      <Camera size={18} />
                      Instagram
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => window.open('tel:+4953112885768')}
                      className="gap-2"
                    >
                      <Phone size={18} />
                      Anrufen
                    </Button>
                  </div>
                  <button 
                    onClick={() => setIsGenerated(false)}
                    className="mt-4 text-sm font-medium text-cafe-text/60 hover:text-cafe-espresso underline underline-offset-4"
                  >
                    Anfrage bearbeiten
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
