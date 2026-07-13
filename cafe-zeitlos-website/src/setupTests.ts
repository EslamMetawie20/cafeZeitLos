import React from 'react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';


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

// Mock localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {};
  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key: string) {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// A robust framer-motion mock
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  
  const createMotionComponent = (Tag: any) => {
    return ({ children, ...props }: any) => {
      // Remove framer-motion specific props to prevent React warnings
      const {
        initial: _initial,
        animate: _animate,
        exit: _exit,
        transition: _transition,
        whileInView: _whileInView,
        whileHover: _whileHover,
        whileTap: _whileTap,
        viewport: _viewport,
        layout: _layout,
        layoutId: _layoutId,
        variants: _variants,
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
