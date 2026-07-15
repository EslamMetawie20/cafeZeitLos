
import { useTranslation } from 'react-i18next';
import { Camera, MapPin, Phone, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-cafe-espresso text-cafe-cream pt-10 pb-6 md:py-16">
      <div className="container mx-auto px-5 md:px-6">

        {/* Top: Brand + Social */}
        <div className="mb-8 md:mb-0 md:hidden">
          <h2 className="font-heading text-2xl font-bold text-cafe-ivory mb-1">Café Zeitlos</h2>
          <p className="text-sm opacity-75 mb-4 max-w-xs">{t('hero.description')}</p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/cafezeitlos_bs/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-cafe-cocoa flex items-center justify-center text-cafe-gold hover:bg-cafe-gold hover:text-cafe-ivory transition-colors"
              aria-label="Instagram"
            >
              <Camera size={18} />
            </a>
            <a
              href="https://wolt.com/de/deu/brunswick/restaurant/cafe-zeitlos-1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#009de0] flex items-center justify-center hover:opacity-90 transition-opacity font-bold text-white text-xs"
              aria-label="Wolt"
            >
              Wolt
            </a>
          </div>
        </div>

        {/* Mobile: 2-col compact grid */}
        <div className="grid grid-cols-2 gap-8 md:hidden">
          {/* Visit Info */}
          <div>
            <h3 className="font-heading text-base font-semibold text-cafe-ivory mb-3">{t('visit.title')}</h3>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-cafe-gold flex-shrink-0 mt-0.5" />
                <span className="text-xs opacity-85 leading-snug">{t('visit.address')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="text-cafe-gold flex-shrink-0 mt-0.5" />
                <a href="tel:+4953112885768" className="text-xs opacity-85 hover:text-cafe-ivory transition-colors leading-snug">
                  {t('visit.phone')}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="text-cafe-gold flex-shrink-0 mt-0.5" />
                <span className="text-xs opacity-85 leading-snug">{t('quickInfo.hours')}</span>
              </li>
            </ul>
          </div>

          {/* Links + Legal */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-heading text-base font-semibold text-cafe-ivory mb-3">Links</h3>
              <ul className="space-y-1.5">
                <li>
                  <a href="#speisekarte" className="text-xs opacity-85 hover:text-cafe-ivory transition-colors">{t('nav.menu')}</a>
                </li>
                <li>
                  <a href="#ueber-uns" className="text-xs opacity-85 hover:text-cafe-ivory transition-colors">{t('nav.about')}</a>
                </li>
                <li>
                  <a href="#galerie" className="text-xs opacity-85 hover:text-cafe-ivory transition-colors">{t('nav.gallery')}</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-base font-semibold text-cafe-ivory mb-3">Rechtliches</h3>
              <ul className="space-y-1.5">
                <li>
                  <a href="#" className="text-xs opacity-85 hover:text-cafe-ivory transition-colors">{t('footer.imprint')}</a>
                </li>
                <li>
                  <a href="#" className="text-xs opacity-85 hover:text-cafe-ivory transition-colors">{t('footer.privacy')}</a>
                </li>
                <li>
                  <a href="/login" className="text-xs opacity-85 hover:text-cafe-ivory transition-colors">{t('nav.demo_login')}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop: full 4-col grid (unchanged) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h2 className="font-heading text-2xl font-bold mb-6 text-cafe-ivory">Café Zeitlos</h2>
            <p className="text-sm opacity-90 mb-6 max-w-xs text-balance">{t('hero.description')}</p>
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
                <a href="#speisekarte" className="text-sm opacity-90 hover:text-cafe-ivory transition-colors focus-visible:outline-none focus-visible:underline rounded">
                  {t('nav.menu')}
                </a>
              </li>
              <li>
                <a href="#ueber-uns" className="text-sm opacity-90 hover:text-cafe-ivory transition-colors focus-visible:outline-none focus-visible:underline rounded">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#galerie" className="text-sm opacity-90 hover:text-cafe-ivory transition-colors focus-visible:outline-none focus-visible:underline rounded">
                  {t('nav.gallery')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold mb-6 text-cafe-ivory">Rechtliches</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm opacity-90 hover:text-cafe-ivory transition-colors focus-visible:outline-none focus-visible:underline rounded">
                  {t('footer.imprint')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-90 hover:text-cafe-ivory transition-colors focus-visible:outline-none focus-visible:underline rounded">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="/login" className="text-sm opacity-90 hover:text-cafe-ivory transition-colors focus-visible:outline-none focus-visible:underline rounded">
                  {t('nav.demo_login')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cafe-cocoa mt-8 pt-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs opacity-60">
            &copy; {new Date().getFullYear()} Café Zeitlos.
          </p>
          <p className="text-xs opacity-40 bg-cafe-cocoa px-3 py-1 rounded-full">
            {t('footer.concept')}
          </p>
        </div>
      </div>
    </footer>
  );
};
