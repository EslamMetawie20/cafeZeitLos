import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Register } from './Register';
import { MemoryRouter } from 'react-router-dom';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string) => defaultValue || key,
    i18n: { language: 'de' }
  }),
}));

describe('Register Component', () => {
  it('renders register form', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    
    expect(screen.getByLabelText('auth.first_name')).toBeInTheDocument();
    expect(screen.getByLabelText('auth.last_name')).toBeInTheDocument();
    expect(screen.getByLabelText('auth.email')).toBeInTheDocument();
    expect(screen.getByLabelText('auth.password')).toBeInTheDocument();
    expect(screen.getByLabelText('auth.confirm_password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'auth.register_title' })).toBeInTheDocument();
  });
});
