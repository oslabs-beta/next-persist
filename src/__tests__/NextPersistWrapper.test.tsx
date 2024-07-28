import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import NextPersistWrapper from '../NextPersistWrapper';

const mockStore = configureStore([]);
const initialState = { test: 'testValue' };

describe('NextPersistWrapper', () => {
  let store: MockStoreEnhanced<unknown, {}>;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders children', () => {
    let getByText: ((id: string | RegExp) => HTMLElement) | undefined;
    const { getByText: getByTextResult } = render(
      <Provider store={store}>
        <NextPersistWrapper wrapperConfig={{ method: 'localStorage', allowList: {} }}>
          <div>Test</div>
        </NextPersistWrapper>
      </Provider>
    );
    getByText = getByTextResult;
    expect(getByText('Test')).toBeInTheDocument();
  });

  // Add more tests for localStorage and cookies logic
});
