import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import BgButton from '../../../components/BgButton';

export class InputOTPForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {onChangeText, handleInputOTP, otpCode, timeSendAgain} = this.props;
    return (
      <View
        style={{
          marginStart: 20,
          marginEnd: 20,
        }}>
        <Text style={styles.txtCreateAccount}>Mã OTP</Text>
        <View style={[styles.groupInput, {marginBottom: 14}]}>
          <TextInput
            maxLength={6}
            style={styles.inputLogin}
            returnKeyType="go"
            keyboardType="numeric"
            value={otpCode}
            name="otpCode"
            placeholder="Nhập mã OTP"
            onChangeText={text => onChangeText(text, 'otpCode')}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.txtNumberPhone}>Mã gửi lại sau</Text>
          <Text style={styles.textSendOTPAgain}>{timeSendAgain}s</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleInputOTP()}
          style={styles.buttonContinue}>
          <BgButton />

          <Text style={styles.buttonText}>Tiếp Tục</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default InputOTPForm;
