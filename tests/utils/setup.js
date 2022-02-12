import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('firebase/firestore');
jest.mock('firebase/auth');
jest.mock('firebase/app');
jest.mock('gatsby');
jest.mock('@services/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
  db: jest.fn(),
}));

jest.mock('gatsby-plugin-transition-link', () => {
  return ({ children }) => <div data-testid="transition-link">{children}</div>;
});
