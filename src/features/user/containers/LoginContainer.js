import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import LoginForm from '../components/LoginForm';
import {doLogin} from '../actions/index';
import rootStyles from '../../../styles/styles';
import styles from '../styles/styles';
import {convertPhone} from '../../../api/helpers';
import {changeMsgCode} from '../../home/actions/index';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import {FORGOT_PASSWORD} from '../../../utils/constants';
import {SCREEN_INPUT_OTP} from '../../../api/screen';
import {SCREEN_CREATE_ACCOUNT} from '../../../api/screen';
import {SCREEN_MAIN} from '../../../api/screen';
import {dispatchScreen, setStoreData} from '../../../utils/utils';
import {KEY_CHECK_LOGIN, VALUE_ONE} from '../../../utils/constants';
import {showAlert} from '../../../utils/utils';
import * as types from '../../../api/types';

export class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '0387665209',
      password: '12Chiec@',
      isLoading: false,
      isConnecting: false,
    };
    this._handleLogin = this._handleLogin.bind(this);
    this._onChangeText = this._onChangeText.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
  }
  _handleConnectivityChange = () => {
    NetInfo.isConnected.fetch().done(isConnected => {
      if (isConnected == true) {
        this.setState({isConnecting: true});
      } else {
        showAlert('Vui lòng kiểm tra kết nối mạng.');
        this.setState({isConnecting: false});
      }
    });
  };

  _onChangeText = (text, type) => {
    if (type == 'phone') {
      const strPhone = convertPhone(text);
      this.setState({phone: strPhone});
    } else if (type == 'password') {
      this.setState({password: text});
    }
  };

  _handleForgetPassword = () => {
    const {phone} = this.state;

    if (phone == '') {
      showAlert('Vui lòng nh số điện thoại đã đăng ký để lấy lại mật khẩu.');
      return;
    }

    if (phone != '') {
      var regEx = /^(03|09|08|07|05)[0-9]{8}$/;
      if (!regEx.test(phone)) {
        showAlert('Số điện thoại không đúng định dạng.');
      } else {
        dispatchScreen(this.props, SCREEN_INPUT_OTP, {
          typeScreen: SCREEN_INPUT_OTP,
        });
      }
    }
  };

  _handleNotYetAccount = () => {
    this.props.navigation.navigate(SCREEN_CREATE_ACCOUNT);
  };

  _handleLogin = () => {
    const {doLogin} = this.props;
    const {phone, password} = this.state;

    if (phone != '' && password != '') {
      var regEx = /^(03|09|08|07|05)[0-9]{8}$/;
      if (!regEx.test(phone)) {
        showAlert('Số điện thoại không đúng định dạng.');
      } else {
        if (this.state.isConnecting) {
          this.setState({isLoading: true});
          doLogin(phone, password);
        } else {
          showAlert('Vui lòng kiểm tra kết nối mạng.');
        }
      }
    } else {
      showAlert('Vui lòng nhập đầy đủ số điện thoại và mật khẩu.');
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log('linhnt nextProps', nextProps);
    if (nextProps.msg_code == types.LOGIN_FAIL) {
      this.setState({isLoading: false});
      showAlert(nextProps.message);
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.LOGIN_SUCCESS) {
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
      setStoreData(KEY_CHECK_LOGIN, VALUE_ONE);
      dispatchScreen(this.props, SCREEN_MAIN, {});
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{flex: 1}}>
          <StatusBar backgroundColor="#000" barStyle="light-content" />
          <View style={{height: '100%'}}>
            <View style={[{height: '55%'}]}>
              <View style={styles.boxLogin}>
                <KeyboardAvoidingView behavior="padding" enabled>
                  <View
                    style={{
                      paddingTop: '35%',
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}>
                    <LoginForm
                      handleForgetPassword={this._handleForgetPassword}
                      handleLogin={this._handleLogin}
                      handleNotYetAccount={this._handleNotYetAccount}
                      navigation={this.props.navigation}
                      onChangeText={this._onChangeText}
                      phone={this.state.phone}
                      password={this.state.password}
                    />
                  </View>
                </KeyboardAvoidingView>
              </View>
            </View>
          </View>
          <Spinner
            visible={this.state.isLoading}
            color={'white'}
            size={'large'}
            textStyle={{color: '#fff'}}
          />
        </View>
      </TouchableWithoutFeedback>
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

export default connect(mapStateToProps, {
  doLogin,
  changeMsgCode,
})(LoginContainer);
