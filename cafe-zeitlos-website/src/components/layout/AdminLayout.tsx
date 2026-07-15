import { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingBag, Calendar, Settings, LogOut, Coffee, Menu, X, BarChart, ExternalLink } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

export function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const sidebarContent = (
    <>
      <div className="h-16 flex items-center px-6 bg-espresso-950 border-b border-espresso-800/50">
        <Coffee className="text-soft-gold-400 mr-3" />
        <span className="font-serif text-xl tracking-wide text-cream-50">Admin Portal</span>
      </div>
      
      <div className="px-6 py-5 border-b border-espresso-800/50">
        <p className="text-xs uppercase tracking-wider text-espresso-400 font-semibold mb-1">Angemeldet als</p>
        <p className="font-medium text-cream-50 truncate">{user?.name}</p>
        <div className="mt-1 flex items-center">
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-terracotta-900/50 text-terracotta-300 border border-terracotta-800">
            {user?.role === 'admin' ? 'Administrator' : user?.role}
          </span>
        </div>
      </div>

      <nav className="flex-1 py-6 overflow-y-auto space-y-1.5 px-4 custom-scrollbar">
        <div className="text-xs font-semibold text-espresso-400 uppercase tracking-wider mb-3 px-2">Hauptmenü</div>
        <NavItem to="/admin" icon={<LayoutDashboard size={20} />} label="Übersicht" onClick={closeMobileMenu} end />
        <NavItem to="/admin/orders" icon={<ShoppingBag size={20} />} label="Bestellungen" onClick={closeMobileMenu} />
        <NavItem to="/admin/reservations" icon={<Calendar size={20} />} label="Reservierungen" onClick={closeMobileMenu} />
        
        <div className="text-xs font-semibold text-espresso-400 uppercase tracking-wider mb-3 mt-6 px-2">Verwaltung</div>
        <NavItem to="/admin/menu" icon={<Coffee size={20} />} label="Speisekarte" onClick={closeMobileMenu} />
        <NavItem to="/admin/analytics" icon={<BarChart size={20} />} label="Analytics" onClick={closeMobileMenu} />
        <NavItem to="/admin/team" icon={<Users size={20} />} label="Team" onClick={closeMobileMenu} />
        <NavItem to="/admin/settings" icon={<Settings size={20} />} label="Einstellungen" onClick={closeMobileMenu} />
      </nav>

      <div className="p-4 border-t border-espresso-800/50 space-y-2">
        <Link 
          to="/"
          target="_blank"
          className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-espresso-300 hover:text-white hover:bg-espresso-800/50 rounded-xl transition-colors"
        >
          <ExternalLink size={20} className="mr-3 text-espresso-400" />
          Website ansehen
        </Link>
        <button 
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-espresso-300 hover:text-white hover:bg-red-900/40 hover:text-red-300 rounded-xl transition-colors group"
        >
          <LogOut size={20} className="mr-3 text-espresso-400 group-hover:text-red-400" />
          Abmelden
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-[100dvh] bg-warm-ivory-50 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-espresso-900 text-cream-50 flex-col shadow-xl z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-espresso-900/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-espresso-900 text-cream-50 flex flex-col shadow-2xl z-50 lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-[100dvh] overflow-hidden relative">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-warm-ivory-200 flex items-center justify-between px-4 lg:px-8 z-10 shadow-sm shrink-0">
          <div className="flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 mr-3 text-espresso-600 hover:bg-warm-ivory-100 rounded-lg lg:hidden"
              aria-label="Menü öffnen"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-serif text-espresso-900 hidden sm:block">Café Zeitlos <span className="text-espresso-400 font-sans text-lg">| Management</span></h1>
          </div>
          <div className="flex items-center gap-4">
             <span className="bg-red-50 text-red-700 border border-red-200 text-xs font-bold px-3 py-1 rounded-full animate-pulse flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
               DEMO
             </span>
          </div>
        </header>
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-warm-ivory-50 scroll-smooth">
          <div className="max-w-7xl mx-auto pb-12">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ to, icon, label, end, onClick }: { to: string, icon: React.ReactNode, label: string, end?: boolean, onClick?: () => void }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) => 
        `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
          isActive 
            ? 'bg-soft-gold-500/15 text-soft-gold-300 border border-soft-gold-500/20 shadow-sm' 
            : 'text-espresso-300 hover:bg-espresso-800/60 hover:text-cream-50 border border-transparent'
        }`
      }
    >
      <span className="mr-3">{icon}</span>
      {label}
    </NavLink>
  );
}
