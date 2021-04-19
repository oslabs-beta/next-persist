/**
 * ************************************
 *
 * @module  next-persist
 * @author  most-js
 * @description function to get cookies containing state
 *
 * ************************************
 */

const Cookie = require('js-cookie');

function getCookieStore(key, state) {
  const stateFromCookie = Cookie.get(key);
  return stateFromCookie ? JSON.parse(stateFromCookie) : state;
}

module.exports = getCookieStore;
