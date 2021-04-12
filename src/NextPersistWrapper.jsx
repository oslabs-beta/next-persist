import { Component } from 'react';
import { connect } from 'react-redux';
import { writeStorage } from './next-persist';

// mapStateToProps allows for access to state
const mapStateToProps = (state) => ({
  state,
});

// This componenet should live in _app between Provider and children components
class NextPersistWrapper extends Component {
  render() {
    // if combinedReducers value is true:
    // loop through each reducer and write their respective returned objects to state,
    if (this.props.wrapperConfig.combinedReducers) {
      // allowedKeys is an array that's defined by developer and
      // will be the keys that are saved to localStorage
      const { allowedKeys } = this.props.wrapperConfig;
      // allowedReducers is an array defined by developer that are the values saved on localStorage
      // with their corresponding key in allowedKeys array
      const { allowedReducers } = this.props.wrapperConfig;
      // writeStorage method must be called for each reducer in allowedReducers array
      allowedReducers.forEach((allowedReducer, index) => {
        const nextPersistConfig = {
          key: allowedKeys[index],
        };
        writeStorage(nextPersistConfig, this.props.state[allowedReducer]);
      });
    } else {
      // if combinedReducer value is false:
      // writeStorage method only needs to be called once
      const nextPersistConfig = {
        key: this.props.wrapperConfig.key,
        allowList: this.props.wrapperConfig.allowList,
      };
      writeStorage(nextPersistConfig, this.props.state);
    }
    return this.props.children;
  }
}

const PersistWrapper = connect(mapStateToProps)(NextPersistWrapper);

export default PersistWrapper;
