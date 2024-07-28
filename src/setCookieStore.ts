import jsCookie from 'js-cookie';
import { NextPersistConfig, LooseObject } from './types';

const setCookieStore = (config: NextPersistConfig, state: LooseObject): void => {
  const { key, allowList } = config;
  if (typeof document !== 'undefined') {
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
    jsCookie.set(key, JSON.stringify(stateToStore), { expires: 365 });
  }
};

export default setCookieStore;
