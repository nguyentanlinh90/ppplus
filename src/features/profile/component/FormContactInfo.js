import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
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
  boxSelectStyle,
  txtInBoxSelectStyle,
  txtInputStyle,
} from '../../../utils/utils';
export default class FormContactInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
  }

  render() {
    const {
      onChangeText,
      showSelectCity,
      showSelectDistrict,
      valueCity,
      valueCityRelative,
      valueDistrict,
      valueDistrictRelative,
      address,
      nameRelative,
      phoneRelative,
      addressRelative
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
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <TouchableOpacity
                style={[
                  boxSelectStyle(valueCity != text_select),
                  {marginEnd: 10},
                ]}
                onPress={() => showSelectCity(!ADDRESS_OF_RELATIVE)}>
                <Text style={txtInBoxSelectStyle(valueCity)}>{valueCity}</Text>
                <ArrowUpDown />
              </TouchableOpacity>
              <TouchableOpacity
                style={boxSelectStyle(valueDistrict != text_select)}
                onPress={() => showSelectDistrict(!ADDRESS_OF_RELATIVE)}>
                <Text style={txtInBoxSelectStyle(valueDistrict)}>
                  {valueDistrict}
                </Text>
                <ArrowUpDown />
              </TouchableOpacity>
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
              style={[txtInputStyle(nameRelative), {marginBottom: 10}]}
              returnKeyType="done"
              value={nameRelative}
              name="nameRelative"
              placeholder="Nhập tên người thân"
              onChangeText={text => onChangeText(text, 'nameRelative')}
            />
            <TextInput
              style={[txtInputStyle(phoneRelative), {marginBottom: 10}]}
              returnKeyType="done"
              keyboardType="phone-pad"
              value={phoneRelative}
              name="phoneRelative"
              placeholder="Nhập số điện thoại người thân"
              onChangeText={text => onChangeText(text, 'phoneRelative')}
            />
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <TouchableOpacity
                style={[
                  boxSelectStyle(valueCityRelative != text_select),
                  {marginEnd: 10},
                ]}
                onPress={() => showSelectCity(ADDRESS_OF_RELATIVE)}>
                <Text style={txtInBoxSelectStyle(valueCityRelative)}>
                  {valueCityRelative}
                </Text>
                <ArrowUpDown />
              </TouchableOpacity>
              <TouchableOpacity
                style={boxSelectStyle(valueDistrictRelative != text_select)}
                onPress={() => showSelectDistrict(ADDRESS_OF_RELATIVE)}>
                <Text style={txtInBoxSelectStyle(valueDistrictRelative)}>
                  {valueDistrictRelative}
                </Text>
                <ArrowUpDown />
              </TouchableOpacity>
            </View>
            <TextInput
              style={txtInputStyle(addressRelative)}
              returnKeyType="done"
              value={addressRelative}
              name="addressRelative"
              placeholder="Nhập số nhà và tên đường người thân"
              onChangeText={text => onChangeText(text, 'addressRelative')}
            />
          </View>
        </CollapseBody>
      </Collapse>
    );
  }
}
