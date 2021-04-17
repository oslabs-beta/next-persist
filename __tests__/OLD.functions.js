/**
 * @jest-environment jsdom
 */

const nextPersist = require('../src/next-persist');
const { writeStorage, getStorage } = require('../src/next-persist');

let state = {};
let nextPersistConfig = {};

describe('writeStorage tests', () => {

  beforeEach(() => {
    state.foo = [1, 2, 3];
    state.bar = {a : true, b : false};
    state.baz = 'Hello world!'

    nextPersistConfig.key = 'state';
    nextPersistConfig.allowList = null;
  })

  afterEach(() => {
    state = {};
    nextPersistConfig = {};
  })

  it('Saves the entire state to localStorage', () => {
    writeStorage(nextPersistConfig, state);
    expect(localStorage[nextPersistConfig.key]).toEqual(JSON.stringify(state));
  });

  it('Saves only the properties of state whitelisted on allowList to localStorage', () => {
    nextPersistConfig.allowList = ['foo', 'bar'];
    writeStorage(nextPersistConfig, state);
    delete state.baz;
    expect(localStorage[nextPersistConfig.key]).toEqual(JSON.stringify(state));
  });

  // change jest-environment on line 2 from jsdom to node -> probably some jest configuration that automates this
  xit('Returns an error if `window` is undefined', () => {
    const error = writeStorage(nextPersistConfig, state);
    expect(error.err).toBe('LocalStorage not found.');
  })  

});

describe('getStorage tests', () => {

  beforeEach(() => {
    state.foo = [1, 2, 3];
    state.bar = {a : true, b : false};
    state.baz = 'Hello world!'

    nextPersistConfig.key = 'state';
    nextPersistConfig.allowList = null;
  })

  afterEach(() => {
    state = {};
    nextPersistConfig = {};
  })

  it('Retrieves the entire persisted state from localStorage and returns it', () => {
    localStorage.setItem(nextPersistConfig.key, JSON.stringify(state));
    const stateFromLocalStorage = getStorage(nextPersistConfig, state);
    expect(stateFromLocalStorage).toEqual(state);
  });

  it('Retrieves only the properties of state whitelisted on allowList from localStorage', () => {
    nextPersistConfig.allowList = ['foo', 'bar'];
    localStorage.setItem(nextPersistConfig.key, JSON.stringify(state));
    delete state.baz;
    const stateFromLocalStorage = getStorage(nextPersistConfig, state);
    expect(stateFromLocalStorage).toEqual(state);
  })

  // change jest-environment on line 2 from jsdom to node -> probably some jest configuration that automates this
  xit('Returns the same state passed in if `window` is undefined', () => {
    const sameState = getStorage(nextPersistConfig, state);
    expect(sameState).toEqual(state);
  });

});