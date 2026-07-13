import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Login } from './Login';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string) => defaultValue || key,
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
    
    expect(screen.getByLabelText('E-Mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Passwort')).toBeInTheDocument();
    expect(screen.getByText('Anmelden')).toBeInTheDocument();
    
    expect(screen.getByText('Kunde')).toBeInTheDocument();
    expect(screen.getByText('Mitarbeiter')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('autofills admin credentials when admin test button is clicked', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText('E-Mail') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Passwort') as HTMLInputElement;
    
    fireEvent.click(screen.getByText('Admin'));
    
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

    const emailInput = screen.getByLabelText('E-Mail') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Passwort') as HTMLInputElement;
    
    fireEvent.click(screen.getByText('Mitarbeiter'));
    
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

    const emailInput = screen.getByLabelText('E-Mail') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Passwort') as HTMLInputElement;
    
    fireEvent.click(screen.getByText('Kunde'));
    
    expect(emailInput.value).toBe('kunde@cafezeitlos.demo');
    expect(passwordInput.value).toBe('Kunde123!');
  });
});
