
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 bg-cafe-espresso text-cafe-cream overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-cafe-cocoa bg-cafe-cocoa">
              <img 
                src={`${import.meta.env.BASE_URL}images/placeholders/hero-lotus-pancakes.svg`} 
                alt="Café Zeitlos Atmosphäre" 
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                loading="lazy"
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-cafe-ivory">
              {t('about.title')}
            </h2>
            <div className="w-20 h-1 bg-cafe-gold rounded-full mb-8"></div>
            <p className="text-xl md:text-2xl leading-relaxed text-cafe-cream/90 font-heading">
              {t('about.text')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
