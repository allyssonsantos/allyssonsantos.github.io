module.exports = {
  testPathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['./tests/utils/setup.js'],
  testEnvironment: 'jsdom',
  clearMocks: true,
  moduleNameMapper: {
    '\\.css$': '<rootDir>/tests/utils/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico)$':
      '<rootDir>/tests/utils/fileMock.js',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@services(.*)$': '<rootDir>/src/services$1',
    '^@contexts(.*)$': '<rootDir>/src/contexts$1',
    '^@static(.*)$': '<rootDir>/static$1',
    '^tests(.*)$': '<rootDir>/tests$1',
  },
  displayName: 'allysson.me',
};
