module.exports = {
  moduleNameMapper: {
    '\\.(css|sass)$': 'identity-obj-proxy'
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom'
};
