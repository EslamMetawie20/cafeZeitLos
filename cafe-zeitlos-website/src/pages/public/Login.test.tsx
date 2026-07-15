import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Login } from './Login';
import { MemoryRouter } from 'react-router-dom';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string) => defaultValue || key,
    i18n: { language: 'de' }
  }),
}));

describe('Login Component', () => {
  it('renders login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    
    expect(screen.getByLabelText('auth.email')).toBeInTheDocument();
    expect(screen.getByLabelText('auth.password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'auth.login_title' })).toBeInTheDocument();
  });
});
