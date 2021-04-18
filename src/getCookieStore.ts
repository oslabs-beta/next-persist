/**
 * ************************************
 *
 * @module next-persist
 * @author most-js
 * @description module that contains function to get state from cookies
 *
 * ************************************
 */

import jsCookie from 'js-cookie';

interface LooseObject {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default function getCookieStore(
  key: string,
  state: LooseObject
): LooseObject {
  const stateFromCookie = jsCookie.get(key);
  return stateFromCookie ? JSON.parse(stateFromCookie) : state;
}
