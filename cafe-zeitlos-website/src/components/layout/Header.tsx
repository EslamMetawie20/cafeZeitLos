import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash === '#highlights') {
      setTimeout(() => {
        const element = document.getElementById('highlights');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'de' ? 'en' : 'de';
    i18n.changeLanguage(nextLang);
  };

  const handleNavClick = (path: string, hash?: string) => {
    setMobileMenuOpen(false);
    if (hash) {
      if (location.pathname === path) {
        // already on the page, just update hash or scroll
        navigate(`${path}${hash}`);
      } else {
        navigate(`${path}${hash}`);
      }
    } else {
      navigate(path);
    }
  };

  const navLinks = [
    { name: t('nav.menu'), path: '/menu' },
    { name: t('nav.highlights'), path: '/', hash: '#highlights' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.visit'), path: '/visit' },
  ];

  const getLoginText = () => {
    if (!user) return t('nav.login');
    if (user.role === 'admin') return t('nav.admin_area');
    if (user.role === 'staff') return t('nav.staff_area');
    return t('nav.my_account');
  };

  const getLoginPath = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'staff') return '/staff';
    return '/account';
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-cafe-ivory/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold rounded" onClick={() => setMobileMenuOpen(false)}>
            <span className="font-heading text-2xl font-bold tracking-tight text-cafe-espresso">
              Café Zeitlos
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = link.hash 
                ? location.pathname === link.path && location.hash === link.hash
                : location.pathname === link.path && !location.hash;

              return (
                <button 
                  key={link.name} 
                  onClick={() => handleNavClick(link.path, link.hash)}
                  className={`text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold rounded px-1 min-w-[44px] min-h-[44px] flex items-center ${isActive ? 'text-cafe-terracotta underline decoration-2 underline-offset-4' : 'text-cafe-text hover:text-cafe-terracotta'}`}
                >
                  {link.name}
                </button>
              );
            })}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm font-medium text-cafe-text hover:text-cafe-terracotta transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold rounded px-2 min-w-[44px] min-h-[44px]"
              aria-label={t('nav.language')}
            >
              <Globe size={18} />
              <span className="uppercase">{i18n.language}</span>
            </button>
            <Link 
              to={getLoginPath()}
              className="flex items-center gap-2 text-sm font-medium bg-cafe-terracotta text-white hover:bg-cafe-terracotta/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold rounded-full px-5 py-2.5 shadow-sm active:scale-95"
            >
              <User size={16} />
              <span>{getLoginText()}</span>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-cafe-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-cafe-ivory shadow-lg border-t border-cafe-cream lg:hidden overflow-hidden"
          >
            <nav className="flex flex-col p-4">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => handleNavClick(link.path, link.hash)}
                  className="py-4 text-lg font-medium text-cafe-text border-b border-cafe-cream last:border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold rounded px-2 text-left flex items-center min-h-[44px]"
                >
                  {link.name}
                </button>
              ))}
              
              <Link
                to={getLoginPath()}
                onClick={() => setMobileMenuOpen(false)}
                className="py-4 mt-2 mb-2 text-lg font-medium bg-cafe-terracotta text-white rounded-xl px-4 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold active:scale-95 transition-transform min-h-[44px]"
              >
                <User size={20} />
                {getLoginText()}
              </Link>
              
              <div className="py-4 flex justify-between items-center px-2 border-t border-cafe-cream mt-2">
                <span className="text-lg font-medium text-cafe-text min-h-[44px] flex items-center">{t('nav.language')}</span>
                <div className="flex gap-4">
                  {['de', 'en'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => {
                        i18n.changeLanguage(lang);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-lg font-medium uppercase min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold rounded ${i18n.language === lang ? 'text-cafe-terracotta underline' : 'text-cafe-text'}`}
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
