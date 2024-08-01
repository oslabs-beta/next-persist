import { getLocalStore } from '../getLocalStore';

describe('getLocalStore', () => {
  it('returns state from localStorage', () => {
    const state = { default: 'defaultState' };
    localStorage.setItem('testKey', JSON.stringify({ test: 'testValue' }));
    expect(getLocalStore('testKey', state)).toEqual({ default: 'defaultState', test: 'testValue' });
  });

  it('returns default state if localStorage is empty', () => {
    const state = { default: 'defaultState' };
    localStorage.removeItem('testKey');
    expect(getLocalStore('testKey', state)).toEqual(state);
  });
});
