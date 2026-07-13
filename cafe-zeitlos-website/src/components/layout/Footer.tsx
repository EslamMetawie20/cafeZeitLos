
import { useTranslation } from 'react-i18next';
import { Camera, MapPin, Phone, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-cafe-espresso text-cafe-cream py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h2 className="font-heading text-2xl font-bold mb-6 text-cafe-ivory">Café Zeitlos</h2>
            <p className="text-sm opacity-90 mb-6 max-w-xs text-balance">
              {t('hero.description')}
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/cafezeitlos_bs/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cafe-cocoa flex items-center justify-center text-cafe-gold hover:bg-cafe-gold hover:text-cafe-ivory transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold"
                aria-label="Instagram"
              >
                <Camera size={20} />
              </a>
              {/* Wolt Placeholder Icon */}
              <a 
                href="https://wolt.com/de/deu/brunswick/restaurant/cafe-zeitlos-1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#009de0] flex items-center justify-center hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold font-bold text-white text-xs"
                aria-label="Wolt"
              >
                Wolt
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold mb-6 text-cafe-ivory">{t('visit.title')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-cafe-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm opacity-90">{t('visit.address')}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-cafe-gold flex-shrink-0 mt-0.5" />
                <a href="tel:+4953112885768" className="text-sm opacity-90 hover:text-cafe-ivory transition-colors">
                  {t('visit.phone')}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={20} className="text-cafe-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm opacity-90">{t('quickInfo.hours')}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold mb-6 text-cafe-ivory">Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#/menu" className="text-sm opacity-90 hover:text-cafe-ivory transition-colors focus-visible:outline-none focus-visible:underline rounded min-h-[44px] flex items-center">
                  {t('nav.menu')}
                </a>
              </li>
              <li>
                <a href="#/about" className="text-sm opacity-90 hover:text-cafe-ivory transition-colors focus-visible:outline-none focus-visible:underline rounded min-h-[44px] flex items-center">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#/gallery" className="text-sm opacity-90 hover:text-cafe-ivory transition-colors focus-visible:outline-none focus-visible:underline rounded min-h-[44px] flex items-center">
                  {t('nav.gallery')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold mb-6 text-cafe-ivory">Rechtliches</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm opacity-90 hover:text-cafe-ivory transition-colors focus-visible:outline-none focus-visible:underline rounded min-h-[44px] flex items-center">
                  {t('footer.imprint')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-90 hover:text-cafe-ivory transition-colors focus-visible:outline-none focus-visible:underline rounded min-h-[44px] flex items-center">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#/login" className="text-sm opacity-90 hover:text-cafe-ivory transition-colors focus-visible:outline-none focus-visible:underline rounded min-h-[44px] flex items-center">
                  {t('nav.demo_login')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cafe-cocoa mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-70">
            &copy; {new Date().getFullYear()} Café Zeitlos.
          </p>
          <p className="text-xs opacity-50 bg-cafe-cocoa px-3 py-1 rounded-full">
            {t('footer.concept')}
          </p>
        </div>
      </div>
    </footer>
  );
};
