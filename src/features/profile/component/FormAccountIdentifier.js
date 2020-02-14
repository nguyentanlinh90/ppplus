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
import {
  IMAGE_ID_FRONT,
  IMAGE_ID_BEHIND,
  IMAGE_DEGREE,
  text_select,
} from '../../../utils/constants';
import {
  boxSelectStyle,
  txtInBoxSelectStyle,
  txtInputStyle,
} from '../../../utils/utils';
import ImageClose from '../../../components/CloseImage';
import CloseImage from '../../../components/CloseImage';

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
      urlIDFront,
      urlIDBehind,
      handleOpenImage,
      degreeName,
      urlDegree,
      handleCloseImage,
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
                style={[
                  boxSelectStyle(valueBank != text_select),
                  {marginEnd: 10},
                ]}
                onPress={() => showSelectBank()}>
                <Text style={txtInBoxSelectStyle(valueBank)}>{valueBank}</Text>
                <ArrowUpDown />
              </TouchableOpacity>
              <TextInput
                style={txtInputStyle(bankBranch)}
                returnKeyType="done"
                value={bankBranch}
                name="bankBranch"
                placeholder="Chi nhánh"
                onChangeText={text => onChangeText(text, 'bankBranch')}
              />
            </View>
            <TextInput
              style={[txtInputStyle(accountBankName), {marginBottom: 10}]}
              returnKeyType="done"
              value={accountBankName}
              name="accountBankName"
              placeholder="Tên chủ tài khoản"
              onChangeText={text => onChangeText(text, 'accountBankName')}
            />
            <TextInput
              style={[txtInputStyle(accountBankNumber), {marginBottom: 10}]}
              returnKeyType="done"
              value={accountBankNumber}
              name="accountBankNumber"
              placeholder="Số tài khoản"
              onChangeText={text => onChangeText(text, 'accountBankNumber')}
            />
            <Text style={styles.txtTitleBasicInfo}>
              Xác nhận thông tin cá nhân
            </Text>
            <View style={styles.boxID}>
              <View style={{flex: 1, marginEnd: 10}}>
                <Image
                  resizeMode="stretch"
                  source={
                    urlIDFront
                      ? {uri: urlIDFront}
                      : require('../../../assets/images/bg-id-front.png')
                  }
                  style={styles.boxIDItemImage}
                />
                {urlIDFront ? (
                  <TouchableOpacity
                    style={styles.boxIDItemClose}
                    onPress={() => handleCloseImage(IMAGE_ID_FRONT)}>
                    <CloseImage />
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={{flex: 1}}>
                <Image
                  resizeMode="stretch"
                  source={
                    urlIDBehind
                      ? {uri: urlIDBehind}
                      : require('../../../assets/images/bg-id-front.png')
                  }
                  style={styles.boxIDItemImage}
                />
                {urlIDBehind ? (
                  <TouchableOpacity
                    style={styles.boxIDItemClose}
                    onPress={() => handleCloseImage(IMAGE_ID_BEHIND)}>
                    <CloseImage />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            <View style={styles.viewButtonSelectID}>
              <TouchableOpacity
                style={[styles.buttonSelectID, {marginEnd: 10}]}
                onPress={() => handleOpenImage(IMAGE_ID_FRONT)}>
                <Image
                  source={require('../../../assets/images/ic-camera-white.png')}
                />
                <Text style={styles.txtSelectID}>Mặt trước</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSelectID}
                onPress={() => handleOpenImage(IMAGE_ID_BEHIND)}>
                <Image
                  source={require('../../../assets/images/ic-camera-white.png')}
                />
                <Text style={styles.txtSelectID}>Mặt sau</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.txtTitleBasicInfo}>Bằng cấp</Text>
            <TextInput
              style={[txtInputStyle(degreeName), {marginBottom: 10}]}
              returnKeyType="done"
              value={degreeName}
              name="degreeName"
              placeholder="Nhập tên bằng cấp"
              onChangeText={text => onChangeText(text, 'degreeName')}
            />
            {urlDegree ? (
              <View style={{height: 200, marginBottom: 10}}>
                <Image
                  resizeMode="stretch"
                  source={{uri: urlDegree}}
                  style={{width: '100%', height: '100%'}}
                />
                {urlDegree ? (
                  <TouchableOpacity
                    style={styles.boxIDItemClose}
                    onPress={() => handleCloseImage(IMAGE_DEGREE)}>
                    <CloseImage />
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null}
            <TouchableOpacity
              style={[styles.buttonSelectID, {height: 44}]}
              onPress={() => handleOpenImage(IMAGE_DEGREE)}>
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
