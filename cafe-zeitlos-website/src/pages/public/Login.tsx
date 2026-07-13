import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Coffee, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { DEMO_USERS } from '../../storage/demoDatabase';

export function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  
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
    <div className="min-h-screen relative bg-[#f8f3eb] font-sans text-[#1d1c17]">
      <main className="relative z-10 w-full min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-[#fef9f1]/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 border border-[#d8c2b9]/30 flex flex-col items-center">
          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="group">
              <label htmlFor="email" className="block text-[#685c54] uppercase mb-2 tracking-wider text-xs font-semibold">
                E-Mail
              </label>
              <input 
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="beispiel@cafe-zeitlos.de"
                className="w-full bg-transparent border-b-2 border-[#d8c2b9]/50 px-0 py-2 text-[#1d1c17] focus:outline-none focus:border-[#8b4c2f] transition-colors duration-300 placeholder:text-[#d8c2b9]"
                required
              />
            </div>
            <div className="group relative">
              <label htmlFor="password" className="block text-[#685c54] uppercase mb-2 tracking-wider text-xs font-semibold">
                Passwort
              </label>
              <div className="relative">
                <input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b-2 border-[#d8c2b9]/50 px-0 py-2 text-[#1d1c17] focus:outline-none focus:border-[#8b4c2f] transition-colors duration-300 pr-10"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#86736c] hover:text-[#8b4c2f] transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm font-medium mt-2">{error}</p>
            )}

            <button 
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#8b4c2f] text-white font-semibold py-4 rounded-lg shadow-md hover:bg-[#70371c] transform active:scale-[0.98] transition-all duration-200 uppercase tracking-widest mt-4 flex items-center justify-center text-sm"
            >
              {isLoggingIn ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Anmelden'
              )}
            </button>
          </form>

          {/* Role Selection Divider */}
          <div className="w-full flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[#d8c2b9]/40"></div>
            <span className="text-[#685c54] uppercase text-xs tracking-wider font-semibold">Demo-Zugänge testen</span>
            <div className="flex-1 h-px bg-[#d8c2b9]/40"></div>
          </div>

          {/* Role Selection Grid */}
          <div className="grid grid-cols-3 gap-3 w-full">
            <button 
              type="button"
              onClick={() => fillDemoData('customer')}
              className={`role-card flex flex-col items-center justify-center p-4 bg-[#f8f3eb] rounded-xl border transition-all duration-300 group
                ${selectedRole === 'customer-1' ? 'ring-2 ring-[#5e5e48] bg-[#77775f]/20 border-transparent' : 'border-[#d8c2b9]/30 hover:border-[#5e5e48]/50 hover:bg-[#77775f]/10'}
              `}
            >
              <User className={`mb-2 transition-transform group-hover:scale-110 ${selectedRole === 'customer-1' ? 'text-[#1d1c17]' : 'text-[#5e5e48]'}`} size={24} />
              <span className={`text-xs text-center font-semibold ${selectedRole === 'customer-1' ? 'text-[#1d1c17]' : 'text-[#1d1c17]'}`}>Kunde</span>
            </button>
            <button 
              type="button"
              onClick={() => fillDemoData('staff')}
              className={`role-card flex flex-col items-center justify-center p-4 bg-[#f8f3eb] rounded-xl border transition-all duration-300 group
                ${selectedRole === 'staff-1' ? 'ring-2 ring-[#5e5e48] bg-[#77775f]/20 border-transparent' : 'border-[#d8c2b9]/30 hover:border-[#5e5e48]/50 hover:bg-[#77775f]/10'}
              `}
            >
              <Coffee className={`mb-2 transition-transform group-hover:scale-110 ${selectedRole === 'staff-1' ? 'text-[#1d1c17]' : 'text-[#5e5e48]'}`} size={24} />
              <span className={`text-xs text-center font-semibold ${selectedRole === 'staff-1' ? 'text-[#1d1c17]' : 'text-[#1d1c17]'}`}>Mitarbeiter</span>
            </button>
            <button 
              type="button"
              onClick={() => fillDemoData('admin')}
              className={`role-card flex flex-col items-center justify-center p-4 bg-[#f8f3eb] rounded-xl border transition-all duration-300 group
                ${selectedRole === 'admin-1' ? 'ring-2 ring-[#5e5e48] bg-[#77775f]/20 border-transparent' : 'border-[#d8c2b9]/30 hover:border-[#5e5e48]/50 hover:bg-[#77775f]/10'}
              `}
            >
              <ShieldCheck className={`mb-2 transition-transform group-hover:scale-110 ${selectedRole === 'admin-1' ? 'text-[#1d1c17]' : 'text-[#5e5e48]'}`} size={24} />
              <span className={`text-xs text-center font-semibold ${selectedRole === 'admin-1' ? 'text-[#1d1c17]' : 'text-[#1d1c17]'}`}>Admin</span>
            </button>
          </div>

          {/* Back to Website */}
          <div className="mt-8 text-center w-full">
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-[#685c54] hover:text-[#8b4c2f] transition-colors border-b border-transparent hover:border-[#8b4c2f] pb-1 text-sm font-semibold"
            >
              <ArrowLeft size={16} />
              Zurück zur Website
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
