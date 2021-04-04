const { writeStorage, getStorage } = require('../src/next-persist');

class MockLocalStorage {
  constructor() {
    this.storage = {}
  };

  getItem(key) {
    return JSON.parse(this.storage[key]) || null;
  }

  setItem(key, value) {
    console.log('key: ', key);
    console.log('value: ', value);
    this.storage[key] = value;
  }

  clear() {
    this.storage = {}
  }

};

const newState = {
  foo: [1, 2, 3],
  bar: {a : true, b : false},
  baz: 'Hello world',
};

xdescribe('getStorage tests', () => {

  // case one: if window is not undefined:

    // we should retreive state from local storage

    // we should update state with the state retreived from local storage

  // case two: if window is undefined:
    
    // we should return the same state object we pass in 

})

describe('writeStorage tests', () => {

  // test one: if window is not undefined, we should write to local storage
  it('writes a state object to local storage', () => {
    writeStorage(newState);
    expect(localStorage['state']).toBe(JSON.stringify(newState));
  });

  // test two: if window is undefined, we should return the same state object we pass in

})