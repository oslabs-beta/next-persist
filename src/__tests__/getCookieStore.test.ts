import { getCookieStore } from '../getCookieStore';
import jsCookie from 'js-cookie';

jest.mock('js-cookie');

describe('getCookieStore', () => {
  const state = { test: 'testValue' };

  it('retrieves state from cookies', () => {
    (jsCookie.get as jest.Mock).mockReturnValueOnce(JSON.stringify(state));
    const result = getCookieStore('testKey', {});
    expect(result).toEqual(state);
  });

  it('returns default state if no cookie is found', () => {
    (jsCookie.get as jest.Mock).mockReturnValueOnce(null);
    const result = getCookieStore('testKey', state);
    expect(result).toEqual(state);
  });
});
