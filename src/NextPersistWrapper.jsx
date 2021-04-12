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

    // if redux combines reducers, each reducer's state gets saved to local storage
    // under a unique key specified in wrapperConfig
    if (this.props.wrapperConfig.combinedReducers) {
      const { allowedKeys } = this.props.wrapperConfig;
      const { allowedReducers } = this.props.wrapperConfig;

      allowedReducers.forEach((allowedReducer, index) => {
        const nextPersistConfig = {
          key: allowedKeys[index],
        };
        method(nextPersistConfig, this.props.state[allowedReducer]);
      });

      // otherwise, the single reducer's state gets saved to local storage
      // according to allowList configuration
    } else {
      const nextPersistConfig = {
        key: this.props.wrapperConfig.key,
        allowList: this.props.wrapperConfig.allowList,
      };
      method(nextPersistConfig, this.props.state);
    }
    return this.props.children;
  }
}

// connects wrapper to redux store
const PersistWrapper = connect(mapStateToProps)(NextPersistWrapper);

export default PersistWrapper;
