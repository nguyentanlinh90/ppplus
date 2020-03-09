import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, AsyncStorage} from 'react-native';
import {dispatchScreen} from '../../../utils/utils';
import {ACCESS_TOKEN, IS_UPDATE_BASIC} from '../../../utils/constants';
import {
  SCREEN_INPUT_OTP,
  SCREEN_INFO,
  SCREEN_MAIN,
  SCREEN_RETRO,
  SCREEN_LOGIN,
  SCREEN_FILL_PROFILE,
} from '../../../api/screen';
var token = '';
class SplashContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
    this.checkLogin();
    console.disableYellowBox = true;
  }

  async checkLogin() {
    token = await AsyncStorage.getItem(ACCESS_TOKEN);
    var is_update_basic = await AsyncStorage.getItem(IS_UPDATE_BASIC);

    if (token && token != '' && is_update_basic == 1) {
      this.setState({isLogin: true});
    }
  }
  componentDidMount() {
    setTimeout(() => {
      if (this.state.isLogin) {
        dispatchScreen(this.props, SCREEN_MAIN, {token});
      } else {
        dispatchScreen(this.props, SCREEN_RETRO, {});
      }
    }, 1000);
  }
  render() {
    const {} = this.props;
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={require('../../../assets/images/bg.png')}
        />
        <Image
          style={{position: 'absolute'}}
          source={require('../../../assets/images/ic-splash.png')}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}

export default connect(mapStateToProps, {})(SplashContainer);
