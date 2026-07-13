
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartWidget } from '../ui/CartWidget';

export function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-cream-50 relative">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartWidget />
    </div>
  );
}
