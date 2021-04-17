function setLocalStore (storageConfig, state) {
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

module.exports = setLocalStore;