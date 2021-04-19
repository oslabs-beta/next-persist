/**
 * ************************************
 *
 * @module next-persist
 * @author most-js
 * @description module that contains function to write state to cookies
 *
 * ************************************
 */

import jsCookie from 'js-cookie';

export default function setCookieStore(
  config: AllowListObject,
  state: LooseObject
): void {
  const key = Object.keys(config)[0];
  const allowList = Object.values(config)[0];
  // if allowList was not defined in cookieConfig, sets cookie containing entire state
  if (allowList.length === 0) {
    jsCookie.set(key, JSON.stringify(state));
  } else {
    // sets cookie containing only properties listed in allowList
    const allowedState = allowList.reduce((acc: LooseObject, cur: string) => {
      acc[cur] = state[cur];
      return acc;
    }, {});
    jsCookie.set(key, JSON.stringify(allowedState));
  }
}
