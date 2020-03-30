import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  AsyncStorage,
} from 'react-native';
import LoginForm from '../components/LoginForm';
import {doLogin, doSendOTP} from '../actions/index';
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
import {
  IS_UPDATE_BASIC,
  REGEX,
  KEY_TIME_LOGIN_FAIL,
} from '../../../utils/constants';
import {convertPhone, showAlert, setStoreData} from '../../../utils/utils';
import * as types from '../../../api/types';
let countLoginFail = 0;
let TIME_OUT_DEFAULT = 300;
export class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      password: '',
      isLoading: false,
      isConnecting: false,
      allowLogin: false,
      timeRemainAfterLoginFail: 0,
    };
    this._handleLogin = this._handleLogin.bind(this);
    this._onChangeText = this._onChangeText.bind(this);
    this._checkLoginFail()
  }

  async _checkLoginFail() {
    let timeFail = await AsyncStorage.getItem(KEY_TIME_LOGIN_FAIL);

    if (timeFail != 0) {
      //login fail before
      let timeCurr = new Date().valueOf();
      let timeRemain = ((timeCurr - timeFail) / 1000).toFixed(0); //convert to seconds
      // > 5 minutes => allow login
      if (timeRemain > TIME_OUT_DEFAULT) {
        this.setState({allowLogin: true});
      } else {
        // <= 5 minutes => don't allow login
        this.setState({
          allowLogin: false,
          timeRemainAfterLoginFail: TIME_OUT_DEFAULT - timeRemain,
        });
        this._startInterval();
      }
    } else {
      this.setState({allowLogin: true});
    }
  }

  _startInterval = () => {
    this.interval = setInterval(() => {
      if (this.state.timeRemainAfterLoginFail !== 0) {
        this.setState(prevState => ({
          timeRemainAfterLoginFail: prevState.timeRemainAfterLoginFail - 1,
        }));
      } else {
        this.setState({allowLogin: true, timeRemainAfterLoginFail: 0});
        clearInterval(this.interval);
      }
    }, 1000);
  };

  componentDidMount() {
    this._checkLoginFail();

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
    clearInterval(this.interval);
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

  _showAlertForgotPass = () => {
    const {phone} = this.state;
    const {doSendOTP} = this.props;
    if (phone == '') {
      showAlert('Vui lòng nhập số điện thoại để gửi mã xác thực.');
      return;
    } else {
      if (!REGEX.test(phone)) {
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
      if (!REGEX.test(phone)) {
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
    this.setState({isLoading: false});
    if (nextProps.msg_code == types.LOGIN_FAIL) {
      
      nextProps.changeMsgCode('');
      countLoginFail = countLoginFail + 1;
      if (countLoginFail == 5) {
        showAlert('Bạn đã nhập sai 5 lần, bạn sẽ bị khóa đăng nhập 5 phút.');
        countLoginFail = 0;
        let currentTimeStamp = new Date().valueOf(); //milliSeconds
        setStoreData(KEY_TIME_LOGIN_FAIL, currentTimeStamp);
        this.setState({
          allowLogin: false,
          timeRemainAfterLoginFail: TIME_OUT_DEFAULT,
        });
        this._startInterval();
      }else{
        showAlert(nextProps.message);
      }
    } else if (nextProps.msg_code == types.LOGIN_SUCCESS) {
      nextProps.changeMsgCode('');
      setStoreData(IS_UPDATE_BASIC, nextProps.data.is_updated_basic);
      setStoreData(KEY_TIME_LOGIN_FAIL, 0);
      if (nextProps.data.is_updated_basic == 1) {
        // 1: User has updated basic info, 0: not yet
        var token = 'Bearer ' + nextProps.message;
        dispatchScreen(this.props, SCREEN_MAIN, [token, nextProps.data]);
      } else {
        dispatchScreen(this.props, SCREEN_INFO, nextProps.data);
      }
    } else if (nextProps.msg_code == types.SEND_OTP_SUCCESS) {
      nextProps.changeMsgCode('');
      // dispatchScreen(this.props, SCREEN_INPUT_OTP, [
      //   this.state.phone,
      //   nextProps.data.waiting_time_otp,
      //   false, //check isRegister (here is forgot pass)
      // ]);
      this.props.navigation.navigate(SCREEN_INPUT_OTP, [
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
              allowLogin={this.state.allowLogin}
              timeRemainAfterLoginFail={this.state.timeRemainAfterLoginFail}
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
