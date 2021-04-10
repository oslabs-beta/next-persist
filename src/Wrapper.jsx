import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeStorage } from "next-persist";

const mapStateToProps = (state) => ({
  state: state.markets,
});

const nextPersistConfig = {
  key: "state",
};

class TestWrapper extends Component {
  constructor(props) {
    super(props)
  };
  
  render() {
    writeStorage(nextPersistConfig, this.props.state);
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const Wrapper = connect(mapStateToProps)(TestWrapper);

export default Wrapper;
