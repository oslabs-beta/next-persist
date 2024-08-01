import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import setCookieStore from './setCookieStore';
import setLocalStore from './setLocalStore';
import { NextPersistConfig, LooseObject } from './types';

interface StorageConfigObject {
  method: 'localStorage' | 'cookies';
  allowList: { [key: string]: string[] };
}

interface WrapperProps {
  wrapperConfig: StorageConfigObject;
  children: React.ReactNode;
}

const NextPersistWrapper: React.FC<WrapperProps> = ({ wrapperConfig, children }) => {
  const state = useSelector((state: LooseObject) => state);

  useEffect(() => {
    const { method, allowList } = wrapperConfig;
    const persistMethod = method === 'localStorage' ? setLocalStore : setCookieStore;

    if (Object.keys(allowList).length === 0) {
      Object.keys(state).forEach((key) => {
        const config: NextPersistConfig = { key, allowList: [] };
        persistMethod(config, state[key] as LooseObject);
      });
    } else {
      Object.keys(allowList).forEach((key) => {
        const config: NextPersistConfig = { key, allowList: allowList[key] || [] };
        persistMethod(config, state[key] as LooseObject);
      });
    }
  }, [state, wrapperConfig]);

  return <>{children}</>;
};

export default NextPersistWrapper;
