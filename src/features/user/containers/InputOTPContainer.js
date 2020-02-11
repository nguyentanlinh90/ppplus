import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  StatusBar,
  Image,
  AsyncStorage,
  Alert,
} from 'react-native';
import InputOTPForm from '../components/InputOTPForm';
import {doInputOTP} from '../actions/index';
import styles from '../styles/styles';
import rootStyles from '../../../styles/styles';
import {changeMsgCode} from '../../home/actions/index';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import {FORGOT_PASSWORD} from '../../../utils/constants';
import {SCREEN_INFO, SCREEN_MAIN} from '../../../api/screen';
import {showAlert} from '../../../utils/utils';

export class InputOTPContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otpCode: '',
      timerSendAgain: 5,
      isLoading: false,
      isConnecting: false,
    };
    this.handleInputOTP = this.handleInputOTP.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );

    this.interval = setInterval(
      () =>
        this.setState(prevState => ({
          timerSendAgain: prevState.timerSendAgain - 1,
        })),
      1000,
    );
  }
  componentDidUpdate() {
    if (this.state.timerSendAgain === 0) {
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

  handleInputOTP = () => {
    const {doInputOTP} = this.props;
    const {otpCode} = this.state;

    if (otpCode != '' && otpCode.length > 5) {
      if (this.state.isConnecting) {
        this.setState({isLoading: true});
        // doInputOTP(otpCode);

        if (this.props.navigation.state.params.typeScreen == FORGOT_PASSWORD) {
          this.props.navigation.dispatch({
            key: SCREEN_MAIN,
            type: 'ReplaceCurrentScreen',
            routeName: SCREEN_MAIN,
            params: {},
          });
        } else {
          AsyncStorage.setItem('login', '1');
          this.props.navigation.dispatch({
            key: SCREEN_INFO,
            type: 'ReplaceCurrentScreen',
            routeName: SCREEN_INFO,
            params: {},
          });
        }
      } else {
        showAlert('Vui lòng kiểm tra kết nối mạng.');
      }
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == 'input_otp_error') {
      this.setState({isLoading: false});
      showAlert('Mã OTP không đúng.');
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == 'input_otp_success') {
      showAlert('Mã OTP không đúng.');
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
      // this.props.navigation.navigate(SCREEN_LOGIN);
    }
  }

  render() {
    return (
      <View>
        <View style={{marginTop: 200}}>
          <InputOTPForm
            handleInputOTP={this.handleInputOTP}
            navigation={this.props.navigation}
            onChangeText={this.onChangeText}
            otpCode={this.state.otpCode}
            timeSendAgain={this.state.timerSendAgain}
          />
        </View>
        <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          color={'#fff'}
          size={'large'}
          textStyle={{color: '#fff'}}
          animation={'fade'}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
    msg_code: state.home.msg_code,
  };
}

export default connect(mapStateToProps, {
  doInputOTP,
  changeMsgCode,
})(InputOTPContainer);
