import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  StatusBar,
  Image,
} from 'react-native';
import InputOTPForm from '../components/InputOTPForm';
import {doInputOTP} from '../actions/index';
import DropdownAlert from 'react-native-dropdownalert';
import styles from '../../../styles/styles';
import styleUser from '../styles/styles';
import {changeMsgCode} from '../../home/actions/index';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import {SCREEN_MAIN} from '../../../api/screen';

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
        this.dropdown.alertWithType(
          'error',
          'Lỗi',
          'Vui lòng kiểm tra kết nối mạng ',
        );
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
        this.props.navigation.dispatch({
          key: SCREEN_MAIN,
          type: 'ReplaceCurrentScreen',
          routeName: SCREEN_MAIN,
          params: {},
        });
      } else {
        this.dropdown.alertWithType(
          'error',
          'Lỗi',
          'Vui lòng kiểm tra kết nối mạng ',
        );
      }
    } else {
      this.dropdown.alertWithType(
        'error',
        'Lỗi',
        'Vui lòng nhập 6 ký tự mã OTP',
      );
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == 'input_otp_error') {
      this.setState({isLoading: false});
      this.dropdown.alertWithType('error', 'Lỗi', 'Mã OTP không đúng');
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == 'input_otp_success') {
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
      // this.props.navigation.navigate(SCREEN_LOGIN);
    }
  }

  render() {
    return (
      <View style={styles.body}>
        <SafeAreaView>
          <StatusBar backgroundColor="#000" barStyle="light-content" />
          <View style={{height: '100%'}}>
            <View style={[{height: '55%'}]}>
              <View style={styleUser.boxLogin}>
                <KeyboardAvoidingView behavior="padding" enabled>
                  <View
                    style={{
                      paddingTop: '35%',
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}>
                    <InputOTPForm
                      handleInputOTP={this.handleInputOTP}
                      navigation={this.props.navigation}
                      onChangeText={this.onChangeText}
                      otpCode={this.state.otpCode}
                      timeSendAgain={this.state.timerSendAgain}
                    />
                  </View>
                </KeyboardAvoidingView>
              </View>
            </View>
          </View>
          <Spinner
            visible={this.state.isLoading}
            textContent={'Loading...'}
            color={'#fff'}
            size={'large'}
            textStyle={{color: '#fff'}}
            animation={'fade'}
          />
          <DropdownAlert
            ref={ref => (this.dropdown = ref)}
            defaultContainer={styles.defaultContainerLogin}
            defaultTextContainer={styles.defaultTextContainerLogin}
          />
        </SafeAreaView>
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
