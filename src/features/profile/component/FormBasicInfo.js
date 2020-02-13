import React, {Component} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import ArrowUpDown from '../../../components/ArrowUpDown';
import ArrowUp from '../../../components/ArrowUp';
import ArrowDown from '../../../components/ArrowDown';
import styles from '../styles/styles';

export default class FormBasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
  }

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
      <Collapse
        isCollapsed={this.state.isCollapsed}
        onToggle={isCollapsed => this.setState({isCollapsed: isCollapsed})}>
        <CollapseHeader>
          <View style={styles.boxTitleFill}>
            <Text style={styles.txtBasicInfo}>THÔNG TIN CƠ BẢN</Text>
            <View style={styles.boxArrow}>
              {this.state.isCollapsed ? <ArrowUp /> : <ArrowDown />}
            </View>
          </View>
        </CollapseHeader>
        <CollapseBody>
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
                    <ArrowUpDown />
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
                    <ArrowUpDown />
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
                </View>
              </View>
            </View>
            <Text style={styles.txtTitleBasicInfo}>Số đo 3 vòng</Text>
            <View style={styles.containerBasicInfo}>
              <View
                style={[styles.boxPickerBasicInfo, {flex: 1, marginEnd: 10}]}>
                <TextInput
                  style={styles.txtInputBasicInfo}
                  returnKeyType="next"
                  value={measure_1}
                  name="measure_1"
                  placeholder="Vòng 1"
                  keyboardType="numeric"
                  onChangeText={text => onChangeText(text, 'measure_1')}
                />
                <ArrowUpDown />
              </View>
              <View
                style={[styles.boxPickerBasicInfo, {flex: 1, marginEnd: 10}]}>
                <TextInput
                  style={styles.txtInputBasicInfo}
                  returnKeyType="next"
                  value={measure_2}
                  name="measure_2"
                  placeholder="Vòng 2"
                  keyboardType="numeric"
                  onChangeText={text => onChangeText(text, 'measure_2')}
                />
                <ArrowUpDown />
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
                <ArrowUpDown />
              </View>
            </View>
          </View>
        </CollapseBody>
      </Collapse>
    );
  }
}
