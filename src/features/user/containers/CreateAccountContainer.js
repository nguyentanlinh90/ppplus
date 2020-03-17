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
  Alert,
  ScrollView
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import CreateAccountForm from '../components/CreateAccountForm';
import {doCreateAccount} from '../actions/index';
import rootStyles from '../../../styles/styles';
import styles from '../styles/styles';
import {changeMsgCode} from '../../../api/helpers';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import {SCREEN_INPUT_OTP} from '../../../api/screen';
import {showAlert, convertPhone, dispatchScreen} from '../../../utils/utils';
import * as types from '../../../api/types';
import {REGEX} from '../../../utils/constants';

export class CreateAccountContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      reference_code: '',
      password: '',
      password_confirm: '',
      isLoading: false,
      isConnecting: false,
      isAgree: false,
    };
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
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
        showAlert('Vui lòng kiểm tra kết nối mạng ');
        this.setState({isConnecting: false});
      }
    });
  };

  onChangeText = (text, type) => {
    if (type == 'phone') {
      const strPhone = convertPhone(text);
      this.setState({phone: strPhone});
    } else if (type == 'reference_code') {
      this.setState({reference_code: text});
    } else if (type == 'password') {
      this.setState({password: text});
    } else if (type == 'password_confirm') {
      this.setState({password_confirm: text});
    }
  };

  _showAlert = message => {
    this.dropdown.alertWithType('error', 'Lỗi', message);
  };

  handleCreateAccount = () => {
    const {doCreateAccount} = this.props;
    const {phone, reference_code, password, password_confirm} = this.state;

    if (
      phone == '' ||
      reference_code == '' ||
      password == '' ||
      password_confirm == ''
    ) {
      showAlert('Vui lòng điền đầy đủ các trường thông tin.');
      return;
    }

    if (phone != '') {
      if (!REGEX.test(phone)) {
        showAlert(
          'Số điện thoại không hợp lệ. Vui lòng điền 10 số điện thoại di động Việt Nam',
        );
        return;
      }
    }

    if (reference_code.length < 6) {
      showAlert('Vui lòng nhập đủ 6 ký tự của mã giới thiệu');
      return;
    }

    var specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (specialCharacters.test(reference_code)) {
      showAlert('Mã giới thiệu không được chứa ký tự đặc biệt');
      return;
    }

    var formatPass = /^(?=.*[0-9])(?=.*[A-Z])/;
    if (password.length < 6 || !formatPass.test(password)) {
      showAlert(
        'Mật khẩu quá ngắn hoặc quá đơn giản. Vui lòng nhập vào từ 6 đến 50 ký tự, có ít nhất một ký tự in hoa (A-Z) và một số (0-9)',
      );
      return;
    }

    if (password != password_confirm) {
      showAlert('Vui lòng nhập mật khẩu và xác nhận mật khẩu trùng nhau');

      return;
    }

    if (!this.state.isAgree) {
      showAlert('Bạn chưa đồng ý với điều khoản');

      return;
    }
    if (this.state.isConnecting) {
      this.setState({isLoading: true});
      doCreateAccount(phone, reference_code, password, password_confirm);
    } else {
      showAlert('Vui lòng kiểm tra kết nối mạng ');
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == types.REGISTER_USER_FAIL) {
      this.setState({isLoading: false});
      // showAlert(nextProps.message);
      this._showAlert(nextProps.message);
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.REGISTER_USER_SUCCESS) {
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
      dispatchScreen(this.props, SCREEN_INPUT_OTP, [
        this.state.phone,
        nextProps.data.waiting_time_otp,
        true, // check isRegister
      ]);
    }
  }

  _setAgree = () => {
    this.setState({isAgree: !this.state.isAgree});
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView>
          <Spinner
            visible={this.state.isLoading}
            color={'white'}
            size={'large'}
            textStyle={{color: '#fff'}}
          />
          <KeyboardAvoidingView behavior="padding" enabled>
            <CreateAccountForm
              handleCreateAccount={this.handleCreateAccount}
              navigation={this.props.navigation}
              onChangeText={this.onChangeText}
              phone={this.state.phone}
              reference_code={this.state.reference_code}
              password={this.state.password}
              password_confirm={this.state.password_confirm}
              setAgree={this._setAgree}
              isAgree={this.state.isAgree}
            />
          </KeyboardAvoidingView>
          <DropdownAlert
            ref={ref => (this.dropdown = ref)}
            defaultContainer={styles.defaultContainerAlert}
            defaultTextContainer={styles.defaultTextAlert}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

function mapStateToProps(state) {
  return {
    // state: state,
    msg_code: state.user.msg_code,
    message: state.user.message,
    data: state.user.data,
  };
}

export default connect(mapStateToProps, {
  doCreateAccount,
  changeMsgCode,
})(CreateAccountContainer);
