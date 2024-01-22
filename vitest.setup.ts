import '@testing-library/jest-dom/vitest';

vi.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pt',
      changeLanguage: vi.fn(),
    },
  }),
}));

vi.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
      },
      beforePopState: vi.fn(() => null),
      prefetch: vi.fn(() => null),
    };
  },
}));

vi.mock('contentlayer/generated', () => {
  return {
    allBlogs: vi.fn(),
    Blog: vi.fn(),
  };
});
