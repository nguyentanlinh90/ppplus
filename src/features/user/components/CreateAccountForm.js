import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styleUser from '../styles/styles';
import LinearGradient from 'react-native-linear-gradient';

export class CreateAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {onChangeText, handleCreateAccount, phone, referral_code} = this.props;
    return (
      <View>
        <Text style={styleUser.txtCreateAccount}>Tạo tài khoản</Text>
        <Text style={styleUser.txtNumberPhone}>Số điện thoại</Text>
        <View style={styleUser.groupInput}>
          <TextInput
            style={styleUser.inputCreateAccount}
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
        <Text style={styleUser.txtNumberPhone}>Mã giới thiệu</Text>
        <View style={[styleUser.groupInput, {marginBottom: 14}]}>
          <TextInput
            style={styleUser.inputCreateAccount}
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
        <View style={styleUser.viewAgree}>
          <View style={styleUser.boxCheckBox}></View>
          <Text style={styleUser.textAgree}>Tôi đồng ý các điều khoản hoạt động của PP+</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => handleCreateAccount()}>
          <LinearGradient
            colors={['#F0532D', '#FEBE10']}
            useAngle={true}
            angle={-90}
            style={styleUser.buttonContinue}>
            <Text style={styleUser.buttonText}>Đăng Nhập</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}
export default CreateAccountForm;
