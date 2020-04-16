import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, AsyncStorage} from 'react-native';
import {dispatchScreen} from '../../../utils/utils';
import {getUserInfo} from '../../../features/user/actions';
import {changeMsgCode} from '../../../api/helpers';
import * as types from '../../../api/types';
import {
  ACCESS_TOKEN,
  IS_UPDATE_BASIC,
  KEY_PHONE_NOT_EXITS,
} from '../../../utils/constants';
import {showAlert} from '../../../utils/utils';

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
    this._resetPhoneInputInCorrectList();
    console.disableYellowBox = true;
  }

  async checkLogin() {
    token = await AsyncStorage.getItem(ACCESS_TOKEN);
    var is_update_basic = await AsyncStorage.getItem(IS_UPDATE_BASIC);
    if (token && token != '' && is_update_basic == 1) {
      this.setState({isLogin: true});
    }

    if (this.state.isLogin) {
      this._getUserInfo();
    } else {
      // dispatchScreen(this.props, SCREEN_RETRO, {});
      this.props.navigation.navigate(SCREEN_RETRO);
    }
  }

  _resetPhoneInputInCorrectList = () => {
    AsyncStorage.setItem(KEY_PHONE_NOT_EXITS, JSON.stringify([])).catch(error =>
      console.log('linhnt set error!'),
    );
  };

  _getUserInfo = () => {
    const {getUserInfo} = this.props;
    getUserInfo('basic_detail', token);
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == types.GET_USER_BASIC_INFO_SUCCESS) {
      nextProps.changeMsgCode('');
      dispatchScreen(this.props, SCREEN_MAIN, {token: token, user: nextProps.data});
    } else if (nextProps.msg_code == types.GET_USER_BASIC_INFO_FAIL) {
      nextProps.changeMsgCode('');
      dispatchScreen(this.props, SCREEN_LOGIN, {});
    }
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
    msg_code: state.user.msg_code,
    message: state.user.message,
    data: state.user.data,
  };
}

export default connect(
  mapStateToProps,
  {
    getUserInfo,
    changeMsgCode,
  },
)(SplashContainer);
