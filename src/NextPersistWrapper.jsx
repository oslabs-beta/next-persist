import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeStorage } from "next-persist";

const mapStateToProps = (state) => ({
  state: state,
});

class NextPersistWrapper extends Component {
  constructor(props) {
    super(props)
  };

  render() {

    const allowedKeys = this.props.wrapperConfig.allowedKeys; 
    const allowedReducers = this.props.wrapperConfig.allowedReducers; 

    allowedReducers.forEach((allowedReducer, index) => {
      const nextPersistConfig = {
        key: allowedKeys[index],
      }
      writeStorage(nextPersistConfig, this.props.state[allowedReducer]); 
    })

    return this.props.children;
  }
}

const PersistWrapper = connect(mapStateToProps)(NextPersistWrapper);

export default PersistWrapper;
