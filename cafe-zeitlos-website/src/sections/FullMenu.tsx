import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { menuData } from '../data/menu';
import { type MenuItem } from '../types';
import { Dialog } from '../components/ui/Dialog';
import { Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const FullMenu: React.FC = () => {
  const { t } = useTranslation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const categories = ['all', 'popular', 'vegetarian', 'vegan', ...Array.from(new Set(menuData.map(item => item.category)))];

  const filteredData = useMemo(() => {
    return menuData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesCategory = true;
      if (activeCategory === 'popular') {
        matchesCategory = item.popular;
      } else if (activeCategory === 'vegetarian') {
        matchesCategory = item.dietaryTags.includes('Vegetarisch') || item.dietaryTags.includes('Vegan');
      } else if (activeCategory === 'vegan') {
        matchesCategory = item.dietaryTags.includes('Vegan');
      } else if (activeCategory !== 'all') {
        matchesCategory = item.category === activeCategory;
      }

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-cafe-espresso mb-4">
            {t('menu.title')}
          </h2>
          <div className="w-20 h-1 bg-cafe-gold rounded-full mx-auto mb-8"></div>
          
          {/* Demo Notice */}
          <div className="inline-block bg-cafe-cream/50 text-cafe-olive text-sm px-4 py-2 rounded-lg border border-cafe-cream mb-8 max-w-2xl text-balance">
            {t('menu.demo_notice')}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between bg-cafe-ivory p-4 rounded-2xl shadow-sm border border-cafe-cream">
          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cafe-text/40" size={20} />
            <input 
              type="text" 
              placeholder={t('menu.search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-cafe-cream h-12 pl-12 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cafe-gold focus:border-transparent text-cafe-text transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cafe-text/40 hover:text-cafe-espresso"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="w-full overflow-x-auto pb-2 -mb-2 hide-scrollbar">
            <div className="flex gap-3 min-w-max">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold ${
                    activeCategory === cat 
                      ? 'bg-cafe-espresso text-cafe-ivory shadow-md' 
                      : 'bg-white text-cafe-text hover:bg-cafe-cream border border-cafe-cream'
                  }`}
                >
                  {cat === 'all' || cat === 'popular' || cat === 'vegetarian' || cat === 'vegan' 
                    ? t(`menu.filter_${cat}`)
                    : cat.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8 text-cafe-text/60 text-sm font-medium">
          Zeigt {filteredData.length} {filteredData.length === 1 ? 'Ergebnis' : 'Ergebnisse'}
        </div>

        {/* Grid */}
        {filteredData.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredData.map(item => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="bg-white border border-cafe-cream rounded-2xl overflow-hidden hover:shadow-xl hover:border-cafe-gold/30 transition-all cursor-pointer group flex flex-col h-full"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-cafe-cream">
                    <img 
                      src={item.image} 
                      alt={item.imageAlt} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {item.dietaryTags.length > 0 && (
                      <div className="absolute top-3 left-3 flex gap-2">
                        {item.dietaryTags.map(tag => (
                          <span key={tag} className="bg-cafe-ivory/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold text-cafe-olive rounded-full shadow-sm">
                            {t(`menu.filter_${tag.toLowerCase()}`, tag)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="font-heading font-bold text-xl text-cafe-espresso leading-tight">{item.name}</h3>
                      <span className="font-semibold text-cafe-terracotta whitespace-nowrap">
                        {item.price.toFixed(2).replace('.', ',')} €
                      </span>
                    </div>
                    <p className="text-cafe-text/70 text-sm line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-xl text-cafe-text/60 mb-6">{t('menu.no_results')}</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="text-cafe-terracotta font-medium hover:text-cafe-espresso underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold rounded"
            >
              {t('menu.reset_filters')}
            </button>
          </div>
        )}

        {/* Modal */}
        <Dialog 
          isOpen={!!selectedItem} 
          onClose={() => setSelectedItem(null)}
          title={selectedItem?.name || ''}
        >
          {selectedItem && (
            <div>
              <div className="relative w-full aspect-[4/3] md:aspect-video bg-cafe-cream">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.imageAlt} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                  <div>
                    <h3 className="font-heading text-3xl md:text-4xl font-bold text-cafe-espresso mb-3">{selectedItem.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.dietaryTags.map(tag => (
                        <span key={tag} className="bg-cafe-cream px-3 py-1 text-xs uppercase tracking-wider font-bold text-cafe-olive rounded-full">
                          {t(`menu.filter_${tag.toLowerCase()}`, tag)}
                        </span>
                      ))}
                      <span className="bg-cafe-gold/20 text-cafe-gold px-3 py-1 text-xs uppercase tracking-wider font-bold rounded-full">
                        {selectedItem.category.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-cafe-terracotta">
                      {selectedItem.price.toFixed(2).replace('.', ',')} €
                    </div>
                  </div>
                </div>
                
                <div className="prose prose-cafe max-w-none">
                  <p className="text-lg text-cafe-text/90 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
                
                {selectedItem.needsConfirmation && (
                  <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-sm text-amber-800 font-medium">
                      * {t('menu.needs_confirmation')}: Die angegebenen Preise basieren auf externen Plattformen ({selectedItem.source}) {selectedItem.sourceDate && `Stand ${selectedItem.sourceDate}`}. Abweichungen im Café sind möglich.
                    </p>
                  </div>
                )}
                
                <div className="mt-8">
                  <Button 
                    fullWidth 
                    size="lg"
                    onClick={() => {
                      setSelectedItem(null);
                      document.getElementById('visit')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="gap-2"
                  >
                    <Calendar size={20} />
                    {t('menu.reserve_table', 'Tisch reservieren')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Dialog>
      </div>
    </section>
  );
};
