import { getLocalStore } from '../getLocalStore';
import setLocalStore from '../setLocalStore';
import { NextPersistConfig, LooseObject } from '../types';

let state: LooseObject = {};
let nextPersistConfig: NextPersistConfig = { key: 'state', allowList: [] };

describe('setLocalStore tests', () => {
  beforeEach(() => {
    state.foo = [1, 2, 3];
    state.bar = { a: true, b: false };

    nextPersistConfig = { key: 'state', allowList: [] };
  });

  afterEach(() => {
    state = {};
    nextPersistConfig = { key: '', allowList: [] };
  });

  it('Saves the entire state to localStorage', () => {
    setLocalStore(nextPersistConfig, state);
    expect(localStorage.getItem(nextPersistConfig.key)).toEqual(JSON.stringify(state));
  });

  it('Saves only the properties of state whitelisted on allowList to localStorage', () => {
    nextPersistConfig.allowList = ['foo', 'bar'];
    setLocalStore(nextPersistConfig, state);
    const { ...whitelistedState } = state;
    expect(localStorage.getItem(nextPersistConfig.key)).toEqual(JSON.stringify(whitelistedState));
  });

  it('Handles absence of `window` gracefully', () => {
    const originalWindow = global.window;
    // @ts-expect-error: Deleting global.window to simulate an environment where window is undefined
    delete global.window;
    setLocalStore(nextPersistConfig, state);
    global.window = originalWindow;
  });
});

describe('getLocalStore tests', () => {
  it('Retrieves only the properties of state whitelisted on allowList from localStorage', () => {
    const state: {
      foo: number[];
      bar: {
        a: boolean;
        b: boolean;
      };
    } = {
      foo: [1, 2, 3],
      bar: { a: true, b: false },
    };
    localStorage.setItem('test-key', JSON.stringify(state));
    const nextPersistConfig = { key: 'test-key', allowList: { foo: [], bar: ['a', 'b'] } };
    const stateFromLocalStorage = getLocalStore(nextPersistConfig.key, nextPersistConfig.allowList);

    expect(stateFromLocalStorage).toEqual(state);
  });

  it('Returns the same state passed in if `window` is undefined', () => {
    const state = { foo: 'bar' };

    const originalWindow = global.window;
    // @ts-expect-error: Deleting global.window to simulate an environment where window is undefined
    delete global.window;

    const stateFromLocalStorage = getLocalStore('test-key', state);

    expect(stateFromLocalStorage).toEqual(state);

    global.window = originalWindow;
  });
});
