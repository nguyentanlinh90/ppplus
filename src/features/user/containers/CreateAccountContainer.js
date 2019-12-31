import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  StatusBar,
  Image,
} from 'react-native';
import CreateAccountForm from '../components/CreateAccountForm';
import {doCreateAccount} from '../actions/index';
import DropdownAlert from 'react-native-dropdownalert';
import styles from '../../../styles/styles';
import styleUser from '../styles/styles';
import {convertPhone} from '../../../api/helpers';
import {changeMsgCode} from '../../home/actions/index';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import {SCREEN_SET_PASSWORD} from '../../../api/screen';

export class CreateAccountContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      code: '',
      isLoading: false,
      isConnecting: false,
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
    } else if (type == 'code') {
      this.setState({code: text});
    }
  };

  handleCreateAccount = () => {
    const {doCreateAccount} = this.props;
    const {phone, code} = this.state;

    if (phone != '' || code != '') {
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
          doCreateAccount(phone, code);
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
        'Vui lòng nhập đầy đủ số điện thoại và mã giới thiệu',
      );
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == 'create_account_error') {
      this.setState({isLoading: false});
      this.dropdown.alertWithType(
        'error',
        'Lỗi',
        'Số điện thoại hoặc mã giới thiệu không đúng',
      );
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == 'create_account_success') {
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
      this.props.navigation.dispatch({
        key: SCREEN_SET_PASSWORD,
        type: 'ReplaceCurrentScreen',
        routeName: SCREEN_SET_PASSWORD,
        params: {},
      });
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
                    <CreateAccountForm
                      handleCreateAccount={this.handleCreateAccount}
                      navigation={this.props.navigation}
                      onChangeText={this.onChangeText}
                      phone={this.state.phone}
                      code={this.state.code}
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
  doCreateAccount,
  changeMsgCode,
})(CreateAccountContainer);
