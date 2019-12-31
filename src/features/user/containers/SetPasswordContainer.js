import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  StatusBar,
  Image,
} from 'react-native';
import SetPassWordForm from '../components/SetPasswordForm';
import {doSetPassword} from '../actions/index';
import DropdownAlert from 'react-native-dropdownalert';
import styles from '../../../styles/styles';
import styleUser from '../styles/styles';
import {changeMsgCode} from '../../home/actions/index';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import {SCREEN_LOGIN} from '../../../api/screen';

export class SetPasswordContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      isLoading: false,
      isConnecting: false,
    };
    this.handleSetPassword = this.handleSetPassword.bind(this);
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
    if (type == 'password') {
      this.setState({password: text});
    }
  };

  handleSetPassword = () => {
    const {doSetPassword} = this.props;
    const {password} = this.state;

    if (password != '') {
      if (this.state.isConnecting) {
        this.setState({isLoading: true});
        doSetPassword(password);
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
        'Vui lòng nhập mật khẩu',
      );
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == 'set_password_error') {
      this.setState({isLoading: false});
      this.dropdown.alertWithType(
        'error',
        'Lỗi',
        'Mật khẩu không hợp lệ',
      );
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == 'set_password_success') {
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
      this.props.navigation.dispatch({
        key: SCREEN_LOGIN,
        type: 'ReplaceCurrentScreen',
        routeName: SCREEN_LOGIN,
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
                    <SetPassWordForm
                      handleSetPassword={this.handleSetPassword}
                      navigation={this.props.navigation}
                      onChangeText={this.onChangeText}
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
  doSetPassword,
  changeMsgCode,
})(SetPasswordContainer);
