import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styleUser from '../styles/styles';
import LinearGradient from 'react-native-linear-gradient';

export class InputOTPForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {onChangeText, handleInputOTP, otpCode, timeSendAgain} = this.props;
    return (
      <View>
        <Text style={styleUser.txtCreateAccount}>Mã OTP</Text>
        <View style={[styleUser.groupInput, {marginBottom: 14}]}>
          <TextInput
            maxLength={6}
            style={styleUser.inputLogin}
            returnKeyType="go"
            keyboardType="numeric"
            value={otpCode}
            name="otpCode"
            placeholder="Nhập mã OTP"
            onChangeText={text => onChangeText(text, 'otpCode')}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styleUser.txtNumberPhone}>Mã gửi lại sau</Text>
          <Text style={styleUser.textSendOTPAgain}>{timeSendAgain}s</Text>
        </View>

        <TouchableOpacity activeOpacity={0.7} onPress={() => handleInputOTP()}>
          <LinearGradient
            colors={['#F0532D', '#FEBE10']}
            useAngle={true}
            angle={-90}
            style={styleUser.buttonContinue}>
            <Text style={styleUser.buttonText}>Tiếp Tục</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}
export default InputOTPForm;
