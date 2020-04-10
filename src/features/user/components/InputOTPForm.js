import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import styles from '../styles/styles';
import BgButton from '../../../components/BgButton';

export default class InputOTPForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _checkCode = code => {
    if (code != '') {
    }
  };
  render() {
    const {
      onChangeText,
      handleProcessOTP,
      handleResendOTP,
      otpCode,
      timeResend,
    } = this.props;
    return (
      <View
        style={{
          marginStart: 20,
          marginEnd: 20,
        }}>
        <Text style={styles.txtCreateAccount}>Mã xác nhận</Text>
        <View style={{alignItems: 'center'}}>
          <SmoothPinCodeInput
            autoFocus={true}
            keyboardType="numeric"
            codeLength={6}
            cellStyle={{
              borderBottomWidth: 2,
              borderColor: '#d8d8d8',
            }}
            cellStyleFocused={{
              borderColor: '#000',
            }}
            textStyle={{color: '#000', fontWeight: 'bold', fontSize: 24}}
            text
            value={otpCode}
            onTextChange={otpCode => onChangeText(otpCode, 'otpCode')}
            onFulfill={this._checkCode}
          />
        </View>
        {timeResend == 0 ? (
          <TouchableOpacity
            onPress={() => handleResendOTP()}
            style={{
              backgroundColor: '#F0532D',
              marginTop: 30,
              borderRadius: 30,
              height: 35,
              width: 140,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                alignSelf: 'center',
              }}>
              Gửi lại mã
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{flexDirection: 'row', marginTop: 30, alignItems: 'center'}}>
            <Text style={styles.txtTitleField}>Gửi lại mã sau</Text>
            <Text style={styles.textSendOTPAgain}>{timeResend}s</Text>
          </View>
        )}

        {otpCode.length > 5 ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleProcessOTP()}
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
