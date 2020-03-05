import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import ArrowUpDown from '../../../components/ArrowUpDown';
import ArrowUp from '../../../components/ArrowUp';
import ArrowDown from '../../../components/ArrowDown';
import styles from '../styles/styles';
import {ADDRESS_OF_RELATIVE} from '../../../utils/constants';
import {text_select} from '../../../utils/constants';
import {
  getNameFromId,
  getDistrictNameFromId,
  showAlert,
} from '../../../utils/utils';

import {
  boxSelectStyle,
  txtInBoxSelectStyle,
  txtInputStyle,
  isEmpty,
} from '../../../utils/utils';
export default class FormContactInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      isShowProvince: false,
      isShowProvinceRelative: false,
      isShowDistrict: false,
      isShowDistrictRelative: false,
    };
  }

  _setShowProvince = isUser => {
    if (isUser) {
      this.setState({
        isShowProvince: !this.state.isShowProvince,
      });
    } else {
      this.setState({
        isShowProvinceRelative: !this.state.isShowProvinceRelative,
      });
    }
  };

  _setShowDistrict = isUser => {
    if (isUser) {
      this.setState({
        isShowDistrict: !this.state.isShowDistrict,
      });
    } else {
      this.setState({
        isShowDistrictRelative: !this.state.isShowDistrictRelative,
      });
    }
  };
  render() {
    const {
      myScroll,
      handleScrollView,
      enableScrollViewScroll,
      onChangeText,

      province_list,
      district_list_follow_province,
      district_list_follow_province_relative,

      province_id,
      district_id,
      address,
      relative_name,
      relative_phone,
      relative_province_id,
      relative_district_id,
      relative_address,

      handleSelectProvince,
      handleSelectDistrict,
    } = this.props;

    return (
      <Collapse
        isCollapsed={this.state.isCollapsed}
        onToggle={isCollapsed => this.setState({isCollapsed: isCollapsed})}>
        <CollapseHeader>
          <View style={styles.boxTitleFill}>
            <Text style={styles.txtBasicInfo}>THÔNG TIN LIÊN LẠC</Text>
            <View style={styles.boxArrow}>
              {this.state.isCollapsed ? <ArrowUp /> : <ArrowDown />}
            </View>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={{marginEnd: 16, marginStart: 16, paddingBottom: 20}}>
            <Text style={styles.txtTitleBasicInfo}>Địa chỉ thường trú*</Text>
            <View
              style={{marginBottom: 10, marginTop: 10, flexDirection: 'row'}}>
              <Text style={styles.txtTitleBasicInfo}>Tỉnh / Thành Phố: </Text>
              <View style={{flex: 1, marginStart: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({isShowProvince: !this.state.isShowProvince});
                  }}
                  style={boxSelectStyle(
                    this.state.isShowProvince || !isEmpty(province_id),
                  )}>
                  <Text style={styles.txtSelectStyle}>
                    {getNameFromId(province_id, province_list)}
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
                              this._setShowProvince(true);
                              handleSelectProvince(true, rowData.id);
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
                  </View>
                ) : null}
              </View>
            </View>
            <View
              style={{marginBottom: 10, marginTop: 10, flexDirection: 'row'}}>
              <Text style={styles.txtTitleBasicInfo}>Quận / Huyện: </Text>
              <View style={{flex: 1, marginStart: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    if (
                      getNameFromId(province_id, province_list) == text_select
                    ) {
                      showAlert('Bạn chưa chọn Tỉnh / Thành Phố');
                    } else {
                      this._setShowDistrict(true);
                    }
                  }}
                  style={boxSelectStyle(
                    this.state.isShowDistrict || !isEmpty(district_id),
                  )}>
                  <Text style={styles.txtSelectStyle}>
                    {getDistrictNameFromId(
                      district_id,
                      district_list_follow_province,
                    )}
                  </Text>
                  <ArrowUpDown />
                </TouchableOpacity>
                {this.state.isShowDistrict ? (
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
                      data={district_list_follow_province}
                      renderItem={({item: rowData}) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              this._setShowDistrict(true);
                              handleSelectDistrict(true, rowData.id);
                            }}>
                            <View style={styles.infoBoxSelect}>
                              <Text style={styles.txtViewSelect}>
                                {rowData.prefix + ' ' + rowData.name}
                              </Text>
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
            </View>

            <TextInput
              style={[txtInputStyle(address), {marginBottom: 10}]}
              returnKeyType="done"
              value={address}
              name="address"
              placeholder="Nhập số nhà, tên đường và phường / xã"
              onChangeText={text => onChangeText(text, 'address')}
            />
            <Text style={styles.txtTitleBasicInfo}>
              Liên hệ trong trường hợp khẩn cấp*
            </Text>
            <TextInput
              style={[txtInputStyle(relative_name), {marginBottom: 10}]}
              returnKeyType="done"
              value={relative_name}
              name="relative_name"
              placeholder="Nhập tên người thân"
              onChangeText={text => onChangeText(text, 'relative_name')}
            />
            <TextInput
              style={[txtInputStyle(relative_phone), {marginBottom: 10}]}
              returnKeyType="done"
              keyboardType="phone-pad"
              value={relative_phone}
              name="relative_phone"
              placeholder="Nhập số điện thoại người thân"
              onChangeText={text => onChangeText(text, 'relative_phone')}
            />
            <View
              style={{marginBottom: 10, marginTop: 10, flexDirection: 'row'}}>
              <Text style={styles.txtTitleBasicInfo}>Tỉnh / Thành Phố: </Text>
              <View style={{flex: 1, marginStart: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      isShowProvinceRelative: !this.state
                        .isShowProvinceRelative,
                    });
                  }}
                  style={boxSelectStyle(
                    this.state.isShowProvinceRelative ||
                      !isEmpty(relative_province_id),
                  )}>
                  <Text style={styles.txtSelectStyle}>
                    {getNameFromId(relative_province_id, province_list)}
                  </Text>
                  <ArrowUpDown />
                </TouchableOpacity>
                {this.state.isShowProvinceRelative ? (
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
                              this._setShowProvince(false);
                              handleSelectProvince(false, rowData.id);
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
                  </View>
                ) : null}
              </View>
            </View>
            <View
              style={{marginBottom: 10, marginTop: 10, flexDirection: 'row'}}>
              <Text style={styles.txtTitleBasicInfo}>Quận / Huyện: </Text>
              <View style={{flex: 1, marginStart: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    if (
                      getNameFromId(relative_province_id, province_list) ==
                      text_select
                    ) {
                      showAlert('Bạn chưa chọn Tỉnh / Thành Phố');
                    } else {
                      this._setShowDistrict(false);
                    }
                  }}
                  style={boxSelectStyle(
                    this.state.isShowDistrictRelative ||
                      !isEmpty(relative_district_id),
                  )}>
                  <Text style={styles.txtSelectStyle}>
                    {getDistrictNameFromId(
                      relative_district_id,
                      district_list_follow_province_relative,
                    )}
                  </Text>
                  <ArrowUpDown />
                </TouchableOpacity>
                {this.state.isShowDistrictRelative ? (
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
                      data={district_list_follow_province_relative}
                      renderItem={({item: rowData}) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              this._setShowDistrict(false);
                              handleSelectDistrict(false, rowData.id);
                            }}>
                            <View style={styles.infoBoxSelect}>
                              <Text style={styles.txtViewSelect}>
                                {rowData.prefix + ' ' + rowData.name}
                              </Text>
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
            </View>
            <TextInput
              style={txtInputStyle(relative_address)}
              returnKeyType="done"
              value={relative_address}
              name="relative_address"
              placeholder="Nhập số nhà, tên đường và phường / xã"
              onChangeText={text => onChangeText(text, 'relative_address')}
            />
          </View>
        </CollapseBody>
      </Collapse>
    );
  }
}
