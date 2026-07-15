import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AdminDashboard } from './AdminDashboard';
import { AuthProvider } from '../../contexts/AuthContext';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string) => defaultValue || key,
    i18n: { language: 'de' }
  }),
}));

describe('Admin Dashboard', () => {
  it('renders dashboard with main sections', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AdminDashboard />
        </AuthProvider>
      </MemoryRouter>
    );
    
    // Check if the dashboard title is rendered
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    
    // Check if KPI sections are rendered
    expect(screen.getByText('Heutige Performance')).toBeInTheDocument();
    
    // Check if the active tables are rendered
    expect(screen.getByText(/Aktive Bestellungen/i)).toBeInTheDocument();
    expect(screen.getByText(/Heutige Reservierungen/i)).toBeInTheDocument();
  });
});
