import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  StatusBar,
  Image,
  Text,
  Button,
  Linking,
} from 'react-native';

import InputPhoneNumberForm from '../components/InputPhoneNumberForm';
import PopupSupport from '../components/PopupSupport';
import {doInputPhoneNumber} from '../actions/index';
import DropdownAlert from 'react-native-dropdownalert';
import styles from '../../../styles/styles';
import styleUser from '../styles/styles';
import {changeMsgCode} from '../../home/actions/index';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import {SCREEN_LOGIN} from '../../../api/screen';

export class InputPhoneNumberContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      isLoading: false,
      isConnecting: false,
      popUpVisible: false,
    };
    this.handleInputPhoneNumber = this.handleInputPhoneNumber.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
  }
  componentDidUpdate() {}

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
    if (type == 'phoneNumber') {
      this.setState({phoneNumber: text});
    }
  };

  openModel = () => {
    this.setState({modalVisible: true});
  };

  callSupport = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${1900890890}';
    } else {
      phoneNumber = 'telprompt:${1900890890}';
    }
    Linking.openURL(phoneNumber);
  };

  handleInputPhoneNumber = () => {
    const {doInputPhoneNumber} = this.props;
    const {phoneNumber} = this.state;

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
          doInputPhoneNumber(phoneNumber);
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
        'Vui lòng nhập số điện thoại ',
      );
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == 'input_phone_number_error') {
      this.setState({isLoading: false});
      this.dropdown.alertWithType('error', 'Lỗi', 'Số điện thoại không đúng');
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == 'input_phone_number_success') {
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
      // this.props.navigation.navigate(SCREEN_LOGIN);
    }
  }

  render() {
    return (
      <View style={styles.body}>
        <PopupSupport
          visible={this.state.popUpVisible}
          callSupport={this.callSupport}
        />
        <SafeAreaView>
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
                    <InputPhoneNumberForm
                      handleInputPhoneNumber={this.openModel}
                      navigation={this.props.navigation}
                      onChangeText={this.onChangeText}
                      phoneNumber={this.state.phoneNumber}
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
  doInputPhoneNumber,
  changeMsgCode,
})(InputPhoneNumberContainer);
