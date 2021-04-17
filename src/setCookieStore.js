/**
 * ************************************
 *
 * @module next-persist
 * @author most-js
 * @description module that contains function to write state to cookies
 *
 * ************************************
 */

const Cookie = require('js-cookie');

export default function setCookieStore(cookieConfig, state) {
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
}
