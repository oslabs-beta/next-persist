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

import { Component } from 'react';
import { connect } from 'react-redux';
import { setCookie } from './next-persist-cookies';
import { setStorage } from './next-persist';

const mapStateToProps = (state) => ({
  state,
});

class NextPersistWrapper extends Component {
  render() {
    // determines method to persist state
    let method;
    if (this.props.wrapperConfig.method === 'localStorage') {
      method = setStorage;
    } else if (this.props.wrapperConfig.method === 'cookies') {
      method = setCookie;
    }

    const { allowList } = this.props.wrapperConfig;
    const nextPersistConfig = {};

    // if no allowlist provided save all state to their corresponding keys
    if (!allowList) {
      const key = Object.keys(this.props.state)[0];
      nextPersistConfig[key] = [];
      method(nextPersistConfig, this.props.state[key]);
    }
    // if allowlist exists pass subconfigs of allowed reducers into storage method
    else {
      const allowedReducers = Object.keys(allowList);
      allowedReducers.forEach((allowedReducer) => {
        nextPersistConfig[allowedReducer] = allowList[allowedReducer];
        method(nextPersistConfig, this.props.state[allowedReducer]);
      });
    }
    return this.props.children;
  }
}

// connects wrapper to redux store
const PersistWrapper = connect(mapStateToProps)(NextPersistWrapper);

export default PersistWrapper;
