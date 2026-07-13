
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { ClipboardList, CalendarCheck, Coffee, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function StaffLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen bg-warm-ivory-100 overflow-hidden">
      {/* Top Navbar */}
      <header className="bg-espresso-900 text-cream-50 h-16 flex items-center justify-between px-6 shadow-md z-20">
        <div className="flex items-center gap-3">
          <Coffee className="text-terracotta-400" />
          <span className="font-serif text-xl tracking-wide hidden md:inline-block">Staff Station</span>
        </div>
        
        <div className="flex items-center gap-6">
          <span className="text-sm text-espresso-200">
            Hallo, {user?.name}
          </span>
          <button 
            onClick={handleLogout}
            className="flex items-center text-sm font-medium text-espresso-200 hover:text-white transition-colors bg-espresso-800 px-3 py-1.5 rounded-md"
          >
            <LogOut size={16} className="mr-2" />
            Abmelden
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-20 md:w-56 bg-white border-r border-warm-ivory-200 flex flex-col z-10">
          <nav className="flex-1 py-6 space-y-2 px-3">
            <NavItem to="/staff" icon={<ClipboardList size={24} />} label="Bestellungen" end />
            <NavItem to="/staff/reservations" icon={<CalendarCheck size={24} />} label="Reservierungen" />
            <NavItem to="/staff/availability" icon={<Coffee size={24} />} label="Verfügbarkeit" />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function NavItem({ to, icon, label, end }: { to: string, icon: React.ReactNode, label: string, end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => 
        `flex flex-col md:flex-row items-center md:px-4 py-3 rounded-xl transition-all ${
          isActive 
            ? 'bg-terracotta-50 text-terracotta-700 shadow-sm border border-terracotta-100' 
            : 'text-espresso-400 hover:bg-warm-ivory-50 hover:text-espresso-800'
        }`
      }
    >
      <span className="md:mr-3 mb-1 md:mb-0">{icon}</span>
      <span className="text-[10px] md:text-sm font-medium">{label}</span>
    </NavLink>
  );
}
