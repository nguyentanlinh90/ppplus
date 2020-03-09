import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import ArrowUpDown from '../../../components/ArrowUpDown';
import ArrowUp from '../../../components/ArrowUp';
import ArrowDown from '../../../components/ArrowDown';
import ItemRelativeContact from '../component/ItemRelativeContact';
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
      isShowDistrict: false,
    };
  }

  _setShowProvince = () => {
    this.setState({
      isShowProvince: !this.state.isShowProvince,
    });
  };

  _setShowDistrict = () => {
    this.setState({
      isShowDistrict: !this.state.isShowDistrict,
    });
  };
  render() {
    const {
      myScroll,
      handleScrollView,
      enableScrollViewScroll,
      onChangeText,
      onChangeTextRelative,

      province_list,
      district_list_follow_province,
      district_list_follow_province_relative,

      //for user
      province_id,
      district_id,
      address,

      //for relative
      user_relative_info,

      handleSelectProvince,
      handleSelectDistrict,

      handleSelectProvinceRelative,
      handleSelectDistrictRelative,
      handleAddInfoRelativeItem,
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
                              this._setShowProvince();
                              handleSelectProvince(rowData.id);
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
                      this._setShowDistrict();
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
                              this._setShowDistrict();
                              handleSelectDistrict(rowData.id);
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

            <FlatList
              style={{width: '100%'}}
              data={user_relative_info}
              renderItem={({item: rowData, index}) => {
                return (
                  <ItemRelativeContact
                    myScroll={myScroll}
                    handleScrollView={handleScrollView}
                    enableScrollViewScroll={enableScrollViewScroll}
                    onChangeTextRelative={onChangeTextRelative}
                    province_list={province_list}
                    district_list_follow_province_relative={
                      district_list_follow_province_relative
                    }
                    index ={index}
                    item={rowData}
                    handleSelectProvinceRelative={handleSelectProvinceRelative}
                    handleSelectDistrictRelative={handleSelectDistrictRelative}
                  />
                );
              }}
              keyExtractor={(item, index) => index}
            />
            {user_relative_info.length < 2 ? (
              <TouchableOpacity onPress={() => handleAddInfoRelativeItem()}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/images/ic-add-circle.png')}
                    style={{width: 20, height: 20, marginEnd: 5}}
                  />
                  <Text style={{fontSize: 14, color: '#c7c7c7'}}>
                    Thêm thông tin người thân
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </CollapseBody>
      </Collapse>
    );
  }
}
