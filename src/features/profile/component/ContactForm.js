import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Picker,
} from 'react-native';

import styles from '../styles/styles';

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
        <Text style={styles.txtTitleBasicInfo}>Địa chỉ</Text>
        <View style={styles.boxPickerBasicInfo}>
          <TextInput
            style={styles.txtInputBasicInfo}
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
