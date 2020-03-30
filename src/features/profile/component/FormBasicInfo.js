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
import {
  boxSelectStyle,
  txtInBoxSelectStyle,
  txtInputStyle,
  getNamesFromIds,
  checkIdInIds,
  getNameFromId,
  isEmpty,
  isZero,
} from '../../../utils/utils';

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

  render() {
    const {
      myScroll,
      handleScrollView,
      enableScrollViewScroll,
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

      showPicker,
      handleSelectGender,
      handleSelectProvinces,
      handleSelectMajors,
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
                  maxLength={100}
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
                  maxLength={100}
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
                <Text style={styles.txtTitleBasicInfo}>Năm sinh*</Text>
                <TouchableOpacity
                  onPress={() => showPicker()}
                  style={boxSelectStyle(!isEmpty(birthday))}>
                  <Text style={txtInBoxSelectStyle()}>
                    {' '}
                    {isEmpty(birthday) ? text_select : birthday}
                  </Text>
                  <ArrowUpDown />
                </TouchableOpacity>
              </View>
              <View style={styles.boxBasicInfo}>
                <Text style={styles.txtTitleBasicInfo}>Giới tính*</Text>
                <TouchableOpacity
                  onPress={() => this._setShowGender()}
                  style={boxSelectStyle(
                    !isZero(gender) || this.state.isShowListGender,
                  )}>
                  <Text style={txtInBoxSelectStyle()}>
                    {getNameFromId(gender, gender_list)}
                  </Text>
                  <ArrowUpDown />
                </TouchableOpacity>
                {this.state.isShowListGender ? (
                  <FlatList
                    style={styles.viewSelectFullHeight}
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
                    listKey={(item, index) => 'D' + index.toString()}
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
              <View
                onStartShouldSetResponderCapture={() => {
                  handleScrollView(false);
                  if (
                    myScroll.contentOffset === 0 &&
                    enableScrollViewScroll === false
                  ) {
                    handleScrollView(true);
                  }
                }}>
                <FlatList
                  style={styles.viewSelect}
                  data={province_list}
                  renderItem={({item: rowData}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          handleSelectProvinces(rowData.id.toString());
                        }}>
                        <View style={styles.infoBoxSelect}>
                          <Text style={styles.txtViewSelect}>
                            {rowData.name}
                          </Text>
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
                  listKey={(item, index) => 'D' + index.toString()}
                />
              </View>
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
                <View
                  onStartShouldSetResponderCapture={() => {
                    handleScrollView(false);
                    if (
                      myScroll.contentOffset === 0 &&
                      enableScrollViewScroll === false
                    ) {
                      handleScrollView(true);
                    }
                  }}>
                  <FlatList
                    style={styles.viewSelect}
                    data={major_list}
                    renderItem={({item: rowData}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            handleSelectMajors(rowData.id.toString());
                          }}>
                          <View style={styles.infoBoxSelect}>
                            <Text style={styles.txtViewSelect}>
                              {rowData.name}
                            </Text>
                            <CheckBox
                              disabled={true}
                              isChecked={checkIdInIds(
                                rowData.id,
                                working_majors,
                              )}
                              checkedImage={<CBChecked />}
                              unCheckedImage={<CBUnChecked />}
                            />
                          </View>
                          <View style={styles.lineSelect} />
                        </TouchableOpacity>
                      );
                    }}
                    listKey={(item, index) => 'D' + index.toString()}
                  />
                </View>
              ) : null}
            </View>
          </View>
        </CollapseBody>
      </Collapse>
    );
  }
}
