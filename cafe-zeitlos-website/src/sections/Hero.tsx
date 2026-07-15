import { motion } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';

import heroImage from '../assets/hero-coffee.png';

import { useTranslation } from 'react-i18next';

export const Hero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="home-hero" className="relative min-h-[100svh] flex flex-col justify-center pt-20 md:pt-24 pb-10 md:pb-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 sm:flex-1 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 lg:gap-20">
        
        {/* Text Content */}
        <motion.div 
          className="grow-0 sm:flex-1 w-full flex flex-col items-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >

          
          <h1 className="font-heading text-[clamp(2.25rem,8vw,5.5rem)] font-bold leading-[1.1] mb-4 md:mb-6 text-cafe-espresso">
            {t('hero.title_line1')}<br />
            {t('hero.title_line2')}<br />
            {t('hero.title_line3')}
          </h1>
          
          <p className="text-base md:text-xl text-cafe-text opacity-90 max-w-lg mb-4 md:mb-8 text-balance">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 md:gap-4 mb-6 md:mb-10">
            <Button 
              size="lg" 
              onClick={() => {
                const el = document.getElementById('visit');
                if (el) {
                  const headerOffset = 80;
                  const elementPosition = el.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.scrollY - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {t('hero.cta_visit')}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="gap-2"
              onClick={() => {
                const el = document.getElementById('highlights');
                if (el) {
                  const headerOffset = 80;
                  const elementPosition = el.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.scrollY - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {t('hero.cta_highlights')}
            </Button>
          </div>

          <div className="flex flex-col gap-1.5 md:gap-2 text-sm font-medium text-cafe-text/80">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-cafe-terracotta" />
              <span>{t('hero.address')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cafe-terracotta ml-1.5 mr-1"></span>
              <span>{t('hero.hours')}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 md:mt-2">
              <span className="px-2 py-0.5 md:py-1 rounded-md bg-cafe-gold/10 text-cafe-gold border border-cafe-gold/20 text-xs">
                {t('hero.halal')}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          className="w-full max-w-md sm:max-w-none relative h-48 sm:h-auto sm:flex-1 sm:aspect-square group z-0 mt-4 sm:mt-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <div className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-safe:hover:-translate-y-2">
            <img 
              src={heroImage} 
              alt="Café Zeitlos Frühstück - Cappuccino und Croissant"
              className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl scale-100 sm:scale-125 md:scale-[1.3] lg:scale-[1.35] xl:scale-[1.5] origin-center sm:origin-right translate-x-0 sm:translate-x-4 md:translate-x-6 lg:translate-x-12 xl:translate-x-20"
              loading="eager"
            />
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden md:flex"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-xs uppercase tracking-widest text-cafe-text/50 font-medium">Scroll</span>
        <ChevronDown size={20} className="text-cafe-text/50" />
      </motion.div>
    </section>
  );
};
