import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Alert} from 'react-native';
import InputOTPForm from '../components/InputOTPForm';
import {changeMsgCode} from '../../../api/helpers';
import {dispatchScreen} from '../../../utils/utils';
import SpinnerComponent from '../../../components/Spinner';
import NetInfo from '@react-native-community/netinfo';
import {
  SCREEN_LOGIN,
  SCREEN_UPDATE_PASS,
  SCREEN_RETRO,
} from '../../../api/screen';
import {showAlert} from '../../../utils/utils';
import {doProcessOTP, doSendOTP} from '../actions/index';
import * as types from '../../../api/types';

let countInputWrong = 0;
export class InputOTPContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: this.props.navigation.state.params[0],
      timeResend: this.props.navigation.state.params[1],
      isRegister: this.props.navigation.state.params[2],
      otpCode: '',
      isLoading: false,
      isConnecting: false,
    };
  }

  _startInterval = () => {
    console.log('linhnt interval', this.state.timeResend);
    this.interval = setInterval(() => {
      if (this.state.timeResend !== 0) {
        this.setState(prevState => ({
          timeResend: prevState.timeResend - 1,
        }));
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );

    this._startInterval();
  }
  componentDidUpdate() {
    if (this.state.timeResend === 0) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
    clearInterval(this.interval);
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

  onChangeText = (text, type) => {
    if (type == 'otpCode') {
      let cleanNumber = text.replace(/[^0-9]/g, ''); // just number
      this.setState({otpCode: cleanNumber});
    }
  };

  _handleResendOTP = () => {
    const {doSendOTP} = this.props;
    this.setState({isLoading: true});
    doSendOTP(
      this.state.phone,
      this.state.isRegister ? '' : types.TYPE_USER_FORGOT_PASSWORD,
      types.RESEND_OTP,
    );
  };
  _handleProcessOTP = () => {
    const {doProcessOTP} = this.props;
    const {otpCode} = this.state;

    if (otpCode != '' && otpCode.length > 5) {
      if (this.state.isConnecting) {
        this.setState({isLoading: true});
        doProcessOTP(this.state.phone, otpCode);
      } else {
        showAlert('Vui lòng kiểm tra kết nối mạng.');
      }
    }
  };

  _hideLoading = nextProps => {
    nextProps.changeMsgCode('');
    this.setState({isLoading: false});
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == types.PROCESS_OTP_FAIL) {
      showAlert(nextProps.message);
      countInputWrong = countInputWrong + 1;
      if (countInputWrong == 5) {
        countInputWrong = 0;
        Alert.alert(
          'Thông báo',
          'Nhập sai quá 5 lần. Vui lòng thao tác lại từ đầu.',
          [
            {
              text: 'Đồng Ý',
              onPress: () => {
                dispatchScreen(this.props, SCREEN_RETRO, {});
              },
            },
          ],
          {
            cancelable: false,
          },
        );
      } else {
        showAlert(nextProps.message);
      }
      this._hideLoading(nextProps);
    } else if (nextProps.msg_code == types.PROCESS_OTP_SUCCESS) {
      if (this.state.isRegister) {
        dispatchScreen(this.props, SCREEN_LOGIN, {});
      } else {
        dispatchScreen(this.props, SCREEN_UPDATE_PASS, [
          this.state.phone,
          nextProps.data.access_token,
        ]);
      }
      this._hideLoading(nextProps);
    } else if (nextProps.msg_code == types.RESEND_OTP_SUCCESS) {
      showAlert('Mã OTP đã được gửi đến số điện thoại ' + this.state.phone);
      this.setState({timeResend: nextProps.data.waiting_time_otp}, function() {
        this._startInterval();
      });
      this._hideLoading(nextProps);
    } else if (nextProps.msg_code == types.RESEND_OTP_FAIL) {
      showAlert(nextProps.message);
      this._hideLoading(nextProps);
    }
  }

  render() {
    return (
      <View>
        <View style={{marginTop: 200}}>
          <InputOTPForm
            handleProcessOTP={this._handleProcessOTP}
            handleResendOTP={this._handleResendOTP}
            navigation={this.props.navigation}
            onChangeText={this.onChangeText}
            otpCode={this.state.otpCode}
            timeResend={this.state.timeResend}
          />
        </View>
        <SpinnerComponent visible={this.state.isLoading} />
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
    doProcessOTP,
    doSendOTP,
    changeMsgCode,
  },
)(InputOTPContainer);
