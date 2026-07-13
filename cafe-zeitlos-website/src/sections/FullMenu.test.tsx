import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FullMenu } from './FullMenu';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock framer-motion to avoid animation delays in tests

describe('FullMenu Component', () => {
  it('renders menu title', () => {
    render(<FullMenu />);
    expect(screen.getByText('menu.title')).toBeInTheDocument();
  });

  it('filters menu by search', () => {
    render(<FullMenu />);
    const searchInput = screen.getByPlaceholderText('menu.search_placeholder');
    
    // Initial state has many items
    expect(screen.queryAllByText(/€/)).not.toHaveLength(0);
    
    // Search for specific item "Pastrami Burger"
    fireEvent.change(searchInput, { target: { value: 'Pastrami Burger' } });
    
    expect(screen.getByText('Pastrami Burger')).toBeInTheDocument();
    // Assuming there is only 1 pastrami burger
    expect(screen.queryByText('Chicken Burger')).not.toBeInTheDocument();
  });

  it('shows empty state when no results match', () => {
    render(<FullMenu />);
    const searchInput = screen.getByPlaceholderText('menu.search_placeholder');
    
    fireEvent.change(searchInput, { target: { value: 'XYZ123NONEXISTENT' } });
    
    expect(screen.getByText('menu.no_results')).toBeInTheDocument();
  });

  it('filters by category (e.g. Vegetarian)', () => {
    render(<FullMenu />);
    
    const vegButton = screen.getByText('menu.filter_vegetarian');
    fireEvent.click(vegButton);
    
    // Check if a known vegetarian item is present, e.g. Avocado Stulle
    expect(screen.getByText('Avocado Stulle')).toBeInTheDocument();
    // Check if a meat item is absent, e.g. Beef Bacon Stulle
    expect(screen.queryByText('Beef Bacon Stulle')).not.toBeInTheDocument();
  });

  it('opens and closes dialog on item click', () => {
    render(<FullMenu />);
    
    // Click on an item to open dialog
    const item = screen.getByText('Avocado Stulle');
    fireEvent.click(item);
    
    // Dialog should be open (since the title is rendered twice, once in list and once in dialog, we can check for dialog specifically)
    const dialogs = screen.queryAllByRole('dialog');
    expect(dialogs.length).toBeGreaterThan(0);
    
    // Close dialog
    const closeBtn = screen.getByRole('button', { name: 'Close dialog' });
    fireEvent.click(closeBtn);
    
    // Dialog should be closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
