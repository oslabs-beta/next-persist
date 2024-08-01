import '@testing-library/jest-dom';
import './setupGlobals';

const mockStorage: Storage = {
  length: 0,
  clear: jest.fn(),
  getItem: jest.fn(),
  key: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
};

(global as unknown as { localStorage: Storage }).localStorage = mockStorage;

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));
