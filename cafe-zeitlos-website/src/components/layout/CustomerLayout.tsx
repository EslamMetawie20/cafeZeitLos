
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, Heart, ShoppingBag, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { CartWidget } from '../ui/CartWidget';

export function CustomerLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream-50 pb-16 md:pb-0">
      {/* Top Header */}
      <header className="bg-white border-b border-warm-ivory-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-2xl text-espresso-800">Café Zeitlos</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-espresso-600 hidden md:inline-block">
              Hallo, {user?.name}
            </span>
            <button 
              onClick={handleLogout}
              className="text-espresso-600 hover:text-terracotta-600 transition-colors flex items-center gap-1 text-sm font-medium"
            >
              <LogOut size={18} />
              <span className="hidden md:inline-block">Abmelden</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-warm-ivory-200 z-50 px-6 py-3 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <NavItem to="/account" icon={<Home size={24} />} label="Home" />
        <NavItem to="/account/menu" icon={<ShoppingBag size={24} />} label="Bestellen" />
        <NavItem to="/account/favorites" icon={<Heart size={24} />} label="Favoriten" />
        <NavItem to="/account/profile" icon={<User size={24} />} label="Profil" />
      </nav>

      {/* Desktop Sidebar (Optional - for larger screens could be added here) */}
      <CartWidget />
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <NavLink
      to={to}
      end={to === '/account'}
      className={({ isActive }) => 
        `flex flex-col items-center space-y-1 transition-colors ${
          isActive ? 'text-terracotta-600' : 'text-espresso-400 hover:text-espresso-800'
        }`
      }
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </NavLink>
  );
}
