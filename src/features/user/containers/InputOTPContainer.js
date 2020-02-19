import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import InputOTPForm from '../components/InputOTPForm';
import {doInputOTP} from '../actions/index';
import styles from '../styles/styles';
import rootStyles from '../../../styles/styles';
import {changeMsgCode} from '../../home/actions/index';
import {dispatchScreen} from '../../../utils/utils';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import {FORGOT_PASSWORD} from '../../../utils/constants';
import {SCREEN_LOGIN} from '../../../api/screen';
import {showAlert} from '../../../utils/utils';
import {setStoreData} from '../../../utils/utils';
import {doProcessOTP, doSendOTP} from '../actions/index';
import * as types from '../../../api/types';

var timeResend = 0;
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

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );

    this.interval = setInterval(() => {
      if (this.state.timeResend == 0) {
      } else {
        this.setState(prevState => ({
          timeResend: prevState.timeResend - 1,
        }));
      }
    }, 1000);
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
      this.setState({otpCode: text});
    }
  };

  _handleResendOTP = () => {
    const {doSendOTP} = this.props;
    doSendOTP(this.state.phone);
  };
  _handleProcessOTP = () => {
    if (this.state.isRegister) {
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
    } else {
      //for case forgot password
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == types.PROCESS_OTP_FAIL) {
      this.setState({isLoading: false});
      showAlert(nextProps.message);
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.PROCESS_OTP_SUCCESS) {
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
      dispatchScreen(this.props, SCREEN_LOGIN, {});
    } else if (nextProps.msg_code == types.SEND_OTP_SUCCESS) {
      showAlert('Mã OTP đã được gửi đến số điện thoại ' + this.state.phone);
      nextProps.changeMsgCode('');
      this.setState({timeResend: timeResend});
    } else if (nextProps.msg_code == types.RESEND_OTP_FAIL) {
      showAlert(nextProps.message);
      nextProps.changeMsgCode('');
      this.setState({timeResend: timeResend});
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
