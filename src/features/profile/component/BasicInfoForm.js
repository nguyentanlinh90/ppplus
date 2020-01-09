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
    const {
      onChangeText,
      lastName,
      firstName,
      showDateTimePicker,
      txtDOB,
      showGenderSelect,
      txtGender,
      height,
      weight,
      measure_1,
      measure_2,
      measure_3,
    } = this.props;
    let gender = '';
    if (txtGender == 0) {
      gender = 'Nam';
    } else if (txtGender == 1) {
      gender = 'Nữ';
    } else {
      gender = 'Chọn';
    }

    return (
      <View style={{marginEnd: 16, marginStart: 16}}>
        <View style={stylesProfile.containerBasicInfo}>
          <View style={stylesProfile.boxBasicInfo}>
            <Text style={stylesProfile.txtTitleBasicInfo}>Họ và tên đệm*</Text>
            <View style={stylesProfile.boxInputBasicInfo}>
              <TextInput
                style={stylesProfile.txtInputBasicInfo}
                returnKeyType="go"
                value={lastName}
                name="lastName"
                placeholder="Nhập họ và tên đệm"
                onChangeText={text => onChangeText(text, 'lastName')}
              />
            </View>
          </View>
          <View style={stylesProfile.boxBasicInfo}>
            <Text style={stylesProfile.txtTitleBasicInfo}>Tên*</Text>
            <View style={stylesProfile.boxInputBasicInfo}>
              <TextInput
                style={stylesProfile.txtInputBasicInfo}
                returnKeyType="go"
                value={firstName}
                name="firstName"
                placeholder="Nhập tên"
                onChangeText={text => onChangeText(text, 'firstName')}
              />
            </View>
          </View>
        </View>
        <View style={stylesProfile.containerBasicInfo}>
          <View style={stylesProfile.boxBasicInfo}>
            <Text style={stylesProfile.txtTitleBasicInfo}>
              Ngày tháng năm sinh*
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => showDateTimePicker()}>
              <View style={stylesProfile.boxPickerBasicInfo}>
                <Text style={[stylesProfile.txtPicker, {color: '#757575'}]}>
                  {txtDOB}
                </Text>
                {this._renderIconArrow()}
              </View>
            </TouchableOpacity>
          </View>
          <View style={stylesProfile.boxBasicInfo}>
            <Text style={stylesProfile.txtTitleBasicInfo}>Giới tính*</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => showGenderSelect()}>
              <View
                style={stylesProfile.boxPickerBasicInfo}>
                <Text style={[stylesProfile.txtPicker, {color: '#757575'}]}>
                  {gender}
                </Text>
                {this._renderIconArrow()}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={stylesProfile.containerBasicInfo}>
          <View style={stylesProfile.boxBasicInfo}>
            <Text style={stylesProfile.txtTitleBasicInfo}>Chiều cao (cm)*</Text>
            <View style={stylesProfile.boxPickerBasicInfo}>
              <TextInput
                style={stylesProfile.txtInputBasicInfo}
                returnKeyType="go"
                value={height}
                name="height"
                placeholder="Nhập chiều cao"
                keyboardType="numeric"
                onChangeText={text => onChangeText(text, 'height')}
              />
              {/* {this._renderIconArrow()} */}
            </View>
          </View>
          <View style={stylesProfile.boxBasicInfo}>
            <Text style={stylesProfile.txtTitleBasicInfo}>Cân nặng (kg)*</Text>
            <View
              style={stylesProfile.boxPickerBasicInfo}>
              <TextInput
                style={stylesProfile.txtInputBasicInfo}
                returnKeyType="go"
                value={weight}
                name="weight"
                placeholder="Nhập cân nặng"
                keyboardType="numeric"
                onChangeText={text => onChangeText(text, 'weight')}
              />
              {/* {this._renderIconArrow()} */}
            </View>
          </View>
        </View>
        <Text style={stylesProfile.txtTitleBasicInfo}>Số đo 3 vòng</Text>
        <View style={stylesProfile.containerBasicInfo}>
          <View
            style={[
              stylesProfile.boxPickerBasicInfo,
              {flex: 1, marginEnd: 10},
            ]}>
            <TextInput
              style={stylesProfile.txtInputBasicInfo}
              returnKeyType="go"
              value={measure_1}
              name="measure_1"
              placeholder="Vòng 1"
              keyboardType="numeric"
              onChangeText={text => onChangeText(text, 'measure_1')}
            />
            {this._renderIconArrow()}
          </View>
          <View
            style={[
              stylesProfile.boxPickerBasicInfo,
              {flex: 1, marginEnd: 10},
            ]}>
            <TextInput
              style={stylesProfile.txtInputBasicInfo}
              returnKeyType="go"
              value={measure_2}
              name="measure_2"
              placeholder="Vòng 2"
              keyboardType="numeric"
              onChangeText={text => onChangeText(text, 'measure_2')}
            />
            {this._renderIconArrow()}
          </View>
          <View style={[stylesProfile.boxPickerBasicInfo, {flex: 1}]}>
            <TextInput
              style={stylesProfile.txtInputBasicInfo}
              returnKeyType="go"
              value={measure_3}
              name="measure_3"
              placeholder="Vòng 3"
              keyboardType="numeric"
              onChangeText={text => onChangeText(text, 'measure_3')}
            />
            {this._renderIconArrow()}
          </View>
        </View>
      </View>
    );
  }
}
export default BasicInfoForm;
