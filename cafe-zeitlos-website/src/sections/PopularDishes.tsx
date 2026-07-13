import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { menuData } from '../data/menu';
import { Button } from '../components/ui/Button';

export const PopularDishes: React.FC = () => {
  const { t } = useTranslation();
  
  // Get 6 popular dishes
  const popularDishes = menuData.filter(item => item.popular).slice(0, 6);

  return (
    <section id="popular" className="py-24 bg-cafe-cream/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-cafe-espresso mb-4">
              {t('popular.title')}
            </h2>
            <div className="w-20 h-1 bg-cafe-gold rounded-full"></div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('popular.view_all')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {popularDishes.map((dish, index) => (
            <motion.div 
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-cafe-ivory rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-cafe-cream flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={dish.image} 
                  alt={dish.imageAlt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {dish.dietaryTags.length > 0 && (
                  <div className="absolute top-4 left-4 flex gap-2">
                    {dish.dietaryTags.map(tag => (
                      <span key={tag} className="bg-cafe-ivory/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-cafe-olive rounded-full shadow-sm">
                        {t(`menu.filter_${tag.toLowerCase()}`, tag)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3 gap-4">
                  <h3 className="font-heading text-2xl font-bold text-cafe-espresso leading-tight">{dish.name}</h3>
                  <span className="font-semibold text-lg text-cafe-terracotta whitespace-nowrap">
                    {dish.price.toFixed(2).replace('.', ',')} €
                  </span>
                </div>
                <p className="text-cafe-text/80 text-sm md:text-base leading-relaxed flex-1">
                  {dish.description}
                </p>
                {dish.needsConfirmation && (
                  <p className="text-xs text-cafe-text/50 mt-4 italic">
                    *{t('menu.needs_confirmation')}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
