const nextPersist = {};

// writes to local storage
nextPersist.writeStorage = (state) => {
  if (typeof Window !== 'undefined') {
    localStorage.setItem('state', JSON.stringify(state));
  } else {
    return state;
  }
};

// retrieves from local storage
nextPersist.getStorage = (persistConfig, state) => {
  if (typeof Window !== 'undefined') {
    const clientState = localStorage.getItem('state');

    if (clientState) {
      const { allowList } = persistConfig;
      const parsedClientState = JSON.parse(clientState);

      const newState = allowList.reduce((acc, cur) => {
        acc[cur] = parsedClientState[cur];
        return acc;
      }, {});

      return {
        ...state,
        ...newState,
      };
    }
  }

  return state;
};

module.exports = nextPersist;
