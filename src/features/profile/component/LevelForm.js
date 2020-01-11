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
    const {onChangeText, showLevelSelect, txtLevel, major} = this.props;
    let level = '';
    if (txtLevel == 0) {
      level = 'Trung Học Cơ Sở';
    } else if (txtLevel == 1) {
      level = 'Trung Học Phổ Thông';
    } else if (txtLevel == 2) {
      level = 'Trung Cấp';
    } else if (txtLevel == 3) {
      level = 'Cao Đẳng';
    } else if (txtLevel == 4) {
      level = 'Đại Học';
    } else {
      level = 'Chọn trình độ';
    }

    return (
      <View style={{marginEnd: 16, marginStart: 16, paddingBottom:20}}>
          <Text style={stylesProfile.txtTitleBasicInfo}>Học vấn</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => showLevelSelect()}>
            <View
              style={
                stylesProfile.boxPickerBasicInfo}>
              <Text style={[stylesProfile.txtPicker, {color: '#757575'}]}>
                {level}
              </Text>
              {this._renderIconArrow()}
            </View>
          </TouchableOpacity>
          <Text style={[stylesProfile.txtTitleBasicInfo,{marginTop:20}]}>Chuyên ngành</Text>
          <View
              style={stylesProfile.boxPickerBasicInfo}>
              <TextInput
                style={stylesProfile.txtInputBasicInfo}
                returnKeyType="done"
                value={major}
                name="major"
                placeholder="Nhập chuyên ngành"
                onChangeText={text => onChangeText(text, 'major')}
              />
            </View>
      </View>
    );
  }
}
export default BasicInfoForm;
