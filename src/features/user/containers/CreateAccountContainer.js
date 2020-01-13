import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import {convertPhone} from "../../../api/helpers";
import CreateAccountForm from '../components/CreateAccountForm';
import {doCreateAccount} from '../actions/index';
import DropdownAlert from 'react-native-dropdownalert';
import styles from '../../../styles/styles';
import styleUser from '../styles/styles';
import {changeMsgCode} from '../../home/actions/index';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import {SCREEN_INPUT_OTP} from '../../../api/screen';

export class CreateAccountContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '0988422495',
      referral_code: 'GOTIT',
      password: '123456',
      passwordAgain: '123456',
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
    } else if (type == 'referral_code') {
      this.setState({referral_code: text});
    } else if (type == 'password') {
      this.setState({password: text});
    } else if (type == 'passwordAgain') {
      this.setState({passwordAgain: text});
    }
  };

  handleCreateAccount = () => {
    const {doCreateAccount} = this.props;
    const {phone, referral_code, password, passwordAgain} = this.state;

    if (
      phone == '' ||
      referral_code == '' ||
      password == '' ||
      passwordAgain == ''
    ) {
      this.dropdown.alertWithType(
        'error',
        'Lỗi',
        'Vui lòng nhập đầy đủ thông tin',
      );
      return;
    }
    if (password.length < 6) {
      this.dropdown.alertWithType(
        'error',
        'Lỗi',
        'Mật khẩu phải dài hơn 6 ký tự',
      );
      return;
    }
    if (password != passwordAgain) {
      this.dropdown.alertWithType(
        'error',
        'Lỗi',
        'Xác nhận mật khẩu không đúng',
      );
      return;
    }

    if (!this.state.isAgree) {
      this.dropdown.alertWithType(
        'error',
        'Lỗi',
        'Bạn chưa đồng ý với điều khoản',
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
        if (this.state.isConnecting) {
          this.setState({isLoading: true});
          doCreateAccount(phone, referral_code);
        } else {
          this.dropdown.alertWithType(
            'error',
            'Lỗi',
            'Vui lòng kiểm tra kết nối mạng ',
          );
        }
      }
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    // if (nextProps.msg_code == 'create_account_error') {
    //   this.setState({isLoading: false});
    //   this.dropdown.alertWithType(
    //     'error',
    //     'Lỗi',
    //     'Số điện thoại hoặc mã giới thiệu không đúng',
    //   );
    //   nextProps.changeMsgCode('');
    // } else if (nextProps.msg_code == 'create_account_success') {
    //   this.setState({isLoading: false});
    //   nextProps.changeMsgCode('');

    //   if ('phone' in nextProps.state.user.user) {
    //     this.props.navigation.dispatch({
    //       key: SCREEN_SET_PASSWORD,
    //       type: 'ReplaceCurrentScreen',
    //       routeName: SCREEN_SET_PASSWORD,
    //       params: nextProps.state.user.user,
    //     });
    //   }
    // }
    // hard code
    this.props.navigation.dispatch({
      key: SCREEN_INPUT_OTP,
      type: 'ReplaceCurrentScreen',
      routeName: SCREEN_INPUT_OTP,
      params: nextProps.state.user.user,
    });
  }

  _setAgree=() =>{
    this.setState({isAgree: !this.state.isAgree});
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView>
        <Spinner
          visible={this.state.isLoading}
          color={'white'}
          size={'large'}
          textStyle={{color: '#fff'}}
        />
        <View style={styleUser.boxLogin}>
          <KeyboardAvoidingView behavior="padding" enabled>
            <CreateAccountForm
              handleCreateAccount={this.handleCreateAccount}
              navigation={this.props.navigation}
              onChangeText={this.onChangeText}
              phone={this.state.phone}
              referral_code={this.state.referral_code}
              password={this.state.password}
              passwordAgain={this.state.passwordAgain}
              setAgree={this._setAgree}
              isAgree={this.state.isAgree}
            />
          </KeyboardAvoidingView>
        </View>

        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          defaultContainer={styles.defaultContainerLogin}
          defaultTextContainer={styles.defaultTextContainerLogin}
        />
      </SafeAreaView>
      </TouchableWithoutFeedback>
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
  doCreateAccount,
  changeMsgCode,
})(CreateAccountContainer);
