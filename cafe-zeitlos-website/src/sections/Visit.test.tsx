import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Visit } from './Visit';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Visit Component', () => {
  it('renders reservation form initially', () => {
    render(<Visit />);
    expect(screen.getByText('reservation.title')).toBeInTheDocument();
    expect(screen.getByLabelText(/reservation.date/)).toBeInTheDocument();
  });

  it('generates summary on submit', () => {
    render(<Visit />);
    
    // Fill form
    fireEvent.change(screen.getByLabelText(/reservation.date/), { target: { value: '2026-08-01' } });
    fireEvent.change(screen.getByLabelText(/reservation.time/), { target: { value: '10:00' } });
    fireEvent.change(screen.getByLabelText(/reservation.name/), { target: { value: 'Max Mustermann' } });
    
    // Submit form → phone dialog appears
    fireEvent.click(screen.getByText('reservation.submit'));

    // Fill in phone number and confirm
    fireEvent.change(screen.getByPlaceholderText(/\+49/), { target: { value: '+49 151 12345678' } });
    fireEvent.click(screen.getByText('Bestätigen'));

    // Form should be gone, summary should be visible
    expect(screen.getByText(/Max Mustermann/)).toBeInTheDocument();
    expect(screen.getByText(/2026-08-01/)).toBeInTheDocument();
    expect(screen.getByText(/reservation.copy/)).toBeInTheDocument();
  });

  it('displays correct opening hours', () => {
    render(<Visit />);
    expect(screen.getByText('visit.hours_text')).toBeInTheDocument();
  });
});
