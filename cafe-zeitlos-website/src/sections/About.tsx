
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import aboutImage from '../assets/cafe-zeitlos-about-interior.webp';

export const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 bg-cafe-espresso text-cafe-cream overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none rounded-3xl overflow-hidden shadow-2xl shadow-black/40 group">
              <img 
                src={aboutImage} 
                alt={t('about.image_alt')} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
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
            <h2 className="font-heading text-[clamp(2rem,6vw,3rem)] font-bold mb-6 text-cafe-ivory">
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
