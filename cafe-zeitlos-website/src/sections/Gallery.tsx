import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import galleryDemo from '../assets/gallery-demo.png';

export const Gallery: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="galerie" className="py-24 bg-cafe-ivory overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-cafe-espresso mb-4">
            {t('gallery.title')}
          </h2>
          <div className="w-20 h-1 bg-cafe-gold rounded-full mx-auto"></div>
        </div>

        <motion.div 
          className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-cafe-espresso/15 transition-all duration-700 hover:shadow-cafe-gold/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Internal demo marker to indicate this is not yet a real photo */}
          <img 
            src={galleryDemo} 
            alt="Café Zeitlos Atmosphäre" 
            className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] object-cover transition-transform duration-1000 hover:scale-[1.03]"
            data-demo="true"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};
