import '@testing-library/jest-dom/extend-expect';
import { useTranslation } from 'next-i18next';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pt',
      changeLanguage: jest.fn(),
    },
  }),
}));

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

jest.mock(
  'contentlayer/generated',
  () => {
    return {
      allBlogs: jest.fn(),
      Blog: jest.fn(),
    };
  },
  { virtual: true },
);
