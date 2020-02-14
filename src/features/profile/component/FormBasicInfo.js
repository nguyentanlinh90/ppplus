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
const listCity = require('../../../assets/json/city.json');
import {text_select} from '../../../utils/constants';
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
      isShowListPlace: false,
      isShowListIndustry: false,
    };
  }

  render() {
    const {
      onChangeText,
      lastName,
      firstName,
      showDateTimePicker,
      txtDOB,
      showSelectGender,
      txtGender,
      height,
      weight,
      selectCity,
      city,
      selectIndustry,
      industry,
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
            <View style={styles.groupContainer}>
              <View style={styles.boxBasicInfo}>
                <Text style={styles.txtTitleBasicInfo}>Họ và tên đệm*</Text>
                <TextInput
                  style={txtInputStyle(lastName)}
                  returnKeyType="done"
                  value={lastName}
                  name="lastName"
                  placeholder="Nhập họ và tên đệm"
                  onChangeText={text => onChangeText(text, 'lastName')}
                />
              </View>
              <View style={styles.boxBasicInfo}>
                <Text style={styles.txtTitleBasicInfo}>Tên*</Text>
                <TextInput
                  style={txtInputStyle(firstName)}
                  returnKeyType="done"
                  value={firstName}
                  name="firstName"
                  placeholder="Nhập tên"
                  onChangeText={text => onChangeText(text, 'firstName')}
                />
              </View>
            </View>
            <View style={styles.groupContainer}>
              <View style={styles.boxBasicInfo}>
                <Text style={styles.txtTitleBasicInfo}>
                  Ngày tháng năm sinh*
                </Text>
                <TouchableOpacity
                  onPress={() => showDateTimePicker()}
                  style={boxSelectStyle(!txtDOB.includes(text_select))}>
                  <Text style={txtInBoxSelectStyle(txtDOB)}>{txtDOB}</Text>
                  <ArrowUpDown />
                </TouchableOpacity>
              </View>
              <View style={styles.boxBasicInfo}>
                <Text style={styles.txtTitleBasicInfo}>Giới tính*</Text>
                <TouchableOpacity onPress={() => showSelectGender()}>
                  <View style={boxSelectStyle(!gender.includes(text_select))}>
                    <Text style={txtInBoxSelectStyle(gender)}>{gender}</Text>
                    <ArrowUpDown />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.groupContainer}>
              <View style={styles.boxBasicInfo}>
                <Text style={styles.txtTitleBasicInfo}>Chiều cao (cm)*</Text>
                <TextInput
                  style={txtInputStyle(height)}
                  returnKeyType="done"
                  value={height}
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
                  value={weight}
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
                this.setState({isShowListPlace: !this.state.isShowListPlace});
              }}
              style={boxSelectStyle(
                this.state.isShowListPlace || !city.includes(text_select),
              )}>
              <Text style={txtInBoxSelectStyle(city)}>{city}</Text>
              <ArrowUpDown />
            </TouchableOpacity>
            {this.state.isShowListPlace ? (
              <FlatList
                visibility={this.state.isShowListPlace}
                style={styles.boxSelect}
                data={listCity}
                renderItem={({item: rowData}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        selectCity(rowData.city);
                      }}>
                      <View style={styles.infoBoxSelect}>
                        <Text style={styles.txtViewSelect}>{rowData.city}</Text>
                        <CheckBox
                          isChecked={city.includes(rowData.city) ? true : false}
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
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  isShowListIndustry: !this.state.isShowListIndustry,
                });
              }}
              style={boxSelectStyle(
                this.state.isShowListIndustry ||
                  !industry.includes(text_select),
              )}>
              <Text style={txtInBoxSelectStyle(industry)}>{industry}</Text>
              <ArrowUpDown />
            </TouchableOpacity>
            {this.state.isShowListIndustry ? (
              <FlatList
                visibility={this.state.isShowListIndustry}
                style={styles.boxSelect}
                data={listIndustry}
                renderItem={({item: rowData}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        selectIndustry(rowData.name);
                      }}>
                      <View style={styles.infoBoxSelect}>
                        <Text style={styles.txtViewSelect}>{rowData.name}</Text>
                        <CheckBox
                          isChecked={
                            industry.includes(rowData.name) ? true : false
                          }
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
        </CollapseBody>
      </Collapse>
    );
  }
}
