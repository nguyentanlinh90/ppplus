import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import CheckBox from 'react-native-check-box';
import CBChecked from '../../../components/CBChecked';
import CBUnChecked from '../../../components/CBUnChecked';
import ArrowUpDown from '../../../components/ArrowUpDown';
import ArrowUp from '../../../components/ArrowUp';
import ArrowDown from '../../../components/ArrowDown';
import styles from '../styles/styles';
import {text_select} from '../../../utils/constants';
import {getNamesFromIds, checkIdInIds} from '../../../utils/utils';

import {
  boxSelectStyle,
  txtInBoxSelectStyle,
  txtInputStyle,
} from '../../../utils/utils';

const listIndustry = [
  {
    id: '1',
    name: 'Bia, rượu, thuốc lá',
  },
  {
    id: '2',
    name: 'Sữa',
  },
  {
    id: '3',
    name: 'Chăm sóc cá nhân',
  },
  {
    id: '4',
    name: 'Điện tử tiêu dùng',
  },
  {
    id: '5',
    name: 'Thức uống giải khát',
  },
  {
    id: '6',
    name: 'Thực phẩm đóng gói',
  },
];
export default class FormBasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      isShowListGender: false,
      isShowProvince: false,
      isShowMajor: false,
    };
  }

  _setShowGender = () => {
    this.setState({
      isShowListGender: !this.state.isShowListGender,
    });
  };

  _getNameGenderFromId = (id, list) => {
    var name = text_select;
    for (var i = 0; i < list.length; i++) {
      if (id == list[i].id) {
        name = list[i].name;
      }
    }
    return name;
  };

  render() {
    const {
      onChangeText,

      gender_list,
      province_list,
      major_list,

      last_name,
      first_name,
      birthday,
      gender,
      height,
      weight,
      working_places,
      working_majors,

      showDateTimePicker,
      handleSelectGender,
      handleSelectProvince,
      handleSelectMajor,
    } = this.props;

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
            <View style={styles.groupContainer}>
              <View style={styles.boxBasicInfo}>
                <Text style={styles.txtTitleBasicInfo}>Họ và tên đệm*</Text>
                <TextInput
                  style={txtInputStyle(last_name)}
                  returnKeyType="done"
                  value={last_name}
                  name="last_name"
                  placeholder="Nhập họ và tên đệm"
                  onChangeText={text => onChangeText(text, 'last_name')}
                />
              </View>
              <View style={styles.boxBasicInfo}>
                <Text style={styles.txtTitleBasicInfo}>Tên*</Text>
                <TextInput
                  style={txtInputStyle(first_name)}
                  returnKeyType="done"
                  value={first_name}
                  name="first_name"
                  placeholder="Nhập tên"
                  onChangeText={text => onChangeText(text, 'first_name')}
                />
              </View>
            </View>
            <View style={styles.groupContainer}>
              <View
                style={[
                  styles.boxBasicInfo,
                  {height: this.state.isShowListGender ? 80 : null},
                ]}>
                <Text style={styles.txtTitleBasicInfo}>
                  Ngày tháng năm sinh*
                </Text>
                <TouchableOpacity
                  onPress={() => showDateTimePicker()}
                  style={boxSelectStyle(!birthday.includes(text_select))}>
                  <Text style={txtInBoxSelectStyle(birthday)}>{birthday}</Text>
                  <ArrowUpDown />
                </TouchableOpacity>
              </View>
              <View style={styles.boxBasicInfo}>
                <Text style={styles.txtTitleBasicInfo}>Giới tính*</Text>
                <TouchableOpacity
                  onPress={() => this._setShowGender()}
                  style={boxSelectStyle(
                    gender != 0 || this.state.isShowListGender,
                  )}>
                  <Text style={txtInBoxSelectStyle(gender)}>
                    {this._getNameGenderFromId(gender, gender_list)}
                  </Text>
                  <ArrowUpDown />
                </TouchableOpacity>
                {this.state.isShowListGender ? (
                  <FlatList
                    visibility={this.state.isShowListGender}
                    style={styles.viewSelectGender}
                    data={gender_list}
                    renderItem={({item: rowData}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this._setShowGender();
                            handleSelectGender(rowData.id);
                          }}>
                          <View style={styles.infoBoxSelect}>
                            <Text style={styles.txtViewSelect}>
                              {rowData.name}
                            </Text>
                          </View>
                          <View style={styles.lineSelect} />
                        </TouchableOpacity>
                      );
                    }}
                    keyExtractor={(item, index) => index}
                  />
                ) : null}
              </View>
            </View>
            <View style={styles.groupContainer}>
              <View style={styles.boxBasicInfo}>
                <Text style={styles.txtTitleBasicInfo}>Chiều cao (cm)*</Text>
                <TextInput
                  style={txtInputStyle(height)}
                  returnKeyType="done"
                  value={height ? height.toString() : height}
                  name="height"
                  placeholder="Nhập chiều cao"
                  keyboardType="numeric"
                  onChangeText={text => onChangeText(text, 'height')}
                />
              </View>
              <View style={styles.boxBasicInfo}>
                <Text style={styles.txtTitleBasicInfo}>Cân nặng (kg)*</Text>
                <TextInput
                  style={txtInputStyle(weight)}
                  returnKeyType="done"
                  value={weight ? weight.toString() : weight}
                  name="weight"
                  placeholder="Nhập cân nặng"
                  keyboardType="numeric"
                  onChangeText={text => onChangeText(text, 'weight')}
                />
              </View>
            </View>
            <Text style={styles.txtTitleBasicInfo}>
              Địa điểm làm việc mong muốn
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({isShowProvince: !this.state.isShowProvince});
              }}
              style={boxSelectStyle(
                this.state.isShowProvince || working_places.length != 0,
              )}>
              <Text style={styles.txtSelectStyle}>
                {getNamesFromIds(working_places, province_list)}
              </Text>
              <ArrowUpDown />
            </TouchableOpacity>
            {this.state.isShowProvince ? (
              <FlatList
                visibility={this.state.isShowProvince}
                style={styles.viewSelect}
                data={province_list}
                renderItem={({item: rowData}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        handleSelectProvince(rowData.id.toString());
                      }}>
                      <View style={styles.infoBoxSelect}>
                        <Text style={styles.txtViewSelect}>{rowData.name}</Text>
                        <CheckBox
                          disabled={true}
                          isChecked={checkIdInIds(rowData.id, working_places)}
                          checkedImage={<CBChecked />}
                          unCheckedImage={<CBUnChecked />}
                        />
                      </View>
                      <View style={styles.lineSelect} />
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => index}
              />
            ) : null}
            <Text style={[styles.txtTitleBasicInfo, {marginTop: 20}]}>
              Nhóm ngành
            </Text>
            <View style={{marginBottom: 20}}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({isShowMajor: !this.state.isShowMajor});
                }}
                style={boxSelectStyle(
                  this.state.isShowMajor || working_majors.length != 0,
                )}>
                <Text style={styles.txtSelectStyle}>
                  {getNamesFromIds(working_majors, major_list)}
                </Text>
                <ArrowUpDown />
              </TouchableOpacity>
              {this.state.isShowMajor ? (
                <FlatList
                  visibility={this.state.isShowProvince}
                  style={styles.viewSelect}
                  data={major_list}
                  renderItem={({item: rowData}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          handleSelectMajor(rowData.id.toString());
                        }}>
                        <View style={styles.infoBoxSelect}>
                          <Text style={styles.txtViewSelect}>
                            {rowData.name}
                          </Text>
                          <CheckBox
                            disabled={true}
                            isChecked={checkIdInIds(rowData.id, working_majors)}
                            checkedImage={<CBChecked />}
                            unCheckedImage={<CBUnChecked />}
                          />
                        </View>
                        <View style={styles.lineSelect} />
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => index}
                />
              ) : null}
            </View>
          </View>
        </CollapseBody>
      </Collapse>
    );
  }
}
