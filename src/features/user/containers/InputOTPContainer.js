import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Alert} from 'react-native';
import InputOTPForm from '../components/InputOTPForm';
import {changeMsgCode} from '../../../api/helpers';
import {dispatchScreen} from '../../../utils/utils';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import {
  SCREEN_LOGIN,
  SCREEN_UPDATE_PASS,
  SCREEN_RETRO,
} from '../../../api/screen';
import {showAlert} from '../../../utils/utils';
import {doProcessOTP, doSendOTP} from '../actions/index';
import * as types from '../../../api/types';

let timeResend = 0;
let countInputWrong = 0;
export class InputOTPContainer extends Component {
  constructor(props) {
    super(props);

    timeResend = this.props.navigation.state.params[1];
    this.state = {
      phone: this.props.navigation.state.params[0],
      isRegister: this.props.navigation.state.params[2],
      timeResend: timeResend,
      otpCode: '',
      isLoading: false,
      isConnecting: false,
    };
    this._handleProcessOTP = this._handleProcessOTP.bind(this);
    this._handleResendOTP = this._handleResendOTP.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  _startInterval = () => {
    this.interval = setInterval(() => {
      if (this.state.timeResend !== 0) {
        this.setState(prevState => ({
          timeResend: prevState.timeResend - 1,
        }));
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
      let cleanNumber = text.replace(/[^0-9]/g, '');// just number
      this.setState({otpCode: cleanNumber});
    }
  };

  _handleResendOTP = () => {
    const {doSendOTP} = this.props;
    doSendOTP(this.state.phone);
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == types.PROCESS_OTP_FAIL) {
      this.setState({isLoading: false});
      showAlert(nextProps.message);
      nextProps.changeMsgCode('');
      countInputWrong = countInputWrong + 1;
      if (countInputWrong == 5) {
        Alert.alert(
          'Thông báo',
          nextProps.message,
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
    } else if (nextProps.msg_code == types.PROCESS_OTP_SUCCESS) {
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
      if (this.state.isRegister) {
        dispatchScreen(this.props, SCREEN_LOGIN, {});
      } else {
        dispatchScreen(this.props, SCREEN_UPDATE_PASS, [
          this.state.phone,
          nextProps.data.access_token,
        ]);
      }
    } else if (nextProps.msg_code == types.SEND_OTP_SUCCESS) {
      showAlert('Mã OTP đã được gửi đến số điện thoại ' + this.state.phone);
      nextProps.changeMsgCode('');
      this.setState({timeResend: timeResend});
      this._startInterval();
    } else if (nextProps.msg_code == types.SEND_OTP_FAIL) {
      showAlert(nextProps.message);
      nextProps.changeMsgCode('');
      this.setState({timeResend: timeResend});
      this._startInterval();
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
        <Spinner
          visible={this.state.isLoading}
          color={'white'}
          size={'large'}
          textStyle={{color: '#fff'}}
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

export default connect(mapStateToProps, {
  doProcessOTP,
  doSendOTP,
  changeMsgCode,
})(InputOTPContainer);
