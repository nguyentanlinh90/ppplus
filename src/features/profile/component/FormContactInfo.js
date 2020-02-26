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
} from '../../../utils/utils';
export default class FormContactInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false,
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
      onChangeText,

      province_list,
      district_list_follow_province,
      district_list_follow_province_relative,

      province_id,
      district_id,
      address,
      name_relative,
      phone_relative,
      province_id_relative,
      district_id_relative,
      address_relative,

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
                    this.state.isShowProvince || province_id != '',
                  )}>
                  <Text style={styles.txtSelectStyle}>
                    {getNameFromId(province_id, province_list)}
                  </Text>
                  <ArrowUpDown />
                </TouchableOpacity>
                {this.state.isShowProvince ? (
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
                    this.state.isShowDistrict || district_id != '',
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
                ) : null}
              </View>
            </View>

            <TextInput
              style={[txtInputStyle(address), {marginBottom: 10}]}
              returnKeyType="done"
              value={address}
              name="address"
              placeholder="Nhập số nhà và tên đường"
              onChangeText={text => onChangeText(text, 'address')}
            />
            <Text style={styles.txtTitleBasicInfo}>
              Liên hệ trong trường hợp khẩn cấp*
            </Text>
            <TextInput
              style={[txtInputStyle(name_relative), {marginBottom: 10}]}
              returnKeyType="done"
              value={name_relative}
              name="name_relative"
              placeholder="Nhập tên người thân"
              onChangeText={text => onChangeText(text, 'name_relative')}
            />
            <TextInput
              style={[txtInputStyle(phone_relative), {marginBottom: 10}]}
              returnKeyType="done"
              keyboardType="phone-pad"
              value={phone_relative}
              name="phone_relative"
              placeholder="Nhập số điện thoại người thân"
              onChangeText={text => onChangeText(text, 'phone_relative')}
            />
             <View
              style={{marginBottom: 10, marginTop: 10, flexDirection: 'row'}}>
              <Text style={styles.txtTitleBasicInfo}>Tỉnh / Thành Phố: </Text>
              <View style={{flex: 1, marginStart: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({isShowProvinceRelative: !this.state.isShowProvinceRelative});
                  }}
                  style={boxSelectStyle(
                    this.state.isShowProvinceRelative || province_id_relative != '',
                  )}>
                  <Text style={styles.txtSelectStyle}>
                    {getNameFromId(province_id_relative, province_list)}
                  </Text>
                  <ArrowUpDown />
                </TouchableOpacity>
                {this.state.isShowProvinceRelative ? (
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
                      getNameFromId(province_id_relative, province_list) == text_select
                    ) {
                      showAlert('Bạn chưa chọn Tỉnh / Thành Phố');
                    } else {
                      this._setShowDistrict(false);
                    }
                  }}
                  style={boxSelectStyle(
                    this.state.isShowDistrictRelative || district_id_relative != '',
                  )}>
                  <Text style={styles.txtSelectStyle}>
                    {/* {getDistrictNameFromId(
                      district_id_relative,
                      district_list_follow_province_relative,
                    )} */}
                  </Text>
                  <ArrowUpDown />
                </TouchableOpacity>
                {this.state.isShowDistrictRelative ? (
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
                ) : null}
              </View>
            </View> 
            <TextInput
              style={txtInputStyle(address_relative)}
              returnKeyType="done"
              value={address_relative}
              name="address_relative"
              placeholder="Nhập số nhà và tên đường người thân"
              onChangeText={text => onChangeText(text, 'address_relative')}
            />
          </View>
        </CollapseBody>
      </Collapse>
    );
  }
}
