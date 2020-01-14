import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, AsyncStorage} from 'react-native';

import {SCREEN_RETRO, SCREEN_INPUT_OTP, SCREEN_FILL_PROFILE} from '../../../api/screen';
import {SCREEN_PROFILE} from '../../../api/screen';
import {SCREEN_MAIN} from '../../../api/screen';
import {SCREEN_CREATE_ACCOUNT} from '../../../api/screen';
import {SCREEN_INFO} from '../../../api/screen';
import {SCREEN_CONFIRM_INFO} from '../../../api/screen';
import {dispatchScreen} from '../../../utils/utils';
class SplashContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
    this.checkLogin();
    console.disableYellowBox = true

  }

  async checkLogin() {
    var loginStatus = await AsyncStorage.getItem('login');
    if (loginStatus) {
      this.setState({isLogin: true});
    }
  }
  componentDidMount() {
    setTimeout(() => {
      if (this.state.isLogin) {
        dispatchScreen(this.props, SCREEN_MAIN,{});
      } else {
        dispatchScreen(this.props, SCREEN_RETRO,{});
      }
    }, 3000);
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
