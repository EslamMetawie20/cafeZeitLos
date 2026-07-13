import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

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
          className="max-w-3xl mx-auto flex flex-col items-center justify-center py-20 px-6 text-center border border-cafe-cream/60 rounded-[3rem] bg-cafe-cream/20 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-16 h-16 mb-6 rounded-full bg-cafe-gold/10 flex items-center justify-center text-cafe-gold"
          >
            <Camera size={28} strokeWidth={1.5} />
          </motion.div>
          
          <h3 className="font-heading text-2xl md:text-3xl font-medium text-cafe-espresso mb-4">
            Unsere Galerie wird aktuell neu gestaltet
          </h3>
          
          <p className="text-lg text-cafe-text/80 max-w-xl text-balance leading-relaxed">
            Hochwertige, echte Eindrücke aus unserem Café am Rebenring werden direkt nach unserem professionellen Fotoshooting hier ergänzt. 
            Wir freuen uns darauf, dir bald die echte Atmosphäre des Café Zeitlos zu zeigen.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
