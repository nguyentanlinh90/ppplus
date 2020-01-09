import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, SafeAreaView, Image} from 'react-native';
import styles from '../../../styles/styles';
import {Text} from 'native-base';

class MessageContainer extends Component {
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
          Tin nhắn
        </Text>
        <View style={{height: 5, backgroundColor: '#e3e3e3'}}></View>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <Image source={require('../../../assets/images/ic-no-message.png')} />
          <Text
            style={{
              fontSize: 16,
              color: '#1c1c1c',
              marginTop: 20,
            }}>
            Bạn không có tin nhắn
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
export default connect(mapStateToProps, {})(MessageContainer);
