import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import UpdatePassForm from '../components/UpdatePassForm';
import {doUpdateUserInfo} from '../actions/index';
import rootStyles from '../../../styles/styles';
import styles from '../styles/styles';
import {changeMsgCode} from '../../home/actions/index';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import {SCREEN_LOGIN} from '../../../api/screen';
import {dispatchScreen} from '../../../utils/utils';
import {showAlert} from '../../../utils/utils';
import * as types from '../../../api/types';
export class UpdatePassContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: this.props.navigation.state.params[0],
      access_token: this.props.navigation.state.params[1],
      new_password: 'Lin123@',
      new_password_confirm: 'Lin123@',
      isConnecting: false,
      isLoading:false,
    };
    this._handleUpdatePass = this._handleUpdatePass.bind(this);
    this._onChangeText = this._onChangeText.bind(this);
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
        showAlert('Vui lòng kiểm tra kết nối mạng.');
        this.setState({isConnecting: false});
      }
    });
  };

  _onChangeText = (text, type) => {
    if (type == 'new_password') {
      this.setState({new_password: text});
    } else if (type == 'new_password_confirm') {
      this.setState({new_password_confirm: text});
    }
  };

  _handleUpdatePass = () => {
    const {doUpdateUserInfo} = this.props;
    const {
      phone,
      access_token,
      new_password,
      new_password_confirm,
    } = this.state;

    var formatPass = /^(?=.*[0-9])(?=.*[A-Z])/;
    if (new_password.length < 6 || !formatPass.test(new_password)) {
      showAlert(
        'Mật khẩu quá ngắn hoặc quá đơn giản. Vui lòng nhập vào từ 6 đến 50 ký tự, có ít nhất một ký tự in hoa (A-Z) và một số (0-9)',
      );
      return;
    }

    if (new_password != new_password_confirm) {
      showAlert('Vui lòng nhập mật khẩu và xác nhận mật khẩu trùng nhau');
      return;
    }
    this.setState({isLoading: true});
    const params = {
      phone: '0988422495',
      type: types.TYPE_USER_FORGOT_PASSWORD,
      password: new_password,
      password_confirm: new_password_confirm,
    };
    doUpdateUserInfo(params, 'Bearer ' + access_token);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == types.UPDATE_USER_INFO_FAIL) {
      this.setState({isLoading: false});
      showAlert(nextProps.message);
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.UPDATE_USER_INFO_SUCCESS) {
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
      dispatchScreen(this.props, SCREEN_LOGIN, {});
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
          <KeyboardAvoidingView behavior="padding" enabled>
            <UpdatePassForm
              handleUpdatePass={this._handleUpdatePass}
              onChangeText={this._onChangeText}
              new_password={this.state.new_password}
              new_password_confirm={this.state.new_password_confirm}
            />
          </KeyboardAvoidingView>
          <Spinner
            visible={this.state.isLoading}
            color={'white'}
            size={'large'}
            textStyle={{color: '#fff'}}
          />
        </View>
      </TouchableWithoutFeedback>
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
  doUpdateUserInfo,
  changeMsgCode,
})(UpdatePassContainer);
