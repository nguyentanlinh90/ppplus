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

export default class FormAccountIdentifier extends Component {
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
      valueDistrict,
      address,
      nameRelative,
      phoneRelative,
      showSelectBank,
      valueBank,
      bankBranch,
      accountBankName,
      accountBankNumber,
      degreeName,
    } = this.props;

    return (
      <Collapse
        isCollapsed={this.state.isCollapsed}
        onToggle={isCollapsed => this.setState({isCollapsed: isCollapsed})}>
        <CollapseHeader>
          <View style={styles.boxTitleFill}>
            <Text style={styles.txtBasicInfo}>ĐỊNH DANH TÀI KHOẢN</Text>
            <View style={styles.boxArrow}>
              {this.state.isCollapsed ? <ArrowUp /> : <ArrowDown />}
            </View>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={{marginEnd: 16, marginStart: 16, paddingBottom: 20}}>
            <Text style={styles.txtTitleBasicInfo}>Thông tin chuyển khoản</Text>
            <View style={styles.groupContainer}>
              <TouchableOpacity
                style={[styles.boxContainer, {marginEnd: 10}]}
                onPress={() => showSelectBank()}>
                <Text style={styles.txtInBox}>{valueBank}</Text>
                <ArrowUpDown />
              </TouchableOpacity>
              <TextInput
                style={styles.txtInputContainer}
                returnKeyType="done"
                value={bankBranch}
                name="bankBranch"
                placeholder="Chi nhánh"
                onChangeText={text => onChangeText(text, 'bankBranch')}
              />
            </View>
            <TextInput
              style={[styles.txtInputContainer, {marginBottom: 10}]}
              returnKeyType="done"
              value={accountBankName}
              name="accountBankName"
              placeholder="Tên chủ tài khoản"
              onChangeText={text => onChangeText(text, 'accountBankName')}
            />
            <TextInput
              style={[styles.txtInputContainer, {marginBottom: 10}]}
              returnKeyType="done"
              value={accountBankNumber}
              name="accountBankNumber"
              placeholder="Số tài khoản"
              onChangeText={text => onChangeText(text, 'accountBankNumber')}
            />
            <Text style={styles.txtTitleBasicInfo}>
              Xác nhận thông tin cá nhân
            </Text>
            <View
              style={{
                flexDirection: 'row',
                height: 108,
                marginTop: 10,
              }}>
              <Image
                resizeMode="stretch"
                source={require('../../../assets/images/bg-id-front.png')}
                style={{flex: 1, height: '100%', width: '100%', marginEnd: 10}}
              />

              <Image
                resizeMode="stretch"
                source={require('../../../assets/images/bg-id-behind.png')}
                style={{flex: 1, height: '100%', width: '100%'}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                height: 44,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <TouchableOpacity
                style={[styles.buttonSelectID, {marginEnd: 10}]}
                onPress={() => {}}>
                <Image
                  source={require('../../../assets/images/ic-camera-white.png')}
                />
                <Text style={styles.txtSelectID}>Mặt trước</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSelectID}
                onPress={() => {}}>
                <Image
                  source={require('../../../assets/images/ic-camera-white.png')}
                />
                <Text style={styles.txtSelectID}>Mặt sau</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.txtTitleBasicInfo}>Bằng cấp</Text>
            <TextInput
              style={[styles.txtInputContainer, {marginBottom: 10}]}
              returnKeyType="done"
              value={degreeName}
              name="degreeName"
              placeholder="Nhập tên bằng cấp"
              onChangeText={text => onChangeText(text, 'degreeName')}
            />
            <TouchableOpacity
              style={[styles.buttonSelectID, {height: 44}]}
              onPress={() => {}}>
              <Image
                source={require('../../../assets/images/ic-camera-white.png')}
              />
              <Text style={styles.txtSelectID}>Chụp ảnh</Text>
            </TouchableOpacity>
          </View>
        </CollapseBody>
      </Collapse>
    );
  }
}
