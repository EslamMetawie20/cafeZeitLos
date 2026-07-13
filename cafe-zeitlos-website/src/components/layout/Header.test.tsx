import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from './Header';

// Mock react-i18next
const changeLanguageMock = vi.fn();
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'de',
      changeLanguage: changeLanguageMock,
    }
  }),
}));


describe('Header Component', () => {
  it('toggles mobile menu', () => {
    render(<Header />);
    const toggleBtn = screen.getByLabelText('Toggle Menu');
    
    // Initial: menu is closed (nav links inside mobile menu are absent)
    // Actually the mobile menu links have the same text, but we can check if there's multiple or just check state
    fireEvent.click(toggleBtn);
    
    // Now it should be open, let's verify aria-expanded
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
    
    // Click again to close
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('switches language', () => {
    render(<Header />);
    
    // The language button in desktop nav
    const langBtns = screen.getAllByLabelText('nav.language');
    fireEvent.click(langBtns[0]); // Desktop lang btn
    
    expect(changeLanguageMock).toHaveBeenCalledWith('en');
  });
});
