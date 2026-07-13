import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Login } from './Login';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'de' }
  }),
}));

describe('Login Component', () => {
  it('renders login form and demo buttons', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );
    
    expect(screen.getByLabelText('login.email')).toBeInTheDocument();
    expect(screen.getByLabelText('login.password')).toBeInTheDocument();
    expect(screen.getByText('login.submit')).toBeInTheDocument();
    
    expect(screen.getByText('login.customer_title')).toBeInTheDocument();
    expect(screen.getByText('login.staff_title')).toBeInTheDocument();
    expect(screen.getByText('login.admin_title')).toBeInTheDocument();
  });

  it('autofills admin credentials when admin test button is clicked', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText('login.email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('login.password') as HTMLInputElement;
    
    fireEvent.click(screen.getByText('login.admin_title'));
    
    expect(emailInput.value).toBe('admin@cafezeitlos.demo');
    expect(passwordInput.value).toBe('Admin123!');
  });

  it('autofills staff credentials when staff test button is clicked', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText('login.email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('login.password') as HTMLInputElement;
    
    fireEvent.click(screen.getByText('login.staff_title'));
    
    expect(emailInput.value).toBe('mitarbeiter@cafezeitlos.demo');
    expect(passwordInput.value).toBe('Team123!');
  });

  it('autofills customer credentials when customer test button is clicked', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText('login.email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('login.password') as HTMLInputElement;
    
    fireEvent.click(screen.getByText('login.customer_title'));
    
    expect(emailInput.value).toBe('kunde@cafezeitlos.demo');
    expect(passwordInput.value).toBe('Kunde123!');
  });
});
