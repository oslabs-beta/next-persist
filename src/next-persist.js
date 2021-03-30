const nextPersist = {};

// writes to storage
nextPersist.writeStorage = (state) => {
  localStorage.setItem('state', JSON.stringify(state));
};

// retrieves from local storage
nextPersist.getStorage = (persistConfig, state) => {
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
  };
};

module.exports = nextPersist;
