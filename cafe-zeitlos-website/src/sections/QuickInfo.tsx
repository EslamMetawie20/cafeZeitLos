import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Clock, MapPin, Coffee } from 'lucide-react';

export const QuickInfo: React.FC = () => {
  const { t } = useTranslation();

  const items = [
    { icon: <ShieldCheck size={24} />, title: t('quickInfo.halal') },
    { icon: <Clock size={24} />, title: t('quickInfo.hours') },
    { icon: <MapPin size={24} />, title: t('quickInfo.address') },
    { icon: <Coffee size={24} />, title: t('quickInfo.highlights') },
  ];

  return (
    <section className="bg-cafe-espresso py-10 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-cafe-cocoa text-cafe-gold flex items-center justify-center mb-4 shadow-lg border border-cafe-gold/20">
                {item.icon}
              </div>
              <p className="text-cafe-cream font-medium text-sm md:text-base">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
