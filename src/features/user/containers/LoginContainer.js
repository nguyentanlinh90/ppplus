import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  StatusBar,
  Image,
} from 'react-native';
import LoginForm from '../components/LoginForm';
import {doLogin} from '../actions/index';
import DropdownAlert from 'react-native-dropdownalert';
import styles from '../../../styles/styles';
import styleUser from '../styles/styles';
import {convertPhone} from '../../../api/helpers';
import {changeMsgCode} from '../../home/actions/index';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import {FORGOT_PASSWORD} from '../../../utils/constants';
import {SCREEN_INPUT_OTP} from '../../../api/screen';
import {SCREEN_CREATE_ACCOUNT} from '../../../api/screen';
import {SCREEN_MAIN} from '../../../api/screen';

export class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      password: '',
      isLoading: false,
      isConnecting: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
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
    if (type == 'phone') {
      const strPhone = convertPhone(text);
      this.setState({phone: strPhone});
    } else if (type == 'password') {
      this.setState({password: text});
    }
  };

  handleForgetPassword = () => {
    const {phone} = this.state;

    if (phone == '') {
      this.dropdown.alertWithType(
        'error',
        'Lỗi',
        'Vui lòng nhập số điện thoại để chúng tôi có thể gửi mã xác nhận',
      );
      return;
    }

    if (phone != '') {
      var regEx = /^(03|09|08|07|05)[0-9]{8}$/;
      if (!regEx.test(phone)) {
        this.dropdown.alertWithType(
          'error',
          'Lỗi',
          'Số điện thoại không đúng định dạng.',
        );
      } else {
        this.props.navigation.dispatch({
          key: SCREEN_INPUT_OTP,
          type: 'ReplaceCurrentScreen',
          routeName: SCREEN_INPUT_OTP,
          params: {typeScreen: FORGOT_PASSWORD},
        });
      }
    }
  };

  handleNotYetAccount = () => {
    this.props.navigation.navigate(SCREEN_CREATE_ACCOUNT);
  };

  handleLogin = () => {
    const {doLogin} = this.props;
    const {phone, password} = this.state;

    if (phone != '' && password != '') {
      var regEx = /^(03|09|08|07|05)[0-9]{8}$/;
      if (!regEx.test(phone)) {
        this.dropdown.alertWithType(
          'error',
          'Lỗi',
          'Số điện thoại không đúng định dạng.',
        );
      } else {
        if (this.state.isConnecting) {
          this.setState({isLoading: true});
          doLogin(phone, password);
        } else {
          this.dropdown.alertWithType(
            'error',
            'Lỗi',
            'Vui lòng kiểm tra kết nối mạng ',
          );
        }
      }
    } else {
      this.dropdown.alertWithType(
        'error',
        'Lỗi',
        'Vui lòng nhập đầy đủ số điện thoại và mật khẩu',
      );
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == 'login_error') {
      this.setState({isLoading: false});
      this.dropdown.alertWithType(
        'error',
        'Lỗi',
        'Số điện thoại hoặc mặt khẩu không đúng',
      );
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == 'login_success') {
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
      // this.props.navigation.goBack();
      this.props.navigation.dispatch({
        key: SCREEN_MAIN,
        type: 'ReplaceCurrentScreen',
        routeName: SCREEN_MAIN,
        params: {},
      });
    }
  }

  render() {
    return (
      <View style={styles.body}>
        <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
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
                    <LoginForm
                      handleForgetPassword={this.handleForgetPassword}
                      handleLogin={this.handleLogin}
                      handleNotYetAccount={this.handleNotYetAccount}
                      navigation={this.props.navigation}
                      onChangeText={this.onChangeText}
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
  doLogin,
  changeMsgCode,
})(LoginContainer);
