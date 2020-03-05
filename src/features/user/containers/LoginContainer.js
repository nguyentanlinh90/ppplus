import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import LoginForm from '../components/LoginForm';
import {doLogin, doSendOTP} from '../actions/index';
import rootStyles from '../../../styles/styles';
import styles from '../styles/styles';
import {changeMsgCode} from '../../../api/helpers';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import {
  SCREEN_INPUT_OTP,
  SCREEN_CREATE_ACCOUNT,
  SCREEN_MAIN,
  SCREEN_INFO,
} from '../../../api/screen';
import {dispatchScreen} from '../../../utils/utils';
import {ACCESS_TOKEN, IS_UPDATE_BASIC} from '../../../utils/constants';
import {convertPhone, showAlert, setStoreData} from '../../../utils/utils';
import * as types from '../../../api/types';
var regEx = /^(03|09|08|07|05)[0-9]{8}$/;
export class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      password: '',
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

  _showAlertForgotPass = props => {
    const {phone} = this.state;
    const {doSendOTP} = this.props;
    if (phone == '') {
      showAlert('Vui lòng nhập số điện thoại đã đăng ký để lấy lại mật khẩu.');
      return;
    } else {
      if (!regEx.test(phone)) {
        showAlert('Số điện thoại không đúng định dạng.');
      } else {
        Alert.alert(
          'Thông báo',
          'Một mã xác nhận sẽ được gửi đến số điện thoại ' +
            phone +
            '. Vui lòng chọn đồng ý để tiếp tục.',
          [
            {text: 'Huỷ', onPress: () => {}},
            {
              text: 'Đồng Ý',
              onPress: () => {
                doSendOTP(phone, types.TYPE_USER_FORGOT_PASSWORD);
              },
            },
          ],
          {cancelable: true},
        );
      }
    }
  };

  _handleNotYetAccount = () => {
    dispatchScreen(this.props, SCREEN_CREATE_ACCOUNT, {});
  };

  _handleLogin = () => {
    const {doLogin} = this.props;
    const {phone, password} = this.state;

    if (phone != '' && password != '') {
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
    if (nextProps.msg_code == types.LOGIN_FAIL) {
      this.setState({isLoading: false});
      showAlert(nextProps.message);
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.LOGIN_SUCCESS) {
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
      setStoreData(IS_UPDATE_BASIC, nextProps.data.is_updated_basic);

      if (nextProps.data.is_updated_basic == 1) {
        // 1: User has updated basic info, 0: not yet
        var token = 'Bearer ' + nextProps.message;
        dispatchScreen(this.props, SCREEN_MAIN, {token});
      } else {
        dispatchScreen(this.props, SCREEN_INFO, nextProps.data);
      }
    } else if (nextProps.msg_code == types.SEND_OTP_SUCCESS) {
      nextProps.changeMsgCode('');
      dispatchScreen(this.props, SCREEN_INPUT_OTP, [
        this.state.phone,
        nextProps.data.waiting_time_otp,
        false, //check isRegister (here is forgot pass)
      ]);
    } else if (nextProps.msg_code == types.SEND_OTP_FAIL) {
      showAlert(nextProps.message);
      nextProps.changeMsgCode('');
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
          <KeyboardAvoidingView behavior="padding" enabled>
            <LoginForm
              showAlertForgotPass={this._showAlertForgotPass}
              handleLogin={this._handleLogin}
              handleNotYetAccount={this._handleNotYetAccount}
              onChangeText={this._onChangeText}
              phone={this.state.phone}
              password={this.state.password}
            />
          </KeyboardAvoidingView>
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
  doSendOTP,
  changeMsgCode,
})(LoginContainer);
