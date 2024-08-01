import setLocalStore from '../setLocalStore';

describe('setLocalStore', () => {
  const state = { test: 'testValue' };
  const config: { key: string; allowList: string[] } = { key: 'testKey', allowList: [] };

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('sets the entire state to localStorage', () => {
    setLocalStore(config, state);
    expect(localStorage.getItem(config.key)).toEqual(JSON.stringify(state));
  });

  it('sets only the allowed properties of state to localStorage', () => {
    const configWithAllowList: { key: string; allowList: string[] } = {
      key: 'testKey',
      allowList: ['test'],
    };
    setLocalStore(configWithAllowList, state);
    expect(localStorage.getItem(configWithAllowList.key)).toEqual(
      JSON.stringify({ test: 'testValue' })
    );
  });
});
