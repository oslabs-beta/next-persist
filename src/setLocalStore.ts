/**
 * ************************************
 *
 * @module next-persist
 * @author most-js
 * @description module that contains function to write state to localStorage
 *
 * ************************************
 */

interface LooseObject {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface AllowListObject {
  [key: string]: string[];
}

export function setLocalStore(
  config: AllowListObject,
  state: LooseObject
): void | { [key: string]: string } {
  const key = Object.keys(config)[0];
  const allowList = Object.values(config)[0];

  // if application is running client-side, localStorage is accessible
  if (typeof window !== 'undefined') {
    // if allowList was not defined in persistConfig, set all propertiesfrom state to localStorage
    if (allowList.length === 0) {
      localStorage.setItem(key, JSON.stringify(state));
    } else {
      // only sets properties listed in allowList to localStorage
      const allowedState = allowList.reduce((acc: LooseObject, cur: string) => {
        acc[cur] = state[cur];
        return acc;
      }, {});
      localStorage.setItem(key, JSON.stringify(allowedState));
    }
    // if application is not running-client side, localStorage is inaccessible
  } else {
    return { err: 'LocalStorage not found.' };
  }
}
