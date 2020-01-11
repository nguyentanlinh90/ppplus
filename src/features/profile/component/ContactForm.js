import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Picker,
} from 'react-native';

import stylesProfile from '../styles/styles';

export class BasicInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderIconArrow = () => {
    return (
      <Image
        resizeMode="contain"
        source={require('../../../assets/images/ic-picker.png')}
      />
    );
  };

  render() {
    const {onChangeText, contact} = this.props;

    return (
      <View style={{marginEnd: 16, marginStart: 16, paddingBottom: 20}}>
        <Text style={stylesProfile.txtTitleBasicInfo}>Địa chỉ</Text>
        <View style={stylesProfile.boxPickerBasicInfo}>
          <TextInput
            style={stylesProfile.txtInputBasicInfo}
            returnKeyType="done"
            value={contact}
            name="contact"
            placeholder="Nhập địa chỉ"
            onChangeText={text => onChangeText(text, 'contact')}
          />
        </View>
      </View>
    );
  }
}
export default BasicInfoForm;
