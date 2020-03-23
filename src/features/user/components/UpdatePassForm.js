import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import CheckBox from 'react-native-check-box';
import CBShowPass from '../../../components/CBShowPass';
import CBHidePass from '../../../components/CBHidePass';
import BgButton from '../../../components/BgButton';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPass: true,
      isShowPassAgain: true,
    };
  }

  render() {
    const {
      handleUpdatePass,
      onChangeText,
      new_password,
      new_password_confirm,
    } = this.props;
    return (
      <View>
        <Text style={styles.txtCreateAccount}>Cập nhật mật khẩu mới</Text>
        <Text style={styles.txtTitleField}>Mật khẩu mới</Text>
        <View style={[styles.groupInput, {marginBottom: 14}]}>
          <TextInput
            maxLength={50}
            style={styles.inputLogin}
            secureTextEntry={this.state.isShowPass}
            returnKeyType="go"
            value={new_password}
            name="new_password"
            placeholder="Nhập mật khẩu mới"
            onChangeText={text => onChangeText(text, 'new_password')}
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
        <Text style={styles.txtTitleField}>Xác nhận lại mật khẩu mới</Text>
        <View style={[styles.groupInput, {marginBottom: 14}]}>
          <TextInput
            secureTextEntry={this.state.isShowPassAgain}
            maxLength={50}
            style={styles.inputLogin}
            returnKeyType="go"
            value={new_password_confirm}
            name="new_password_confirm"
            placeholder="Xác nhận lại mật khẩu mới"
            onChangeText={text => onChangeText(text, 'new_password_confirm')}
          />
          <View style={styles.boxShowPass}>
            <CheckBox
              onClick={() => {
                this.setState({isShowPassAgain: !this.state.isShowPassAgain});
              }}
              isChecked={!this.state.isShowPassAgain}
              checkedImage={<CBShowPass />}
              unCheckedImage={<CBHidePass />}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonContinue}
          activeOpacity={0.7}
          onPress={() => handleUpdatePass()}>
          <BgButton />
          <Text style={styles.buttonText}>Cập nhật</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
