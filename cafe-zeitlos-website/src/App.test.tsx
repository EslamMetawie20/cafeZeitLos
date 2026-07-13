import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

window.scrollTo = vi.fn();

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'de', changeLanguage: vi.fn() }
  }),
}));

describe('App Routing', () => {
  const renderWithRoute = (route: string) => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <AuthProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );
  };

  it('renders GalleryPage on /gallery', () => {
    renderWithRoute('/gallery');
    expect(screen.getAllByText('gallery.title')[0]).toBeInTheDocument();
  });

  it('renders AboutPage on /about', () => {
    renderWithRoute('/about');
    expect(screen.getAllByText('about.title')[0]).toBeInTheDocument();
  });

  it('renders VisitPage on /visit', () => {
    renderWithRoute('/visit');
    expect(screen.getAllByText('visit.title')[0]).toBeInTheDocument();
  });

  it('renders LoginPage on /login', () => {
    renderWithRoute('/login');
    expect(screen.getAllByText('nav.demo_login')[0]).toBeInTheDocument();
  });
});
