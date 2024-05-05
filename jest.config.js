module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-redux/|redux-persist/|@react-native-async-storage/async-storage/))',
  ],
  setupFiles: ['<rootDir>/src/jest/setup.js'],
};
