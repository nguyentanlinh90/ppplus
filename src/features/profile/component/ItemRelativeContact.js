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
export default class ItemRelativeContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowProvinceRelative: false,
      isShowDistrictRelative: false,
    };
  }

  _setShowProvince = () => {
    this.setState({
      isShowProvinceRelative: !this.state.isShowProvinceRelative,
    });
  };

  _setShowDistrict = () => {
    this.setState({
      isShowDistrictRelative: !this.state.isShowDistrictRelative,
    });
  };
  render() {
    const {
      myScroll,
      handleScrollView,
      enableScrollViewScroll,
      onChangeTextRelative,

      province_list,
      district_list_follow_province_relative,

      item,

      handleSelectProvinceRelative,
      handleSelectDistrictRelative,
    } = this.props;

    return (
      <View style={{marginBottom: 20}}>
        <TextInput
          style={[txtInputStyle(item.relative_name), {marginBottom: 10}]}
          returnKeyType="done"
          value={item.relative_name}
          name="relative_name"
          placeholder="Nhập tên người thân"
          onChangeText={text =>
            onChangeTextRelative(item.relative_id, text, 'relative_name')
          }
        />
        <TextInput
          style={[txtInputStyle(item.relative_phone), {marginBottom: 10}]}
          returnKeyType="done"
          keyboardType="phone-pad"
          value={item.relative_phone}
          name="relative_phone"
          placeholder="Nhập số điện thoại người thân"
          onChangeText={text =>
            onChangeTextRelative(item.relative_id, text, 'relative_phone')
          }
        />
        <View style={{marginBottom: 10, marginTop: 10, flexDirection: 'row'}}>
          <Text style={styles.txtTitleBasicInfo}>Tỉnh / Thành Phố: </Text>
          <View style={{flex: 1, marginStart: 10}}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  isShowProvinceRelative: !this.state.isShowProvinceRelative,
                });
              }}
              style={boxSelectStyle(
                this.state.isShowProvinceRelative ||
                  !isEmpty(item.relative_province_id),
              )}>
              <Text style={styles.txtSelectStyle}>
                {getNameFromId(item.relative_province_id, province_list)}
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
                          handleSelectProvinceRelative(
                            item.relative_id,
                            rowData.id,
                          );
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
        <View style={{marginBottom: 10, marginTop: 10, flexDirection: 'row'}}>
          <Text style={styles.txtTitleBasicInfo}>Quận / Huyện: </Text>
          <View style={{flex: 1, marginStart: 10}}>
            <TouchableOpacity
              onPress={() => {
                if (
                  getNameFromId(item.relative_province_id, province_list) ==
                  text_select
                ) {
                  showAlert('Bạn chưa chọn Tỉnh / Thành Phố');
                } else {
                  this._setShowDistrict(false);
                }
              }}
              style={boxSelectStyle(
                this.state.isShowDistrictRelative ||
                  !isEmpty(item.relative_district_id),
              )}>
              <Text style={styles.txtSelectStyle}>
                {getDistrictNameFromId(
                  item.relative_district_id,
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
                          handleSelectDistrictRelative(
                            item.relative_id,
                            rowData.id,
                          );
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
          style={txtInputStyle(item.relative_address)}
          returnKeyType="done"
          value={item.relative_address}
          name="relative_address"
          placeholder="Nhập số nhà, tên đường và phường / xã"
          onChangeText={text =>
            onChangeTextRelative(item.relative_id, text, 'relative_address')
          }
        />
      </View>
    );
  }
}
