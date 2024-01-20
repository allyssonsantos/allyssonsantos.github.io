const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^contentlayer/generated': '<rootDir>/.contentlayer/generated',
    '^contentlayer/client': '<rootDir>/node_modules/contentlayer/dist/client',
    '^next-contentlayer/hooks':
      '<rootDir>/node_modules/next-contentlayer/dist/hooks',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(contentlayer|next-contentlayer|@contentlayer)/)',
  ],
};

module.exports = createJestConfig(customJestConfig);
