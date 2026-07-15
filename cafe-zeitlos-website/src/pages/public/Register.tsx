import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEMO_USERS } from '../../storage/demoDatabase';

export function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isRegistering, setIsRegistering] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!firstName.trim()) {
      newErrors.firstName = t('auth.error_first_name');
      isValid = false;
    }

    if (!lastName.trim()) {
      newErrors.lastName = t('auth.error_last_name');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = t('auth.error_email_invalid');
      isValid = false;
    } else {
      // Check if email already exists in DEMO_USERS or localStorage registered users
      const storedUsersStr = localStorage.getItem('cz_registered_users');
      const storedUsers = storedUsersStr ? JSON.parse(storedUsersStr) : [];
      const allEmails = [...DEMO_USERS, ...storedUsers].map(u => u.email?.toLowerCase() || u.id);
      
      if (allEmails.includes(email.toLowerCase()) || email.toLowerCase() === 'kunde@cafezeitlos.demo' || email.toLowerCase() === 'admin@cafezeitlos.demo' || email.toLowerCase() === 'mitarbeiter@cafezeitlos.demo') {
        newErrors.email = t('auth.error_email_exists');
        isValid = false;
      }
    }

    if (!password) {
      newErrors.password = t('auth.error_password_length');
      isValid = false;
    } else {
      if (password.length < 8) {
        newErrors.password = t('auth.error_password_length');
        isValid = false;
      } else if (!/[A-Z]/.test(password)) {
        newErrors.password = t('auth.error_password_uppercase');
        isValid = false;
      } else if (!/[a-z]/.test(password)) {
        newErrors.password = t('auth.error_password_lowercase');
        isValid = false;
      } else if (!/[0-9]/.test(password)) {
        newErrors.password = t('auth.error_password_number');
        isValid = false;
      }
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = t('auth.error_passwords_match');
      isValid = false;
    }

    if (!acceptTerms) {
      newErrors.terms = t('auth.error_terms');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsRegistering(true);
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 1000));
    
    // Store user
    const newUser = {
      id: `customer-${Date.now()}`,
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim().toLowerCase(),
      password: password, // For demo validation purposes
      role: 'customer'
    };

    const storedUsersStr = localStorage.getItem('cz_registered_users');
    const storedUsers = storedUsersStr ? JSON.parse(storedUsersStr) : [];
    storedUsers.push(newUser);
    localStorage.setItem('cz_registered_users', JSON.stringify(storedUsers));
    
    setIsRegistering(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      navigate('/login', { state: { email: newUser.email, registered: true } });
    }, 2500);
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

      <main className="relative z-10 w-full max-w-lg">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-[#fef9f1]/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 md:p-10 border border-white/20 flex flex-col items-center"
        >
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex flex-col items-center text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h2 className="text-xl font-bold text-[#1d1c17] mb-2">{t('auth.demo_account_created')}</h2>
              </motion.div>
            ) : (
              <motion.div key="form" className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-serif font-bold text-[#2c1e16] mb-2">{t('auth.register_title')}</h2>
                  <div className="w-12 h-1 bg-[#8b4c2f] mx-auto rounded-full opacity-80"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="group">
                      <label htmlFor="firstName" className="block text-[#4a3b32] uppercase mb-1.5 tracking-wider text-xs font-bold">
                        {t('auth.first_name')}
                      </label>
                      <input 
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={`w-full bg-white/50 border-2 ${errors.firstName ? 'border-red-400' : 'border-[#d8c2b9]/40 focus:border-[#8b4c2f]'} rounded-xl px-4 py-3 text-[#1d1c17] focus:outline-none transition-all duration-300`}
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.firstName}</p>}
                    </div>
                    <div className="group">
                      <label htmlFor="lastName" className="block text-[#4a3b32] uppercase mb-1.5 tracking-wider text-xs font-bold">
                        {t('auth.last_name')}
                      </label>
                      <input 
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={`w-full bg-white/50 border-2 ${errors.lastName ? 'border-red-400' : 'border-[#d8c2b9]/40 focus:border-[#8b4c2f]'} rounded-xl px-4 py-3 text-[#1d1c17] focus:outline-none transition-all duration-300`}
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.lastName}</p>}
                    </div>
                  </div>

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
                      className={`w-full bg-white/50 border-2 ${errors.email ? 'border-red-400' : 'border-[#d8c2b9]/40 focus:border-[#8b4c2f]'} rounded-xl px-4 py-3 text-[#1d1c17] focus:outline-none transition-all duration-300 placeholder:text-[#a89b95]`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
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
                        className={`w-full bg-white/50 border-2 ${errors.password ? 'border-red-400' : 'border-[#d8c2b9]/40 focus:border-[#8b4c2f]'} rounded-xl px-4 py-3 text-[#1d1c17] focus:outline-none transition-all duration-300 placeholder:text-[#a89b95] pr-12`}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-[#86736c] hover:text-[#8b4c2f] transition-colors focus:outline-none p-2"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
                  </div>

                  <div className="group relative">
                    <label htmlFor="confirmPassword" className="block text-[#4a3b32] uppercase mb-1.5 tracking-wider text-xs font-bold">
                      {t('auth.confirm_password')}
                    </label>
                    <div className="relative">
                      <input 
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={t('auth.password_placeholder')}
                        className={`w-full bg-white/50 border-2 ${errors.confirmPassword ? 'border-red-400' : 'border-[#d8c2b9]/40 focus:border-[#8b4c2f]'} rounded-xl px-4 py-3 text-[#1d1c17] focus:outline-none transition-all duration-300 placeholder:text-[#a89b95] pr-12`}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-[#86736c] hover:text-[#8b4c2f] transition-colors focus:outline-none p-2"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 font-medium">{errors.confirmPassword}</p>}
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input 
                          type="checkbox"
                          checked={acceptTerms}
                          onChange={(e) => setAcceptTerms(e.target.checked)}
                          className="peer sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 ${errors.terms ? 'border-red-400' : 'border-[#d8c2b9] peer-checked:border-[#8b4c2f]'} peer-checked:bg-[#8b4c2f] transition-colors flex items-center justify-center`}>
                          <CheckCircle2 size={14} className={`text-white opacity-0 peer-checked:opacity-100 transition-opacity`} />
                        </div>
                      </div>
                      <span className={`text-sm leading-snug font-medium ${errors.terms ? 'text-red-500' : 'text-[#685c54]'}`}>
                        {t('auth.accept_terms')}
                      </span>
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isRegistering}
                    className="w-full bg-[#8b4c2f] text-white font-semibold min-h-[48px] py-3.5 rounded-xl shadow-[0_4px_14px_0_rgba(139,76,47,0.39)] hover:bg-[#70371c] hover:shadow-[0_6px_20px_rgba(139,76,47,0.23)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 uppercase tracking-widest mt-6 flex items-center justify-center text-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isRegistering ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      t('auth.register_title')
                    )}
                  </button>
                </form>

                {/* Back to Login Link */}
                <div className="mt-8 text-center w-full">
                  <p className="text-sm text-[#685c54] font-medium">
                    {t('auth.already_account')}
                    <Link to="/login" className="text-[#8b4c2f] hover:text-[#70371c] hover:underline font-bold ml-1 transition-colors">
                      {t('auth.login_now')}
                    </Link>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </main>
    </div>
  );
}
