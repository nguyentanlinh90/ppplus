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
import {doLogin, doCheckPhone, doSendOTP} from '../actions/index';
import {changeMsgCode} from '../../../api/helpers';
import SpinnerComponent from '../../../components/Spinner';
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
  KEY_PHONE_NOT_EXITS,
} from '../../../utils/constants';
import {
  convertPhone,
  showAlert,
  showAlertWithPress,
  setStoreData,
} from '../../../utils/utils';
import * as types from '../../../api/types';

let countLoginFail = 0;
let TIME_OUT_DEFAULT = 300;
export class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '0906063100',
      password: 'Qwerty',
      isLoading: false,
      isConnecting: false,
      allowLogin: false,
      timeRemainAfterLoginFail: 0,
      isPhoneCorrect: false,
      phoneInputIncorrectList: [],
    };
    this._checkLoginFail();
    this._getPhoneInputCorrectList();
  }

  _getPhoneInputCorrectList = () => {
    AsyncStorage.getItem(KEY_PHONE_NOT_EXITS)
      .then(req => {
        if (JSON.parse(req) != null) {
          this.setState({phoneInputIncorrectList: JSON.parse(req)}, function() {
            this._checkEnableButtonForgotPass();
          });
        }
      })
      .catch(error => console.log('linhnt get error!', error));
  };

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

  _setPhoneCorrect = isCorrect => {
    this.setState({isPhoneCorrect: isCorrect});
  };

  _checkEnableButtonForgotPass = () => {
    if (REGEX.test(this.state.phone)) {
      let allowClickForgetPass = true;
      let numberWrongInputPhone = 0;
      const {phoneInputIncorrectList} = this.state;
      if (phoneInputIncorrectList.length > 0) {
        for (let i = 0; i < phoneInputIncorrectList.length; i++) {
          if (this.state.phone == phoneInputIncorrectList[i]) {
            numberWrongInputPhone++;
          }
        }
        allowClickForgetPass = numberWrongInputPhone < 3;
        this._setPhoneCorrect(allowClickForgetPass);
      } else {
        this._setPhoneCorrect(true);
      }
    } else {
      this._setPhoneCorrect(false);
    }
  };

  _onChangeText = (text, type) => {
    if (type == 'phone') {
      const strPhone = convertPhone(text);
      this.setState({phone: strPhone}, function() {
        this._checkEnableButtonForgotPass();
      });
    } else if (type == 'password') {
      this.setState({password: text});
    }
  };

  _showLoading = () => {
    this.setState({isLoading: true});
  };
  _checkPhoneNumber = () => {
    const {phone} = this.state;
    const {doCheckPhone} = this.props;
    this._showLoading();
    doCheckPhone(phone);
  };

  _showAlertForgotPass = () => {
    const {phone} = this.state;
    const {doSendOTP} = this.props;

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
            this._showLoading();
            doSendOTP(phone, types.TYPE_USER_FORGOT_PASSWORD, '');
          },
        },
      ],
      {cancelable: true},
    );
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
          this._showLoading();
          doLogin(phone, password);
        } else {
          showAlert('Vui lòng kiểm tra kết nối mạng.');
        }
      }
    } else {
      showAlert('Vui lòng nhập đầy đủ số điện thoại và mật khẩu.');
    }
  };

  _changeMsgCode = nextProps => {
    nextProps.changeMsgCode('');
    this.setState({isLoading: false});
  };

  _hideLoading = () => {
    this.setState({isLoading: false});
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == types.LOGIN_FAIL) {
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
        this._changeMsgCode(nextProps);
      } else {
        showAlertWithPress(nextProps.message, this._hideLoading);
        nextProps.changeMsgCode('');
      }
    } else if (nextProps.msg_code == types.LOGIN_SUCCESS) {
      setStoreData(IS_UPDATE_BASIC, nextProps.data.is_updated_basic);
      setStoreData(KEY_TIME_LOGIN_FAIL, 0);
      if (nextProps.data.is_updated_basic == 1) {
        // 1: User has updated basic info, 0: not yet
        var token = 'Bearer ' + nextProps.message;
        dispatchScreen(this.props, SCREEN_MAIN, {
          token: token,
          user: nextProps.data,
        });
      } else {
        dispatchScreen(this.props, SCREEN_INFO, nextProps.data);
      }
      this._changeMsgCode(nextProps);
    } else if (nextProps.msg_code == types.SEND_OTP_SUCCESS) {
      this.props.navigation.navigate(SCREEN_INPUT_OTP, [
        this.state.phone,
        nextProps.data.waiting_time_otp,
        false, //check isRegister (here is forgot pass)
      ]);
      this._changeMsgCode(nextProps);
    } else if (nextProps.msg_code == types.SEND_OTP_FAIL) {
      showAlert(nextProps.message);
    } else if (nextProps.msg_code == types.CHECK_PHONE_SUCCESS) {
      this._showAlertForgotPass();
      this._changeMsgCode(nextProps);
    } else if (nextProps.msg_code == types.CHECK_PHONE_FAIL) {
      //store phone input inCorrect to check click forget pass
      let phoneInputIncorrectList = this.state.phoneInputIncorrectList;
      phoneInputIncorrectList.push(this.state.phone);
      AsyncStorage.setItem(
        KEY_PHONE_NOT_EXITS,
        JSON.stringify(phoneInputIncorrectList),
      )
        .then(json => {
          this._getPhoneInputCorrectList();
        })
        .catch(error => console.log('linhnt set error!'));

      showAlertWithPress(
        'Số điện thoại không đúng. Vui lòng thử lại.',
        this._hideLoading,
      );
      nextProps.changeMsgCode('');
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
          <KeyboardAvoidingView behavior="padding" enabled>
            <LoginForm
              showAlertForgotPass={this._checkPhoneNumber}
              handleLogin={this._handleLogin}
              handleNotYetAccount={this._handleNotYetAccount}
              onChangeText={this._onChangeText}
              phone={this.state.phone}
              isPhoneCorrect={this.state.isPhoneCorrect}
              password={this.state.password}
              allowLogin={this.state.allowLogin}
              timeRemainAfterLoginFail={this.state.timeRemainAfterLoginFail}
            />
          </KeyboardAvoidingView>
          <SpinnerComponent visible={this.state.isLoading} />
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

export default connect(
  mapStateToProps,
  {
    doLogin,
    doCheckPhone,
    doSendOTP,
    changeMsgCode,
  },
)(LoginContainer);
