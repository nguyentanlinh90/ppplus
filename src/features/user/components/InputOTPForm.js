import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import styles from '../styles/styles';
import BgButton from '../../../components/BgButton';

export class InputOTPForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _checkCode = code => {
    if (code != '') {
    }
  };
  render() {
    const {onChangeText, handleInputOTP, otpCode, timeSendAgain} = this.props;
    return (
      <View
        style={{
          marginStart: 20,
          marginEnd: 20,
        }}>
        <Text style={styles.txtCreateAccount}>Mã OTP</Text>
        <View style={{alignItems: 'center'}}>
          <SmoothPinCodeInput
          autoFocus={true}
            keyboardType="numeric"
            codeLength={6}
            cellStyle={{
              borderBottomWidth: 2,
              borderColor: 'gray',
            }}
            cellStyleFocused={{
              borderColor: 'black',
            }}
            value={otpCode}
            onTextChange={otpCode => onChangeText(otpCode, 'otpCode')}
            onFulfill={this._checkCode}
          />
        </View>

        <View style={{flexDirection: 'row', marginTop: 30}}>
          <Text style={styles.txtNumberPhone}>Mã gửi lại sau</Text>
          <Text style={styles.textSendOTPAgain}>{timeSendAgain}s</Text>
        </View>
        {otpCode.length > 5 ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleInputOTP()}
            style={styles.buttonContinue}>
            <BgButton />

            <Text style={styles.buttonText}>Tiếp Tục</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.buttonContinue, styles.buttonDisableContinue]}>
            <Text style={[styles.buttonText, styles.buttonDisableText]}>
              Tiếp Tục
            </Text>
          </View>
        )}
      </View>
    );
  }
}
export default InputOTPForm;
