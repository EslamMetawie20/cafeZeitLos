import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, Coffee, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { DEMO_USERS } from '../../storage/demoDatabase';
import { useTranslation } from 'react-i18next';

export function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const { t } = useTranslation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'staff') navigate('/staff');
      else navigate('/account');
    }
  }, [user, navigate]);

  const fillDemoData = (role: 'admin' | 'staff' | 'customer') => {
    setError(null);
    if (role === 'admin') {
      setEmail('admin@cafezeitlos.demo');
      setPassword('Admin123!');
      setSelectedRole('admin-1');
    } else if (role === 'staff') {
      setEmail('mitarbeiter@cafezeitlos.demo');
      setPassword('Team123!');
      setSelectedRole('staff-1');
    } else {
      setEmail('kunde@cafezeitlos.demo');
      setPassword('Kunde123!');
      setSelectedRole('customer-1');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError(null);
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));
    
    // Simple validation based on demo credentials
    let userId = null;
    if (email === 'admin@cafezeitlos.demo' && password === 'Admin123!') userId = 'admin-1';
    else if (email === 'mitarbeiter@cafezeitlos.demo' && password === 'Team123!') userId = 'staff-1';
    else if (email === 'kunde@cafezeitlos.demo' && password === 'Kunde123!') userId = 'customer-1';

    if (userId) {
      await login(userId);
      const loggedUser = DEMO_USERS.find(u => u.id === userId);
      if (loggedUser?.role === 'admin') navigate('/admin');
      else if (loggedUser?.role === 'staff') navigate('/staff');
      else navigate('/account');
    } else {
      setError('Invalid credentials');
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-ivory-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-warm-ivory-200 flex flex-col md:flex-row">
        
        {/* Left side: Form */}
        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center relative">
          <div className="mb-8">
            <h1 className="text-3xl font-serif text-espresso-900 mb-2">{t('nav.demo_login')}</h1>
            <p className="text-espresso-400 text-sm">{t('login.notice')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-espresso-700 mb-1">{t('login.email')}</label>
              <input 
                id="email"
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-warm-ivory-300 focus:ring-2 focus:ring-terracotta-400 focus:border-terracotta-400 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-espresso-700 mb-1">{t('login.password')}</label>
              <div className="relative">
                <input 
                  id="password"
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-warm-ivory-300 focus:ring-2 focus:ring-terracotta-400 focus:border-terracotta-400 outline-none transition-all pr-12"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-espresso-400 hover:text-espresso-700 focus:outline-none"
                  aria-label={showPassword ? t('login.hide_password') : t('login.show_password')}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}

            <button 
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-cafe-terracotta text-white font-medium py-3 rounded-lg hover:bg-cafe-terracotta/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold flex items-center justify-center min-h-[44px]"
            >
              {isLoggingIn ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                t('login.submit')
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-sm font-medium text-espresso-400 hover:text-espresso-800 transition-colors focus-visible:outline-none focus-visible:underline"
            >
              {t('login.back')}
            </button>
          </div>
        </div>

        {/* Right side: Demo Roles */}
        <div className="bg-warm-ivory-50 p-8 md:p-12 md:w-1/2 border-t md:border-t-0 md:border-l border-warm-ivory-200 flex flex-col justify-center">
          <h2 className="text-lg font-medium text-espresso-800 mb-6">Demo Zugänge testen</h2>
          <div className="space-y-4">
            <RoleButton 
              title={t('login.customer_title')}
              desc={t('login.customer_desc')}
              icon={<UserCheck className={selectedRole === 'customer-1' ? 'text-white' : 'text-terracotta-600'} size={24} />} 
              onClick={() => fillDemoData('customer')}
              isActive={selectedRole === 'customer-1'}
            />
            
            <RoleButton 
              title={t('login.staff_title')}
              desc={t('login.staff_desc')}
              icon={<Coffee className={selectedRole === 'staff-1' ? 'text-white' : 'text-espresso-600'} size={24} />} 
              onClick={() => fillDemoData('staff')}
              isActive={selectedRole === 'staff-1'}
            />

            <RoleButton 
              title={t('login.admin_title')}
              desc={t('login.admin_desc')}
              icon={<ShieldCheck className={selectedRole === 'admin-1' ? 'text-white' : 'text-blue-600'} size={24} />} 
              onClick={() => fillDemoData('admin')}
              isActive={selectedRole === 'admin-1'}
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}

function RoleButton({ title, desc, icon, onClick, isActive }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center p-4 rounded-xl border-2 text-left transition-all group min-h-[44px]
        ${isActive ? 'border-terracotta-400 bg-terracotta-50' : 'border-warm-ivory-200 hover:border-terracotta-300 hover:bg-white'}
      `}
    >
      <div className={`p-3 rounded-lg shadow-sm mr-4 transition-colors ${isActive ? 'bg-terracotta-600' : 'bg-white group-hover:bg-warm-ivory-50'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className={`font-semibold ${isActive ? 'text-terracotta-900' : 'text-espresso-900'}`}>{title}</h3>
        <p className={`text-xs mt-1 ${isActive ? 'text-terracotta-700' : 'text-espresso-400'}`}>{desc}</p>
      </div>
    </button>
  );
}
