import { getLocalStore } from '../index';
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
    delete state.baz;
    expect(localStorage.getItem(nextPersistConfig.key)).toEqual(JSON.stringify(state));
  });

  it('Does nothing if `window` is undefined', () => {
    const originalWindow = global.window;
    delete global.window;
    const result = setLocalStore(nextPersistConfig, state);
    expect(result).toBeUndefined();
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
    localStorage.setItem(nextPersistConfig.key, JSON.stringify(state));
    const expectedState = { foo: [1, 2, 3], bar: { a: true, b: false } };
    const stateFromLocalStorage = getLocalStore(nextPersistConfig.key, {});
    // Ensure 'baz' is not in the expected state
    delete stateFromLocalStorage.baz;
    expect(stateFromLocalStorage).toEqual(expectedState);
  });

  it('Returns the same state passed in if `window` is undefined', () => {
    const sameState = getLocalStore(nextPersistConfig.key, state);
    expect(sameState).toEqual(state);
  });
});
