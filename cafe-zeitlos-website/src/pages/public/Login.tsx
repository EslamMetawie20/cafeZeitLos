import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, Coffee, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { DEMO_USERS } from '../../storage/demoDatabase';
import { useTranslation } from 'react-i18next';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleLogin = async (userId: string) => {
    setIsLoggingIn(true);
    setSelectedRole(userId);
    
    // Auto-fill animation effect
    await new Promise(r => setTimeout(r, 800));
    
    await login(userId);
    
    const user = DEMO_USERS.find(u => u.id === userId);
    if (user?.role === 'admin') navigate('/admin');
    else if (user?.role === 'staff') navigate('/staff');
    else navigate('/account');
  };

  return (
    <div className="min-h-screen bg-warm-ivory-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-warm-ivory-200">
        <div className="p-8 text-center bg-espresso-900 relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-serif text-cream-50 mb-2">Café Zeitlos</h1>
            <p className="text-espresso-200 text-sm">{t('login.title')}</p>
          </div>
        </div>

        <div className="p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800 text-center font-medium">
              {t('login.notice')}
            </p>
          </div>

          <div className="space-y-4">
            <RoleButton 
              title={t('login.customer_title')}
              desc={t('login.customer_desc')}
              icon={<UserCheck className="text-terracotta-600" size={24} />} 
              onClick={() => handleLogin('customer-1')}
              isLoading={isLoggingIn && selectedRole === 'customer-1'}
              disabled={isLoggingIn}
            />
            
            <RoleButton 
              title={t('login.staff_title')}
              desc={t('login.staff_desc')}
              icon={<Coffee className="text-espresso-600" size={24} />} 
              onClick={() => handleLogin('staff-1')}
              isLoading={isLoggingIn && selectedRole === 'staff-1'}
              disabled={isLoggingIn}
            />

            <RoleButton 
              title={t('login.admin_title')}
              desc={t('login.admin_desc')}
              icon={<ShieldCheck className="text-blue-600" size={24} />} 
              onClick={() => handleLogin('admin-1')}
              isLoading={isLoggingIn && selectedRole === 'admin-1'}
              disabled={isLoggingIn}
            />
          </div>
          
          <div className="mt-8 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-sm font-medium text-espresso-400 hover:text-espresso-800 transition-colors"
            >
              {t('login.back_home')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoleButton({ title, desc, icon, onClick, isLoading, disabled }: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center p-4 rounded-xl border-2 text-left transition-all group
        ${disabled && !isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        ${isLoading ? 'border-terracotta-400 bg-terracotta-50' : 'border-warm-ivory-200 hover:border-terracotta-400 hover:bg-warm-ivory-50'}
      `}
    >
      <div className="bg-white p-3 rounded-lg shadow-sm mr-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-espresso-900">{title}</h3>
        <p className="text-xs text-espresso-400 mt-1">{desc}</p>
      </div>
      <div className={`ml-4 ${isLoading ? 'animate-pulse' : 'opacity-0 group-hover:opacity-100 transition-opacity text-terracotta-600'}`}>
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-terracotta-600 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <ArrowRight size={20} />
        )}
      </div>
    </button>
  );
}
