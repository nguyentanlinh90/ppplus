import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import BgButton from '../../../components/BgButton';
import styles from '../styles/styles';
import CBChecked from '../../../components/CBChecked';
import CBUnChecked from '../../../components/CBUnChecked';
import RadioChecked from '../../../components/RadioChecked';
import RadioUnChecked from '../../../components/RadioUnChecked';
import ArrowUpDown from '../../../components/ArrowUpDown';
import {handleCheck} from '../../../utils/utils';
import {
  text_select,
  txt_address_select,
  txt_major_select,
  txt_day_select,
  txt_turn_select,
} from '../../../utils/constants';

export default class InfoContainer_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableScrollViewScroll: true,

      isShowProvince: false,
      isShowMajor: false,
      isShowDay: false,
      isShowTurn: false,
    };
  }

  varIndustryGroup = [];
  _boxSelectStyle = function(color) {
    return {
      width: '100%',
      borderColor: color,
      borderWidth: 1,
      borderRadius: 6,
      flexDirection: 'row',
      alignItems: 'center',
      paddingStart: 10,
      paddingEnd: 10,
    };
  };

  _getListName = (text_default, ids, list) => {
    var names = '';
    if (ids.length == 0) {
      names = text_default;
    } else {
      for (let i = 0; i < ids.length; i++) {
        for (let j = 0; j < list.length; j++) {
          if (ids[i] == list[j].id) {
            if (names == '') {
              names = list[j].name;
            } else {
              names = names + '; ' + list[j].name;
            }
          }
        }
      }
    }
    return names;
  };

  _setStateScrollView = isEnable => {
    this.setState({enableScrollViewScroll: isEnable});
  };

  _setStateFlatList = myScroll => {
    this._setStateScrollView(false);
    if (
      myScroll.contentOffset === 0 &&
      this.state.enableScrollViewScroll === false
    ) {
      this._setStateScrollView(true);
    }
  };

  render() {
    const {
      onChangeText,
      lastName,
      firstName,
      genderMale,
      genderFeMale,
      handleGenderSelect,
      showDateTimePicker,
      birthday,
      listProvince,
      handleSelectProvince,
      provinceIDs,
      listMajor,
      handleSelectMajor,
      majorIDs,
      listDay,
      handleSelectDay,
      dayIDs,
      listTurn,
      handleSelectTurn,
      turnIDs,
      handleUpdateBasicInfo,
    } = this.props;

    return (
      <View
        onStartShouldSetResponderCapture={() => {
          this._setStateScrollView(true);
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={this.state.enableScrollViewScroll}
          ref={myScroll => (this._myScroll = myScroll)}>
          <Text style={styles.title}>
            Hãy cho chúng tôi biết thêm về bạn, PP+ sẽ cung cấp công việc phù
            hợp với bạn!
          </Text>
          <View style={styles.viewFill}>
            <Text style={styles.titleContent}>1. Họ và tên</Text>
            <View style={styles.flexRow}>
              <View style={[styles.boxInput, {marginEnd: 10}]}>
                <TextInput
                  maxLength={100}
                  numberOfLines={1}
                  style={styles.txtInput}
                  returnKeyType="done"
                  value={lastName}
                  name="lastName"
                  placeholder="Nhập họ và tên đệm"
                  onChangeText={text => onChangeText(text, 'lastName')}
                />
              </View>
              <View style={styles.boxInput}>
                <TextInput
                  maxLength={100}
                  numberOfLines={1}
                  style={styles.txtInput}
                  returnKeyType="done"
                  value={firstName}
                  name="firstName"
                  placeholder="Nhập tên"
                  onChangeText={text => onChangeText(text, 'firstName')}
                />
              </View>
            </View>
            <Text style={styles.titleContent}>2. Giới tính</Text>
            <View style={styles.flexRow}>
              <View style={styles.containerCheckBox}>
                <CheckBox
                  style={styles.checkbox}
                  onClick={() => handleGenderSelect(true, !genderMale)}
                  isChecked={genderMale}
                  rightText={'Nam'}
                  checkedImage={<RadioChecked />}
                  unCheckedImage={<RadioUnChecked />}
                />
              </View>
              <View style={styles.containerCheckBox}>
                <CheckBox
                  style={styles.checkbox}
                  onClick={() => handleGenderSelect(false, !genderFeMale)}
                  isChecked={genderFeMale}
                  rightText={'Nữ'}
                  checkedImage={<RadioChecked />}
                  unCheckedImage={<RadioUnChecked />}
                />
              </View>
            </View>
            <Text style={styles.titleContent}>3. Ngày tháng năm sinh</Text>
            <TouchableOpacity
              onPress={() => showDateTimePicker()}
              style={styles.boxInfoItem}>
              <Text style={styles.txtSelect}>{birthday}</Text>
              {<ArrowUpDown />}
            </TouchableOpacity>

            <Text style={styles.titleContent}>4. Địa điểm làm việc</Text>
            <TouchableOpacity
              onPress={() =>
                this.setState({isShowProvince: !this.state.isShowProvince})
              }>
              <View
                style={this._boxSelectStyle(
                  this.state.isShowProvince ? '#F0532D' : '#d8d8d8',
                )}>
                <Text style={styles.txtSelect}>
                  {this._getListName(
                    txt_address_select,
                    provinceIDs,
                    listProvince,
                  )}
                </Text>
                {<ArrowUpDown />}
              </View>
            </TouchableOpacity>
            {this.state.isShowProvince ? (
              <View
                onStartShouldSetResponderCapture={() => {
                  this._setStateFlatList(this._myScroll);
                }}>
                <FlatList
                  visibility={this.state.isShowProvince}
                  style={styles.viewSelect}
                  data={listProvince}
                  renderItem={({item: rowData}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          handleSelectProvince(rowData.id);
                        }}>
                        <View style={styles.infoBoxSelect}>
                          <Text style={styles.txtViewSelect}>
                            {rowData.name}
                          </Text>
                          <CheckBox
                            isChecked={
                              handleCheck(rowData.id, provinceIDs)
                                ? true
                                : false
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
              </View>
            ) : null}

            <Text style={styles.titleContent}>5. Nhóm ngành</Text>
            <TouchableOpacity
              onPress={() =>
                this.setState({isShowMajor: !this.state.isShowMajor})
              }>
              <View
                style={this._boxSelectStyle(
                  this.state.isShowMajor ? '#F0532D' : '#d8d8d8',
                )}>
                <Text style={styles.txtSelect}>
                  {this._getListName(txt_major_select, majorIDs, listMajor)}
                </Text>
                {<ArrowUpDown />}
              </View>
            </TouchableOpacity>
            {this.state.isShowMajor ? (
              <View
                onStartShouldSetResponderCapture={() => {
                  this._setStateFlatList(this._myScroll);
                }}>
                <FlatList
                  visibility={this.state.isShowMajor}
                  style={styles.viewSelect}
                  data={listMajor}
                  renderItem={({item: rowData}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          handleSelectMajor(rowData.id);
                        }}>
                        <View style={styles.infoBoxSelect}>
                          <Text style={styles.txtViewSelect}>
                            {rowData.name}
                          </Text>

                          <CheckBox
                            disabled={true}
                            isChecked={
                              handleCheck(rowData.id, majorIDs) ? true : false
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
              </View>
            ) : null}

            <Text style={styles.titleContent}>6. Thời lượng công việc</Text>
            <View style={{marginBottom: 10}}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({isShowDay: !this.state.isShowDay})
                }>
                <View
                  style={this._boxSelectStyle(
                    this.state.isShowDay ? '#F0532D' : '#d8d8d8',
                  )}>
                  <Text style={styles.txtSelect}>
                    {this._getListName(txt_day_select, dayIDs, listDay)}
                  </Text>
                  {<ArrowUpDown />}
                </View>
              </TouchableOpacity>
              {this.state.isShowDay ? (
                <View
                  onStartShouldSetResponderCapture={() => {
                    this._setStateFlatList(this._myScroll);
                  }}>
                  <FlatList
                    visibility={this.state.isShowDay}
                    style={styles.viewSelect}
                    data={listDay}
                    renderItem={({item: rowData}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            handleSelectDay(rowData.id);
                          }}>
                          <View style={styles.infoBoxSelect}>
                            <Text style={styles.txtViewSelect}>
                              {rowData.name}
                            </Text>

                            <CheckBox
                              disabled={true}
                              isChecked={
                                handleCheck(rowData.id, dayIDs) ? true : false
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
                </View>
              ) : null}
            </View>
            <TouchableOpacity
              onPress={() =>
                this.setState({isShowTurn: !this.state.isShowTurn})
              }>
              <View
                style={this._boxSelectStyle(
                  this.state.isShowTurn ? '#F0532D' : '#d8d8d8',
                )}>
                <Text style={styles.txtSelect}>
                  {this._getListName(txt_turn_select, turnIDs, listTurn)}
                </Text>
                {<ArrowUpDown />}
              </View>
            </TouchableOpacity>
            {this.state.isShowTurn ? (
              <View
                onStartShouldSetResponderCapture={() => {
                  this._setStateFlatList(this._myScroll);
                }}>
                <FlatList
                  visibility={this.state.isShowTurn}
                  style={styles.viewSelect}
                  data={listTurn}
                  renderItem={({item: rowData}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          handleSelectTurn(rowData.id);
                        }}>
                        <View style={styles.infoBoxSelect}>
                          <Text style={styles.txtViewSelect}>
                            {rowData.name}
                          </Text>

                          <CheckBox
                            disabled={true}
                            isChecked={
                              handleCheck(rowData.id, turnIDs) ? true : false
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
              </View>
            ) : null}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleUpdateBasicInfo()}
              style={styles.buttonContinue}>
              <BgButton />

              <Text style={styles.txtDone}>Hoàn Thành</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
