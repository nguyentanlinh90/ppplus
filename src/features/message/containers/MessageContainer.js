import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import styles from '../../../styles/styles';

class MessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {props} = this.props;
    return (
      <View style={[styles.body,{backgroundColor:'#456'}]}>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}
export default connect(mapStateToProps, {})(MessageContainer);
