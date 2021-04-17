/**
 * ************************************
 *
 * @module next-persist
 * @author most-js
 * @description module that contains function to get state from localStorage
 *
 * ************************************
 */

export default function getLocalStore(key, state) {
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
}
