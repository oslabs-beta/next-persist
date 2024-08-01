import setCookieStore from '../setCookieStore';
import jsCookie from 'js-cookie';

jest.mock('js-cookie');

describe('setCookieStore', () => {
  const state = { test: 'testValue' };
  const config: { key: string; allowList: string[] } = { key: 'testKey', allowList: [] };

  it('sets the entire state to cookies', () => {
    setCookieStore(config, state);
    expect(jsCookie.set).toHaveBeenCalledWith(config.key, JSON.stringify(state), { expires: 365 });
  });

  it('sets only the allowed properties of state to cookies', () => {
    const configWithAllowList: { key: string; allowList: string[] } = {
      key: 'testKey',
      allowList: ['test'],
    };
    setCookieStore(configWithAllowList, state);
    expect(jsCookie.set).toHaveBeenCalledWith(
      configWithAllowList.key,
      JSON.stringify({ test: 'testValue' }),
      { expires: 365 }
    );
  });
});
