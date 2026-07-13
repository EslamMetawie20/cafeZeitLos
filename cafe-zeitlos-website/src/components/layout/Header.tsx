import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';


export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'de' ? 'en' : 'de';
    i18n.changeLanguage(nextLang);
  };

  const navLinks = [
    { name: t('nav.menu'), href: '#menu' },
    { name: t('nav.popular'), href: '#popular' },
    { name: t('nav.gallery'), href: '#gallery' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.visit'), href: '#visit' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-cafe-ivory/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold rounded">
            <span className="font-heading text-2xl font-bold tracking-tight text-cafe-espresso">
              Café Zeitlos
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-cafe-text hover:text-cafe-terracotta transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold rounded px-1"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm font-medium text-cafe-text hover:text-cafe-terracotta transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold rounded px-2 py-1"
              aria-label={t('nav.language')}
            >
              <Globe size={18} />
              <span className="uppercase">{i18n.language}</span>
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-cafe-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-cafe-ivory shadow-lg border-t border-cafe-cream md:hidden"
          >
            <nav className="flex flex-col p-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="py-4 text-lg font-medium text-cafe-text border-b border-cafe-cream last:border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold rounded px-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="py-4 flex justify-between items-center px-2 border-t border-cafe-cream mt-2">
                <span className="text-lg font-medium text-cafe-text">{t('nav.language')}</span>
                <div className="flex gap-4">
                  {['de', 'en'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => {
                        i18n.changeLanguage(lang);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-lg font-medium uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold rounded px-2 py-1 ${i18n.language === lang ? 'text-cafe-terracotta underline' : 'text-cafe-text'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
