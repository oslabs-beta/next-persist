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
import setCookieStore from './setCookieStore';
import setLocalStore from './setLocalStore';

interface AllowListObject {
  [key: string]: string[];
}

interface StorageConfigObject {
  method: string;
  allowList: AllowListObject;
}

interface WrapperProps {
  wrapperConfig: StorageConfigObject;
  children: React.ReactNode;
}

export default NextPersistWrapper = (props: WrapperProps) => {
  const state = useSelector((state) => state);

  useEffect(() => {
    // determines method to persist state
    let method;
    if (props.wrapperConfig.method === 'localStorage') {
      method = setLocalStore;
    } else if (props.wrapperConfig.method === 'cookies') {
      method = setCookieStore;
    }

    const { allowList } = props.wrapperConfig;
    const allowListConfig: AllowListObject = {};

    // if no allowList - save all state to their corresponding keys
    if (!allowList) {
      const key = Object.keys(state)[0];
      allowListConfig[key] = [];
      method(allowListConfig, state[key]);
    }

    // if allowList - pass subconfigs of allowed reducers into storage method
    else {
      const allowedReducers = Object.keys(allowList);
      allowedReducers.forEach((allowedReducer) => {
        allowListConfig[allowedReducer] = allowList[allowedReducer];
        method(allowListConfig, state[allowedReducer]);
      });
    }
  }, [state]);

  return props.children;
};
