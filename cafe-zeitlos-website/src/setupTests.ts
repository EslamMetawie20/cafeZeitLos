import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock IntersectionObserver
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// A robust framer-motion mock
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  
  const createMotionComponent = (Tag: any) => {
    return ({ children, ...props }: any) => {
      // Remove framer-motion specific props to prevent React warnings
      const {
        initial,
        animate,
        exit,
        transition,
        whileInView,
        whileHover,
        whileTap,
        viewport,
        layout,
        layoutId,
        variants,
        ...validProps
      } = props;
      
      return React.createElement(Tag, validProps, children);
    };
  };

  return {
    ...actual as any,
    motion: {
      div: createMotionComponent('div'),
      button: createMotionComponent('button'),
      span: createMotionComponent('span'),
      a: createMotionComponent('a'),
      img: createMotionComponent('img'),
      // Add other tags if needed
    },
    AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children),
  };
});
