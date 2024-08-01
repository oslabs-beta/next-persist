import { getCookieProps } from '../getCookieProps';
import { NextPageContext } from 'next';

describe('getCookieProps', () => {
  it('returns an empty string when ctx.req is undefined', () => {
    const ctx = {} as NextPageContext;
    expect(getCookieProps(ctx)).toBe('');
  });

  it('parses cookies from ctx.req.headers.cookie', () => {
    const ctx = {
      req: {
        headers: {
          cookie: 'testCookie=testValue',
        },
      },
    } as NextPageContext;
    expect(getCookieProps(ctx)).toEqual({ testCookie: 'testValue' });
  });
});
