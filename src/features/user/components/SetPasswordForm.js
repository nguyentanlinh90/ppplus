import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styleUser from '../styles/styles';
import LinearGradient from 'react-native-linear-gradient';

export class SetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {onChangeText, handleSetPassword, password} = this.props;
    return (
      <View>
        <Text style={styleUser.txtCreateAccount}>Đặt mật khẩu</Text>
        <View style={[styleUser.groupInput, {marginBottom: 14}]}>
          <TextInput
            style={styleUser.inputLogin}
            returnKeyType="go"
            value={password}
            name="password"
            placeholder="Nhập mật khẩu"
            onChangeText={text => onChangeText(text, 'password')}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleSetPassword()}>
          <LinearGradient
            colors={['#F0532D', '#FEBE10']}
            useAngle={true}
            angle={-90}
            style={styleUser.buttonContinue}>
            <Text style={styleUser.buttonText}>Hoàn Thành</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}
export default SetPasswordForm;
