/**
 * ************************************
 *
 * @module  next-persist
 * @author  most-js
 * @description object that contains methods to set and get state from localStorage
 *
 * ************************************
 */

const nextPersist = {};

/*
sets state in localStorage
arguments:
  storageConfig(object) - object with reserved keywords 'key' (string) and 'allowList' (array).
  state(object) - object from application containing state
*/

nextPersist.setStorage = (storageConfig, state) => {
  const key = Object.keys(storageConfig)[0];
  const allowList = Object.values(storageConfig)[0];

  // if application is running client-side, localStorage is accessible
  if (typeof window !== 'undefined') {
    // if allowList was not defined in persistConfig, set all propertiesfrom state to localStorage
    if (allowList.length === 0) {
      localStorage.setItem(key, JSON.stringify(state));
    } else {
      // only sets properties listed in allowList to localStorage
      const allowedState = allowList.reduce((acc, cur) => {
        acc[cur] = state[cur];
        return acc;
      }, {});
      localStorage.setItem(key, JSON.stringify(allowedState));
    }
    // if application is not running-client side, localStorage is inaccessible
  } else {
    return { err: 'LocalStorage not found.' };
  }
};

/*
retrieves state from localStorage
arguments:
  key(string) - name state was saved under in localStorage
  state(object) - object from application containing state
*/

nextPersist.getStorage = (key, state) => {
  // if application is running client-side, localStorage is accessible
  if (typeof window !== 'undefined') {
    const clientState = localStorage.getItem(key);

    // if localStorage contains the key user queries,
    // parse the data and return an updated state object
    if (clientState) {
      const parsedClientState = JSON.parse(clientState);
      return {
        ...state,
        ...parsedClientState,
      };
    }
  }
  // if localStorage doesn't contain the key user queries or application isn't running client-side,
  // return original state that was passed in
  return state;
};

module.exports = nextPersist;
