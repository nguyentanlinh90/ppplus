import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from 'react-native-check-box';
import CBShowPass from '../../../components/CBShowPass';
import CBHidePass from '../../../components/CBHidePass';
import BgButton from '../../../components/BgButton';

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPass: true,
    };
  }

  render() {
    const {
      onChangeText,
      handleForgetPassword,
      handleLogin,
      handleNotYetAccount,
      phone,
      password,
    } = this.props;
    return (
      <View>
        <Text style={styles.txtCreateAccount}>Đăng Nhập</Text>
        <Text style={styles.txtNumberPhone}>Số điện thoại</Text>
        <View style={styles.groupInput}>
          <TextInput
            style={styles.inputLogin}
            autoCapitalize="none"
            autoCorrect={true}
            keyboardType="numeric"
            returnKeyType="next"
            placeholder="Nhập số điện thoại"
            value={phone}
            name="phone"
            onChangeText={text => onChangeText(text, 'phone')}
          />
        </View>
        <Text style={styles.txtNumberPhone}>Mật khẩu</Text>
        <View style={[styles.groupInput, {marginBottom: 14}]}>
          <TextInput
            style={styles.inputLogin}
            returnKeyType="go"
            value={password}
            name="password"
            placeholder="Nhập mật khẩu"
            onChangeText={text => onChangeText(text, 'password')}
            secureTextEntry={this.state.isShowPass}
          />
          <View style={styles.boxShowPass}>
            <CheckBox
              onClick={() => {
                this.setState({isShowPass: !this.state.isShowPass});
              }}
              isChecked={!this.state.isShowPass}
              checkedImage={<CBShowPass />}
              unCheckedImage={<CBHidePass />}
            />
          </View>
        </View>

        <Text
          style={styles.textForgetPass}
          onPress={() => handleForgetPassword()}>
          Quên mật khẩu
        </Text>

        <TouchableOpacity
          style={styles.buttonContinue}
          activeOpacity={0.7}
          onPress={() => handleLogin()}>
          <BgButton />
          <Text style={styles.buttonText}>Tiếp Tục</Text>
        </TouchableOpacity>
        <Text
          style={styles.textNotYetAccount}
          onPress={() => handleNotYetAccount()}>
          Chưa có tài khoản?
        </Text>
      </View>
    );
  }
}
export default LoginForm;
