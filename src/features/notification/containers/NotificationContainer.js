import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import styles from '../../../styles/styles';

import Footer from '../../../components/footer/Footer';

class NotificationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.body}>
        <View style={styles.container}></View>
        <Footer page={'notification'} navigation={this.props.navigation} />
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
