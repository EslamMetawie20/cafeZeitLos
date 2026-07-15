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

      {/* Mobile Menu — Full-Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-cafe-espresso/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-cafe-ivory z-50 lg:hidden flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-cafe-cream/60">
                <span className="font-heading text-2xl font-semibold text-cafe-espresso tracking-tight">Café Zeitlos</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-cafe-cream/60 text-cafe-espresso hover:bg-cafe-cream transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 flex flex-col px-6 py-8 gap-1 overflow-y-auto">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === '/' && activeHash === link.hash;
                  return (
                    <motion.button
                      key={link.name}
                      onClick={() => handleNavClick(link.path, link.hash)}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 + 0.1, duration: 0.3 }}
                      className={`group flex items-center justify-between py-4 text-left font-heading text-2xl font-medium border-b border-cafe-cream/50 last:border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold rounded-sm transition-colors ${
                        isActive
                          ? 'text-cafe-terracotta'
                          : 'text-cafe-espresso hover:text-cafe-terracotta'
                      }`}
                    >
                      <span>{link.name}</span>
                      <span className={`text-cafe-terracotta transition-transform duration-200 group-hover:translate-x-1 ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                      }`}>→</span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Bottom Actions */}
              <div className="px-6 py-6 border-t border-cafe-cream/60 flex flex-col gap-3">
                {/* Sign In Button */}
                <Link
                  to={getLoginPath()}
                  onClick={(e) => {
                    handleLoginClick(e);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2.5 py-3.5 px-6 bg-cafe-espresso text-cafe-ivory font-semibold text-base rounded-2xl shadow-md active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold"
                >
                  <User size={18} />
                  {getLoginText()}
                </Link>

                {/* Language Toggle */}
                <button
                  onClick={() => {
                    toggleLanguage();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2.5 py-3 px-6 bg-cafe-cream/70 text-cafe-espresso font-medium text-base rounded-2xl hover:bg-cafe-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold"
                  aria-label={t('nav.switch_language')}
                >
                  <AnimatePresence mode="wait">
                    {i18n.language === 'de' ? (
                      <motion.span
                        key="en-mob"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-xl" aria-hidden="true">🇬🇧</span>
                        <span>Switch to English</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="de-mob"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-xl" aria-hidden="true">🇩🇪</span>
                        <span>Auf Deutsch wechseln</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
