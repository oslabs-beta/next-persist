/**
 * ************************************
 *
 * @module  next-persist
 * @author  most-js
 * @description object that contains methods to set and get cookies containing state
 *
 * ************************************
 */

const cookie = require('cookie');
const Cookie = require('js-cookie');

const nextPersistCookie = {};

/*
sets a cookie containing state
arguments:
  cookieConfig(object) - object with reserved keywords 'key' (string) and 'allowList' (array).
  state(object) - object from application containing state
*/

nextPersistCookie.setCookie = (cookieConfig, state) => {
  const key = Object.keys(cookieConfig)[0];
  const allowList = Object.values(cookieConfig)[0];
  // if allowList was not defined in cookieConfig, sets cookie containing entire state
  if (allowList.length === 0) {
    Cookie.set(key, JSON.stringify(state));
  } else {
    // sets cookie containing only properties listed in allowList
    const allowedState = allowList.reduce((acc, cur) => {
      acc[cur] = state[cur];
      return acc;
    }, {});
    Cookie.set(key, JSON.stringify(allowedState));
  }
};

/*
retrieves cookie containing state
arguments:
  if application is running server-side:
  req (object) - request property from the context object from Next.js data-fetching methods

  if application is running client-side:
  req (boolean) - should be 'false'
  state (object) - object from application containing state
  cookieName (string) - the name of the cookie specified in setCooking config
*/

nextPersistCookie.getCookie = (req, cookieName, state) => {
  // if application is running client-side, parse and return cookie from browser
  if (!req) {
    const stateFromCookie = Cookie.get(cookieName);
    return stateFromCookie ? JSON.parse(stateFromCookie) : state;
  } // if application is running server-side, parse and return cooking from request body
  else return cookie.parse(req.ctx.req.headers.cookie || '');
};

module.exports = nextPersistCookie;
