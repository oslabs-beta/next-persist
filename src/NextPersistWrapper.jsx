/**
 * ************************************
 *
 * @module  next-persist
 * @author  most-js
 * @description a component that persists state to localStorage or cookies.
 *              this component should wrap Next.js components
 *              and be wrapped by Redux's Provider component
 *
 * ************************************
 */

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setCookieStore } from './setCookieStore';
import { setLocalStore } from './setLocalStore';

export default NextPersistWrapper = (props) => {
  const state = useSelector((state) => state);

  useEffect(() => {
    // determines method to persist state
    let method;
    if (props.wrapperConfig.method === 'localStorage') {
      return setLocalStore;
    } else if (props.wrapperConfig.method === 'cookies') {
      return setCookieStore;
    }

    const { allowList } = props.wrapperConfig;
    const nextPersistConfig = {};

    // if no allowList - save all state to their corresponding keys
    if (!allowList) {
      const key = Object.keys(state)[0];
      nextPersistConfig[key] = [];
      method(nextPersistConfig, state[key]);
    }

    // if allowList - pass subconfigs of allowed reducers into storage method
    else {
      const allowedReducers = Object.keys(allowList);
      allowedReducers.forEach((allowedReducer) => {
        nextPersistConfig[allowedReducer] = allowList[allowedReducer];
        method(nextPersistConfig, state[allowedReducer]);
      });
    }
  }, [state]);

  return props.children;
};
