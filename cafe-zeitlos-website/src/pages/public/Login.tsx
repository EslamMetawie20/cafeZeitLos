import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { DEMO_USERS } from '../../storage/demoDatabase';

export function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Pre-fill email from registration state
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
    if (location.state?.registered) {
      setShowSuccess(true);
      // Clean up state so refresh doesn't show toast again
      window.history.replaceState({}, document.title);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [location]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'staff') navigate('/staff');
      else navigate('/account');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError(null);
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));
    
    // Simple validation based on demo credentials
    let userId = null;
    
    // Check in-memory demo users first
    if (email.toLowerCase() === 'admin@cafezeitlos.demo' && password === 'Admin123!') userId = 'admin-1';
    else if (email.toLowerCase() === 'mitarbeiter@cafezeitlos.demo' && password === 'Team123!') userId = 'staff-1';
    else if (email.toLowerCase() === 'kunde@cafezeitlos.demo' && password === 'Kunde123!') userId = 'customer-1';
    
    // Check locally registered demo users
    if (!userId) {
      const storedUsersStr = localStorage.getItem('cz_registered_users');
      if (storedUsersStr) {
        const storedUsers = JSON.parse(storedUsersStr);
        const match = storedUsers.find((u: any) => u.email === email.toLowerCase() && u.password === password);
        if (match) {
          userId = match.id;
        }
      }
    }

    if (userId) {
      await login(userId);
      const loggedUser = DEMO_USERS.find(u => u.id === userId) || (() => {
        const storedUsersStr = localStorage.getItem('cz_registered_users');
        if (storedUsersStr) {
          return JSON.parse(storedUsersStr).find((u: any) => u.id === userId);
        }
        return null;
      })();
      
      if (loggedUser?.role === 'admin') navigate('/admin');
      else if (loggedUser?.role === 'staff') navigate('/staff');
      else navigate('/account');
    } else {
      setError(t('auth.error_invalid_credentials'));
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 py-24 overflow-hidden font-sans">
      {/* Premium Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/gallery/gallery-interior.webp" 
          alt="Café Zeitlos Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2c1e16]/60 backdrop-blur-[3px] mix-blend-multiply"></div>
      </div>

      <main className="relative z-10 w-full max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-[#fef9f1]/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 md:p-10 border border-white/20 flex flex-col items-center"
        >
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-serif font-bold text-[#2c1e16] mb-2">{t('auth.login_title')}</h2>
            <div className="w-12 h-1 bg-[#8b4c2f] mx-auto rounded-full opacity-80"></div>
          </div>

          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="w-full bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 flex items-start gap-3"
              >
                <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
                <p className="text-sm font-medium">{t('auth.demo_account_created')}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="group">
              <label htmlFor="email" className="block text-[#4a3b32] uppercase mb-1.5 tracking-wider text-xs font-bold">
                {t('auth.email')}
              </label>
              <input 
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.email_placeholder')}
                className={`w-full bg-white/50 border-2 ${error ? 'border-red-400' : 'border-[#d8c2b9]/40 focus:border-[#8b4c2f]'} rounded-xl px-4 py-3 text-[#1d1c17] focus:outline-none transition-all duration-300 placeholder:text-[#a89b95]`}
                required
              />
            </div>
            <div className="group relative">
              <label htmlFor="password" className="block text-[#4a3b32] uppercase mb-1.5 tracking-wider text-xs font-bold">
                {t('auth.password')}
              </label>
              <div className="relative">
                <input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth.password_placeholder')}
                  className={`w-full bg-white/50 border-2 ${error ? 'border-red-400' : 'border-[#d8c2b9]/40 focus:border-[#8b4c2f]'} rounded-xl px-4 py-3 text-[#1d1c17] focus:outline-none transition-all duration-300 placeholder:text-[#a89b95] pr-12`}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#86736c] hover:text-[#8b4c2f] transition-colors focus:outline-none p-2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2 text-center font-medium animate-pulse bg-red-50 p-2 rounded-lg">{error}</p>
            )}

            <button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full bg-[#8b4c2f] text-white font-semibold min-h-[48px] py-3.5 rounded-xl shadow-[0_4px_14px_0_rgba(139,76,47,0.39)] hover:bg-[#70371c] hover:shadow-[0_6px_20px_rgba(139,76,47,0.23)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 uppercase tracking-widest mt-6 flex items-center justify-center text-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoggingIn ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                t('auth.login_title')
              )}
            </button>
          </form>

          {/* Link to Register */}
          <div className="mt-8 text-center w-full">
            <p className="text-sm text-[#685c54] font-medium">
              {t('auth.no_account')}
              <Link to="/register" className="text-[#8b4c2f] hover:text-[#70371c] hover:underline font-bold ml-1 transition-colors">
                {t('auth.register_now')}
              </Link>
            </p>
          </div>

          {/* Back to Website */}
          <div className="mt-8 text-center w-full pt-6 border-t border-[#d8c2b9]/30">
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-[#685c54] hover:text-[#8b4c2f] transition-colors border-b border-transparent hover:border-[#8b4c2f] pb-1 text-sm font-semibold"
            >
              <ArrowLeft size={16} />
              {t('nav.home')}
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
