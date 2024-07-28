import React from 'react';
import { render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NextPersistWrapper from '../NextPersistWrapper';

const mockStore = configureStore([]);
const initialState = { test: 'testValue' };

describe('NextPersistWrapper', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders children', () => {
    let getByText;
    act(() => {
      ({ getByText } = render(
        <Provider store={store}>
          <NextPersistWrapper wrapperConfig={{ method: 'localStorage', allowList: {} }}>
            <div>Test</div>
          </NextPersistWrapper>
        </Provider>
      ));
    });
    expect(getByText('Test')).toBeInTheDocument();
  });

  // Add more tests for localStorage and cookies logic
});
