import { NextPersistConfig, LooseObject } from './types';

const setLocalStore = (config: NextPersistConfig, state: LooseObject): void => {
  const { key, allowList } = config;
  if (typeof window !== 'undefined') {
    let stateToStore: LooseObject = {};
    if (allowList.length > 0) {
      stateToStore = allowList.reduce((acc: LooseObject, prop: string) => {
        if (prop in state) {
          acc[prop] = state[prop];
        }
        return acc;
      }, {});
    } else {
      stateToStore = state;
    }
    localStorage.setItem(key, JSON.stringify(stateToStore));
  }
};

export default setLocalStore;
