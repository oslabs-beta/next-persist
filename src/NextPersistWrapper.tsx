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

const NextPersistWrapper = (props: WrapperProps): React.ReactNode => {
  const state: LooseObject = useSelector((state) => state);

  useEffect(() => {
    // determines method to persist state
    let method: Method;
    if (props.wrapperConfig.method === 'localStorage') {
      method = setLocalStore;
    } else if (props.wrapperConfig.method === 'cookies') {
      method = setCookieStore;
    } else
      method = () => {
        return { err: 'No method detected' };
      };

    const { allowList } = props.wrapperConfig;
    const mockStorageConfig: AllowListObject = {};

    // if no allowList - save all state to their corresponding keys
    if (!allowList) {
      const key = Object.keys(state)[0];
      mockStorageConfig[key] = [];
      method(mockStorageConfig, state[key]);
    }

    // if allowList - pass subconfigs of allowed reducers into storage method
    else {
      const allowedReducers = Object.keys(allowList);
      allowedReducers.forEach((allowedReducer) => {
        mockStorageConfig[allowedReducer] = allowList[allowedReducer];
        method(mockStorageConfig, state[allowedReducer]);
      });
    }
  }, [state]);

  return props.children;
};

export default NextPersistWrapper;
