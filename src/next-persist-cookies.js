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
  const { key, allowList } = cookieConfig;
  // if allowList was not defined in cookieConfig, sets cookie containing entire state
  if (!allowList) {
    Cookie.set(key, state);
  } else {
    // sets cookie containing only properties listed in allowList
    const allowedState = allowList.reduce((acc, cur) => {
      acc[cur] = state[cur];
      return acc;
    }, {});
    Cookie.set(key, allowedState);
  }
};

/*
retrieves cookie containing state
arguments:
  req (object) - request object from the context object from Next.js data-fetching methods
*/

// if application is running server-side, parse and return cookie from request object
// if application is running client-side, parse and return cooking from document object
nextPersistCookie.getCookie = (req) => cookie.parse(req ? req.ctx.req.headers.cookie || '' : document.cookie);

module.exports = nextPersistCookie;
