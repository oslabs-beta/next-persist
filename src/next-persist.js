const nextPersist = {};

// this method writes to local storage
// Args to pass in:
// nextPersistConfig: type: object, defined in _app
// state: type: object, defined in store
nextPersist.writeStorage = (nextPersistConfig, state) => {
  const { key, allowList } = nextPersistConfig;

  // if window is defined, there is access local storage
  if (typeof window !== 'undefined') {
    // if allowList was not defined in persistConfig, set all items from state to localStorage
    if (!allowList) {
      localStorage.setItem(key, JSON.stringify(state));
    } else {
      // for every element in allowList:
      // add to new state object and set to local storage
      const allowedState = allowList.reduce((acc, cur) => {
        acc[cur] = state[cur];
        return acc;
      }, {});
      localStorage.setItem(key, JSON.stringify(allowedState));
    }
  } else {
    // if window is undefined, return error object
    return { err: 'LocalStorage not found.' };
  }
};

// This method retrieves state from local storage
// Arguements to pass in:
// key: type: string, defined in reducer file
// state: type: object, defined in reducer file
nextPersist.getStorage = (key, state) => {
  // if window is defined there is access local storage,
  // otherwise return same state object that was passed in
  if (typeof window !== 'undefined') {
    const clientState = localStorage.getItem(key);
    // if clientState object exists on localStorage, then return this clientState object,
    // otherwise return the state object that was passed in to getStorage method
    if (clientState) {
      const parsedClientState = JSON.parse(clientState);
      return {
        ...state,
        ...parsedClientState,
      };
    }
  }
  return state;
};

module.exports = nextPersist;
