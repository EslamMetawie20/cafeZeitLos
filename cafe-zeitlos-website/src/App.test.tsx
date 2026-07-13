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

  it('renders LoginPage on /login', () => {
    renderWithRoute('/login');
    expect(screen.getAllByText('nav.demo_login')[0]).toBeInTheDocument();
  });

  it('shows Hero first on / and not the menu', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );
    
    // Check order of elements in DOM
    const sections = container.querySelectorAll('section');
    expect(sections[0].id).toBe('home-hero');
    expect(sections[1].id).toBe('menu'); // FullMenu uses id="menu" internally
    expect(sections[2].id).toBe('highlights');
    expect(sections[3].id).toBe('gallery');
    expect(sections[4].id).toBe('about');
    expect(sections[5].id).toBe('visit');
  });

  it('contains correct Hero text', () => {
    renderWithRoute('/');
    // Since react-i18next is mocked to return the translation key, we assert on the key
    expect(screen.getByText('hero.subtitle')).toBeInTheDocument();
  });

  it('/highlights redirects to real highlights section', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/highlights']}>
        <AuthProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );
    // the redirect goes to /#highlights, rendering Home, which contains the highlights section
    expect(container.querySelector('#highlights')).toBeInTheDocument();
  });
});
