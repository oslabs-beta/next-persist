import { getLocalStore } from '../getLocalStore';
import setLocalStore from '../setLocalStore';
import { NextPersistConfig, LooseObject } from '../types';

let state: LooseObject = {};
let nextPersistConfig: NextPersistConfig = { key: 'state', allowList: [] };

describe('setLocalStore tests', () => {
  beforeEach(() => {
    state.foo = [1, 2, 3];
    state.bar = { a: true, b: false };
    state.baz = 'Hello world!';

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
    const { baz, ...whitelistedState } = state; // Exclude `baz`
    expect(localStorage.getItem(nextPersistConfig.key)).toEqual(JSON.stringify(whitelistedState));
  });

  it('Handles absence of `window` gracefully', () => {
    const originalWindow = global.window;
    // @ts-ignore
    delete global.window;
    setLocalStore(nextPersistConfig, state);
    global.window = originalWindow;
  });
});

describe('getLocalStore tests', () => {
  beforeEach(() => {
    state.foo = [1, 2, 3];
    state.bar = { a: true, b: false };
    state.baz = 'Hello world!';

    nextPersistConfig = { key: 'state', allowList: [] };
  });

  afterEach(() => {
    state = {};
    nextPersistConfig = { key: '', allowList: [] };
  });

  it('Retrieves the entire persisted state from localStorage and returns it', () => {
    localStorage.setItem(nextPersistConfig.key, JSON.stringify(state));
    const stateFromLocalStorage = getLocalStore(nextPersistConfig.key, {});
    expect(stateFromLocalStorage).toEqual(state);
  });

  it('Retrieves only the properties of state whitelisted on allowList from localStorage', () => {
    nextPersistConfig.allowList = ['foo', 'bar'];
    const { baz, ...whitelistedState } = state; // Exclude `baz`
    localStorage.setItem(nextPersistConfig.key, JSON.stringify(whitelistedState));
    const stateFromLocalStorage = getLocalStore(nextPersistConfig.key, {});
    expect(stateFromLocalStorage).toEqual(whitelistedState);
  });

  it('Returns the same state passed in if `window` is undefined', () => {
    const originalWindow = global.window;
    // @ts-ignore
    delete global.window;
    const sameState = getLocalStore(nextPersistConfig.key, state);
    global.window = originalWindow;
    expect(sameState).toEqual(state);
  });
});
