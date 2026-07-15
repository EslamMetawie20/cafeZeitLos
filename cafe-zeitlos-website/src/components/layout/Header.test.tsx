import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Header } from './Header';
import { MemoryRouter } from 'react-router-dom';

// Mock react-i18next
const changeLanguageMock = vi.fn();
let currentLanguage = 'de';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      get language() { return currentLanguage; },
      changeLanguage: changeLanguageMock,
    }
  }),
}));

describe('Header Component', () => {
  beforeEach(() => {
    currentLanguage = 'de';
    changeLanguageMock.mockClear();
  });

  it('toggles mobile menu', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const toggleBtn = screen.getByLabelText('Toggle Menu');
    
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
    
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('shows English target when current is German', () => {
    render(<MemoryRouter><Header /></MemoryRouter>);
    const langBtns = screen.getAllByLabelText('nav.switch_language');
    expect(langBtns[0]).toHaveTextContent('🇬🇧EN');
  });

  it('switches to English when target is clicked', () => {
    render(<MemoryRouter><Header /></MemoryRouter>);
    const langBtns = screen.getAllByLabelText('nav.switch_language');
    fireEvent.click(langBtns[0]);
    expect(changeLanguageMock).toHaveBeenCalledWith('en');
  });

  it('shows German target when current is English', () => {
    currentLanguage = 'en';
    render(<MemoryRouter><Header /></MemoryRouter>);
    const langBtns = screen.getAllByLabelText('nav.switch_language');
    expect(langBtns[0]).toHaveTextContent('🇩🇪DE');
  });

  it('switches to German when target is clicked', () => {
    currentLanguage = 'en';
    render(<MemoryRouter><Header /></MemoryRouter>);
    const langBtns = screen.getAllByLabelText('nav.switch_language');
    fireEvent.click(langBtns[0]);
    expect(changeLanguageMock).toHaveBeenCalledWith('de');
  });
});
