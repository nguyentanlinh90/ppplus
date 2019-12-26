import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styleUser from '../styles/styles';
import LinearGradient from 'react-native-linear-gradient';

export class InputPhoneNumberForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {onChangeText, handleInputPhoneNumber, phoneNumber} = this.props;
    return (
      <View>
        <Text style={styleUser.txtCreateAccount}>Số điện thoại</Text>
        <View style={[styleUser.groupInput, {marginBottom: 14}]}>
          <TextInput
            style={styleUser.inputLogin}
            returnKeyType="go"
            value={phoneNumber}
            name="phoneNumber"
            placeholder="Nhập số điện thoại"
            onChangeText={text => onChangeText(text, 'phoneNumber')}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleInputPhoneNumber()}>
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
export default InputPhoneNumberForm;
