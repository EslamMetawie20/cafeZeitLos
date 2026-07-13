
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const Gallery: React.FC = () => {
  const { t } = useTranslation();

  const images = [
    { src: '/images/gallery/gallery-interior.svg', alt: 'Innenraum', className: 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto' },
    { src: '/images/gallery/gallery-coffee.svg', alt: 'Kaffee', className: 'aspect-square' },
    { src: '/images/gallery/gallery-detail.svg', alt: 'Detail Einrichtung', className: 'aspect-square' },
    { src: '/images/gallery/gallery-exterior.svg', alt: 'Außenansicht', className: 'md:col-span-2 aspect-video md:aspect-[2/1]' },
  ];

  return (
    <section id="gallery" className="py-24 bg-cafe-ivory overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-cafe-espresso mb-4">
            {t('gallery.title')}
          </h2>
          <div className="w-20 h-1 bg-cafe-gold rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 md:h-[600px]">
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              className={`relative rounded-3xl overflow-hidden group bg-cafe-cream ${img.className}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-cafe-espresso/0 group-hover:bg-cafe-espresso/20 transition-colors duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
