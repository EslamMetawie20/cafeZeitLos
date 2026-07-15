import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../../assets/logo.png';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [activeHash, setActiveHash] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all intersecting entries
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio (most visible first), or by vertical position
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const id = visibleEntries[0].target.id;
          if (id === 'home-hero') {
            setActiveHash('');
          } else if (id) {
            setActiveHash(`#${id}`);
          }
        }
      },
      { rootMargin: '-100px 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    const sectionIds = ['home-hero', 'speisekarte', 'highlights', 'galerie', 'ueber-uns', 'besuch-planen'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  // Robust scrolling
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Smooth scroll considering header height
        const headerOffset = 80; // approximate header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });
      }
    } else if (location.pathname === '/' && !location.hash) {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    }
  }, [location]);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'de' ? 'en' : 'de';
    i18n.changeLanguage(nextLang);
  };

  const handleNavClick = (path: string, hash?: string) => {
    setMobileMenuOpen(false);
    if (hash) {
      navigate(`${path}${hash}`);
    } else {
      navigate(path);
    }
  };

  const navLinks = [
    { name: t('nav.menu'), path: '/', hash: '#speisekarte' },
    { name: t('nav.highlights'), path: '/', hash: '#highlights' },
    { name: t('nav.gallery'), path: '/', hash: '#galerie' },
    { name: t('nav.visit'), path: '/', hash: '#besuch-planen' },
    { name: t('nav.about'), path: '/', hash: '#ueber-uns' },
  ];

  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = () => {
      const userStr = localStorage.getItem('cz_user');
      setCurrentUser(userStr ? JSON.parse(userStr) : null);
    };
    checkUser();
    
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLoginClick = (e: React.MouseEvent) => {
    if (currentUser) {
      e.preventDefault();
      localStorage.removeItem('cz_user');
      setCurrentUser(null);
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    }
  };

  const getLoginText = () => {
    return currentUser ? (i18n.language === 'de' ? 'Abmelden' : 'Logout') : t('nav.login');
  };

  const getLoginPath = () => {
    return currentUser ? '/' : '/login';
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isAuthPage 
          ? 'bg-cafe-ivory/95 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold rounded" onClick={() => setMobileMenuOpen(false)}>
            <div className="h-10 md:h-12 w-32 md:w-48 flex items-center justify-start overflow-visible">
              <img 
                src={logoImage} 
                alt="Café Zeitlos Logo" 
                className="w-full h-auto object-cover scale-[1.3] origin-left mix-blend-multiply transition-transform duration-300 hover:scale-[1.35]" 
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === '/' && activeHash === link.hash;

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
              className="flex items-center justify-center text-sm font-medium text-cafe-text hover:text-cafe-terracotta transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold rounded min-w-[44px] min-h-[44px]"
              aria-label={t('nav.switch_language')}
            >
              <AnimatePresence mode="wait">
                {i18n.language === 'de' ? (
                  <motion.div
                    key="en"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-1.5"
                  >
                    <span className="text-lg leading-none" aria-hidden="true">🇬🇧</span>
                    <span className="uppercase">EN</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="de"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-1.5"
                  >
                    <span className="text-lg leading-none" aria-hidden="true">🇩🇪</span>
                    <span className="uppercase">DE</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <Link 
              to={getLoginPath()}
              onClick={handleLoginClick}
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
              {navLinks.map((link) => {
                const isActive = location.pathname === '/' && activeHash === link.hash;
                return (
                  <button 
                    key={link.name} 
                    onClick={() => handleNavClick(link.path, link.hash)}
                    className={`py-4 text-lg font-medium border-b border-cafe-cream last:border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold rounded px-2 text-left flex items-center min-h-[44px] ${isActive ? 'text-cafe-terracotta underline' : 'text-cafe-text'}`}
                  >
                    {link.name}
                  </button>
                );
              })}
              
              <Link
                to={getLoginPath()}
                onClick={(e) => {
                  handleLoginClick(e);
                  setMobileMenuOpen(false);
                }}
                className="py-4 mt-2 mb-2 text-lg font-medium bg-cafe-terracotta text-white rounded-xl px-4 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold active:scale-95 transition-transform min-h-[44px]"
              >
                <User size={20} />
                {getLoginText()}
              </Link>
              
              <div className="py-4 flex justify-between items-center px-2 border-t border-cafe-cream mt-2">
                <span className="text-lg font-medium text-cafe-text min-h-[44px] flex items-center">{t('nav.language')}</span>
                <button
                  onClick={() => {
                    toggleLanguage();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center text-lg font-medium text-cafe-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold rounded min-w-[44px] min-h-[44px]"
                  aria-label={t('nav.switch_language')}
                >
                  <AnimatePresence mode="wait">
                    {i18n.language === 'de' ? (
                      <motion.div
                        key="en-mob"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-2xl leading-none" aria-hidden="true">🇬🇧</span>
                        <span className="uppercase">EN</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="de-mob"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-2xl leading-none" aria-hidden="true">🇩🇪</span>
                        <span className="uppercase">DE</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
