import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {SafeAreaView, View, Image, Text} from 'react-native';
import styles from '../../../styles/styles';

class NotificationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {props} = this.props;
    return (
      <SafeAreaView>
        <Text
          style={{
            fontSize: 24,
            color: '#1c1c1c',
            fontWeight: 'bold',
            padding: 16,
          }}>
          Thông báo
        </Text>
        <View style={{height: 5, backgroundColor: '#e3e3e3'}}></View>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <Image
            resizeMode="contain"
            style={{height: 160}}
            source={require('../../../assets/images/ic-no-notification.png')}
          />
          <Text
            style={{
              fontSize: 16,
              color: '#1c1c1c',
              marginTop: 20,
            }}>
            Bạn không có thông báo mới
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}
export default connect(mapStateToProps, {})(NotificationContainer);
