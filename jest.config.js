/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest',
  },
};
