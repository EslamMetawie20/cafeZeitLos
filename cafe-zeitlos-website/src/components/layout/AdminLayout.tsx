
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingBag, Calendar, Settings, LogOut, Coffee } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-warm-ivory-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-espresso-900 text-cream-50 flex flex-col shadow-xl z-20">
        <div className="h-16 flex items-center px-6 bg-espresso-950">
          <Coffee className="text-soft-gold-400 mr-3" />
          <span className="font-serif text-xl tracking-wide">Admin Portal</span>
        </div>
        
        <div className="px-6 py-4 border-b border-espresso-800">
          <p className="text-sm text-espresso-300">Angemeldet als</p>
          <p className="font-medium text-cream-50">{user?.name}</p>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto space-y-1 px-3">
          <NavItem to="/admin" icon={<LayoutDashboard size={20} />} label="Dashboard" end />
          <NavItem to="/admin/orders" icon={<ShoppingBag size={20} />} label="Bestellungen" />
          <NavItem to="/admin/reservations" icon={<Calendar size={20} />} label="Reservierungen" />
          <NavItem to="/admin/menu" icon={<Coffee size={20} />} label="Speisekarte" />
          <NavItem to="/admin/team" icon={<Users size={20} />} label="Team" />
          <NavItem to="/admin/settings" icon={<Settings size={20} />} label="Einstellungen" />
        </nav>

        <div className="p-4 border-t border-espresso-800">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-espresso-200 hover:text-white hover:bg-espresso-800 rounded-lg transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Abmelden
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top bar for mobile? If we want mobile admin... for now let's focus desktop-first for admin */}
        <header className="h-16 bg-white border-b border-warm-ivory-200 flex items-center justify-between px-8 z-10 shadow-sm">
          <h1 className="text-xl font-serif text-espresso-800">Café Zeitlos Management</h1>
          <div className="flex items-center gap-4">
             <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
               DEMO MODUS
             </span>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8 bg-warm-ivory-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function NavItem({ to, icon, label, end }: { to: string, icon: React.ReactNode, label: string, end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => 
        `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
          isActive 
            ? 'bg-soft-gold-500/20 text-soft-gold-400' 
            : 'text-espresso-300 hover:bg-espresso-800 hover:text-cream-50'
        }`
      }
    >
      <span className="mr-3">{icon}</span>
      {label}
    </NavLink>
  );
}
