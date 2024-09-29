module.exports = {
  testMatch: ['**/src/tests/**/*.test.ts'],
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};
