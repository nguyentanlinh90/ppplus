import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styleUser from '../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from 'react-native-check-box';
import CBShowPass from '../../../components/CBShowPass';
import CBHidePass from '../../../components/CBHidePass';
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
        <Text style={styleUser.txtCreateAccount}>Đăng Nhập</Text>
        <Text style={styleUser.txtNumberPhone}>Số điện thoại</Text>
        <View style={styleUser.groupInput}>
          <TextInput
            style={styleUser.inputLogin}
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
        <Text style={styleUser.txtNumberPhone}>Mật khẩu</Text>
        <View style={[styleUser.groupInput, {marginBottom: 14}]}>
          <TextInput
            style={styleUser.inputLogin}
            returnKeyType="go"
            value={password}
            name="password"
            placeholder="Nhập mật khẩu"
            onChangeText={text => onChangeText(text, 'password')}
            secureTextEntry={this.state.isShowPass}
          />
          <View style={styleUser.boxShowPass}>
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
          style={styleUser.textForgetPass}
          onPress={() => handleForgetPassword()}>
          Quên mật khẩu
        </Text>

        <TouchableOpacity activeOpacity={0.7} onPress={() => handleLogin()}>
          <LinearGradient
            colors={['#F0532D', '#FEBE10']}
            useAngle={true}
            angle={-90}
            style={styleUser.buttonContinue}>
            <Text style={styleUser.buttonText}>Tiếp Tục</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text
          style={styleUser.textNotYetAccount}
          onPress={() => handleNotYetAccount()}>
          Chưa có tài khoản?
        </Text>
      </View>
    );
  }
}
export default LoginForm;
