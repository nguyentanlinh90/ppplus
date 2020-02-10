import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import BgButton from '../../../components/BgButton';
import CheckBox from 'react-native-check-box';
import CBChecked from '../../../components/CBChecked';
import CBUnChecked from '../../../components/CBUnChecked';
import CBShowPass from '../../../components/CBShowPass';
import CBHidePass from '../../../components/CBHidePass';
export class CreateAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPass: true,
      isShowPassAgain: true,
    };
  }

  render() {
    const {
      onChangeText,
      handleCreateAccount,
      phone,
      referral_code,
      password,
      passwordAgain,
      setAgree,
      isAgree,
    } = this.props;
    return (
      <View>
        <Text style={styles.txtCreateAccount}>Tạo tài khoản</Text>
        <Text style={styles.txtNumberPhone}>Số điện thoại</Text>
        <View style={styles.groupInput}>
          <TextInput
            maxLength={10}
            style={styles.inputCreateAccount}
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
        <Text style={styles.txtNumberPhone}>Mã giới thiệu</Text>
        <View style={[styles.groupInput, {marginBottom: 14}]}>
          <TextInput
            style={styles.inputCreateAccount}
            maxLength={10}
            autoCapitalize="none"
            autoCorrect={true}
            keyboardType="default"
            returnKeyType="next"
            placeholder="Nhập mã giới thiệu"
            value={referral_code}
            name="referral_code"
            onChangeText={text => onChangeText(text, 'referral_code')}
          />
        </View>
        <Text style={styles.txtNumberPhone}>Mã mật khẩu</Text>
        <View style={[styles.groupInput, {marginBottom: 14}]}>
          <TextInput
            maxLength={50}
            style={styles.inputLogin}
            secureTextEntry={this.state.isShowPass}
            returnKeyType="go"
            value={password}
            name="password"
            placeholder="Nhập mật khẩu"
            onChangeText={text => onChangeText(text, 'password')}
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
        <Text style={styles.txtNumberPhone}>Xác nhận lại mật khẩu</Text>
        <View style={[styles.groupInput, {marginBottom: 14}]}>
          <TextInput
            secureTextEntry={this.state.isShowPassAgain}
            maxLength={50}
            style={styles.inputLogin}
            returnKeyType="go"
            value={passwordAgain}
            name="passwordAgain"
            placeholder="Xác nhận lại mật khẩu"
            onChangeText={text => onChangeText(text, 'passwordAgain')}
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
        <View style={styles.viewAgree}>
          <CheckBox
            onClick={() => setAgree()}
            isChecked={isAgree}
            checkedImage={<CBChecked />}
            unCheckedImage={<CBUnChecked />}
          />
          <Text style={styles.textAgree}>
            Tôi đồng ý các điều khoản hoạt động của PP+
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleCreateAccount()}
          style={styles.buttonContinue}>
          <BgButton />

          <Text style={styles.buttonText}>Tiếp Tục</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default CreateAccountForm;
