import { LooseObject } from './types';

export function getLocalStore(key: string, defaultState: LooseObject): LooseObject {
  if (typeof window !== 'undefined') {
    const storedState = localStorage.getItem(key);
    if (storedState) {
      return { ...defaultState, ...JSON.parse(storedState) };
    }
  }
  return defaultState;
}
