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
        <View style={styles.containerBasicInfo}>
          <View style={styles.boxBasicInfo}>
            <Text style={styles.txtTitleBasicInfo}>Họ và tên đệm*</Text>
            <View style={styles.boxInputBasicInfo}>
              <TextInput
                style={styles.txtInputBasicInfo}
                returnKeyType="next"
                value={lastName}
                name="lastName"
                placeholder="Nhập họ và tên đệm"
                onChangeText={text => onChangeText(text, 'lastName')}
              />
            </View>
          </View>
          <View style={styles.boxBasicInfo}>
            <Text style={styles.txtTitleBasicInfo}>Tên*</Text>
            <View style={styles.boxInputBasicInfo}>
              <TextInput
                style={styles.txtInputBasicInfo}
                returnKeyType="next"
                value={firstName}
                name="firstName"
                placeholder="Nhập tên"
                onChangeText={text => onChangeText(text, 'firstName')}
              />
            </View>
          </View>
        </View>
        <View style={styles.containerBasicInfo}>
          <View style={styles.boxBasicInfo}>
            <Text style={styles.txtTitleBasicInfo}>
              Ngày tháng năm sinh*
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => showDateTimePicker()}>
              <View style={styles.boxPickerBasicInfo}>
                <Text style={[styles.txtPicker, {color: '#757575'}]}>
                  {txtDOB}
                </Text>
                {this._renderIconArrow()}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.boxBasicInfo}>
            <Text style={styles.txtTitleBasicInfo}>Giới tính*</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => showGenderSelect()}>
              <View style={styles.boxPickerBasicInfo}>
                <Text style={[styles.txtPicker, {color: '#757575'}]}>
                  {gender}
                </Text>
                {this._renderIconArrow()}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerBasicInfo}>
          <View style={styles.boxBasicInfo}>
            <Text style={styles.txtTitleBasicInfo}>Chiều cao (cm)*</Text>
            <View style={styles.boxPickerBasicInfo}>
              <TextInput
                style={styles.txtInputBasicInfo}
                returnKeyType="next"
                value={height}
                name="height"
                placeholder="Nhập chiều cao"
                keyboardType="numeric"
                onChangeText={text => onChangeText(text, 'height')}
              />
              {/* {this._renderIconArrow()} */}
            </View>
          </View>
          <View style={styles.boxBasicInfo}>
            <Text style={styles.txtTitleBasicInfo}>Cân nặng (kg)*</Text>
            <View style={styles.boxPickerBasicInfo}>
              <TextInput
                style={styles.txtInputBasicInfo}
                returnKeyType="next"
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
        <Text style={styles.txtTitleBasicInfo}>Số đo 3 vòng</Text>
        <View style={styles.containerBasicInfo}>
          <View
            style={[
              styles.boxPickerBasicInfo,
              {flex: 1, marginEnd: 10},
            ]}>
            <TextInput
              style={styles.txtInputBasicInfo}
              returnKeyType="next"
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
              styles.boxPickerBasicInfo,
              {flex: 1, marginEnd: 10},
            ]}>
            <TextInput
              style={styles.txtInputBasicInfo}
              returnKeyType="next"
              value={measure_2}
              name="measure_2"
              placeholder="Vòng 2"
              keyboardType="numeric"
              onChangeText={text => onChangeText(text, 'measure_2')}
            />
            {this._renderIconArrow()}
          </View>
          <View style={[styles.boxPickerBasicInfo, {flex: 1}]}>
            <TextInput
              style={styles.txtInputBasicInfo}
              returnKeyType="done"
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
