import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import styles from '../../../styles/styles';

class NotificationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {props} = this.props;
    return (
      <View style={[styles.body,{backgroundColor:'#999'}]}>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}
export default connect(mapStateToProps, {})(NotificationContainer);
