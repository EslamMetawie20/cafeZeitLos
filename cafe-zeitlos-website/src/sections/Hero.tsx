import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Phone, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center pt-24 pb-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 flex-1 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Text Content */}
        <motion.div 
          className="flex-1 w-full flex flex-col items-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cafe-gold/10 text-cafe-gold text-sm font-semibold mb-6 border border-cafe-gold/20">
            <span className="w-2 h-2 rounded-full bg-cafe-terracotta"></span>
            {t('hero.halal')}
          </div>
          
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 text-cafe-espresso text-balance">
            {t('hero.subtitle').split('.').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}{i < arr.length - 1 ? '.' : ''}
                {i < arr.length - 1 && <br className="hidden md:block" />}
              </React.Fragment>
            ))}
          </h1>
          
          <p className="text-lg md:text-xl text-cafe-text opacity-90 max-w-lg mb-8 text-balance">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 mb-10">
            <Button 
              size="lg" 
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta_menu')}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="gap-2"
              onClick={() => window.open('https://maps.apple.com/?q=Rebenring+47a,+38106+Braunschweig', '_blank')}
            >
              <MapPin size={20} />
              {t('hero.cta_route')}
            </Button>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-cafe-text/80">
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-cafe-terracotta" />
              <a href="tel:+4953112885768" className="hover:text-cafe-espresso transition-colors">+49 531 12885768</a>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-cafe-text/30"></div>
            <div className="hidden sm:flex items-center gap-2">
              <span>{t('hero.hours')}</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          className="flex-1 w-full max-w-xl lg:max-w-none relative aspect-[4/3] lg:aspect-square"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-cafe-cream rounded-[2.5rem] md:rounded-[4rem] transform rotate-3 scale-105 opacity-50"></div>
          <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-cafe-ivory bg-cafe-ivory">
            <img 
              src="/images/placeholders/hero-lotus-pancakes.svg" 
              alt="Lotus Pancakes Highlight" 
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
          </div>
          
          {/* Floating badge */}
          <motion.div 
            className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-cafe-ivory p-4 md:p-6 rounded-2xl shadow-xl border border-cafe-cream max-w-[200px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="font-heading font-bold text-xl text-cafe-espresso mb-1">Lotus Pancakes</p>
            <p className="text-xs text-cafe-text opacity-80 leading-relaxed">Lotuscreme, weiße Schokolade, Lotus-Kekse und Früchte.</p>
          </motion.div>
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
