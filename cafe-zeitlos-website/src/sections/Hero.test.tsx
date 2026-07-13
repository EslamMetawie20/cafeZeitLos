import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Hero } from './Hero';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));


describe('Hero Component', () => {
  it('renders hero content', () => {
    render(<Hero />);
    
    expect(screen.getByText('hero.halal')).toBeInTheDocument();
    expect(screen.getByText('hero.cta_menu')).toBeInTheDocument();
    expect(screen.getByAltText('Lotus Pancakes Highlight')).toBeInTheDocument();
  });
});
