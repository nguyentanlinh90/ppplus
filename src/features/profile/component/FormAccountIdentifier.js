import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
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
import {
  IMAGE_ID_FRONT,
  IMAGE_ID_BEHIND,
  IMAGE_DEGREE_FRONT,
  IMAGE_DEGREE_BEHIND,
  text_select,
} from '../../../utils/constants';
import {
  boxSelectStyle,
  txtInBoxSelectStyle,
  txtInputStyle,
  getNameFromId,
  getDistrictNameFromId,
  showAlert,
  isEmpty,
} from '../../../utils/utils';

import ImageClose from '../../../components/CloseImage';
import CloseImage from '../../../components/CloseImage';

export default class FormAccountIdentifier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      isShowBank: false,
      isShowBranch: false,
      isShowProvince: false,
    };
  }

  _setShowBank = () => {
    this.setState({
      isShowBank: !this.state.isShowBank,
    });
  };
  _setShowBranch = () => {
    this.setState({
      isShowBranch: !this.state.isShowBranch,
    });
  };
  _setShowProvince = () => {
    this.setState({
      isShowProvince: !this.state.isShowProvince,
    });
  };

  render() {
    const {
      onChangeText,
      province_list,
      bank_list,
      bank_branch_list_follow_bank,

      bank_id,
      branch_id,
      account_name,
      number_account,
      id_number,
      id_issue_place,
      id_issue_date,
      id_front_image,
      id_behind_image,
      education_degree_name,
      degree_image_front,
      degree_image_behind,

      handleSelectBank,
      handleSelectBranch,
      handleSelectProvinceIdentification,
      showPickerIdentification,
      handleOpenImage,
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
            <View
              style={{marginBottom: 10, marginTop: 10, flexDirection: 'row'}}>
              <Text style={styles.txtTitleBasicInfo}>Ngân hàng: </Text>
              <View style={{flex: 1, marginStart: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({isShowBank: !this.state.isShowBank});
                  }}
                  style={boxSelectStyle(
                    this.state.isShowBank || !isEmpty(bank_id),
                  )}>
                  <Text style={styles.txtSelectStyle}>
                    {getNameFromId(bank_id, bank_list)}
                  </Text>
                  <ArrowUpDown />
                </TouchableOpacity>
                {this.state.isShowBank ? (
                  <FlatList
                    style={styles.viewSelect}
                    data={bank_list}
                    renderItem={({item: rowData}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this._setShowBank();
                            handleSelectBank(rowData.id);
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
              <Text style={styles.txtTitleBasicInfo}>Chi nhánh: </Text>
              <View style={{flex: 1, marginStart: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    if (getNameFromId(bank_id, bank_list) == text_select) {
                      showAlert('Bạn chưa chọn ngân hàng');
                    } else {
                      this._setShowBranch();
                    }
                  }}
                  style={boxSelectStyle(
                    this.state.isShowBranch || !isEmpty(branch_id),
                  )}>
                  <Text style={styles.txtSelectStyle}>
                    {getNameFromId(branch_id, bank_branch_list_follow_bank)}
                  </Text>
                  <ArrowUpDown />
                </TouchableOpacity>
                {this.state.isShowBranch ? (
                  <FlatList
                    style={styles.viewSelect}
                    data={bank_branch_list_follow_bank}
                    renderItem={({item: rowData}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this._setShowBranch();
                            handleSelectBranch(rowData.id);
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
            <TextInput
              style={[txtInputStyle(account_name), {marginBottom: 10}]}
              returnKeyType="done"
              value={account_name}
              name="account_name"
              placeholder="Tên chủ tài khoản"
              onChangeText={text => onChangeText(text, 'account_name')}
            />
            <TextInput
              style={[txtInputStyle(number_account), {marginBottom: 10}]}
              returnKeyType="done"
              value={number_account}
              name="number_account"
              placeholder="Số tài khoản"
              keyboardType="numeric"
              onChangeText={text => onChangeText(text, 'number_account')}
            />
            <Text style={styles.txtTitleBasicInfo}>
              Xác nhận thông tin cá nhân
            </Text>
            <TextInput
              style={[txtInputStyle(id_number), {marginBottom: 10}]}
              returnKeyType="done"
              value={id_number}
              name="id_number"
              placeholder="Số CMND / CCCD"
              keyboardType="numeric"
              onChangeText={text => onChangeText(text, 'id_number')}
            />
            <View
              style={{marginBottom: 10, marginTop: 10, flexDirection: 'row'}}>
              <Text style={styles.txtTitleBasicInfo}>Ngày cấp: </Text>
              <TouchableOpacity
                onPress={() => showPickerIdentification()}
                style={boxSelectStyle(!id_issue_date.includes(text_select))}>
                <Text style={txtInBoxSelectStyle()}>{id_issue_date}</Text>
                <ArrowUpDown />
              </TouchableOpacity>
            </View>
            <View
              style={{marginBottom: 10, marginTop: 10, flexDirection: 'row'}}>
              <Text style={styles.txtTitleBasicInfo}>Nơi cấp: </Text>
              <View style={{flex: 1, marginStart: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    this._setShowProvince();
                  }}
                  style={boxSelectStyle(
                    this.state.isShowProvince || !isEmpty(id_issue_place),
                  )}>
                  <Text style={styles.txtSelectStyle}>
                    {getNameFromId(id_issue_place, province_list)}
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
                            this._setShowProvince();
                            handleSelectProvinceIdentification(rowData.id);
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
            <View style={styles.boxID}>
              <View style={{flex: 1, marginEnd: 10}}>
                <Image
                  resizeMode="stretch"
                  source={
                    id_front_image
                      ? {uri: id_front_image}
                      : require('../../../assets/images/bg-id-front.png')
                  }
                  style={styles.boxIDItemImage}
                />
                {id_front_image ? (
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
                    id_behind_image
                      ? {uri: id_behind_image}
                      : require('../../../assets/images/bg-id-behind.png')
                  }
                  style={styles.boxIDItemImage}
                />
                {id_behind_image ? (
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
              style={[txtInputStyle(education_degree_name), {marginBottom: 10}]}
              returnKeyType="done"
              value={education_degree_name}
              name="education_degree_name"
              placeholder="Nhập tên bằng cấp"
              onChangeText={text => onChangeText(text, 'education_degree_name')}
            />
            <View style={styles.boxID}>
              <View style={{flex: 1, marginEnd: 10}}>
                <Image
                  resizeMode="stretch"
                  source={
                    degree_image_front
                      ? {uri: degree_image_front}
                      : require('../../../assets/images/bg-id-front.png')
                  }
                  style={styles.boxIDItemImage}
                />
                {degree_image_front ? (
                  <TouchableOpacity
                    style={styles.boxIDItemClose}
                    onPress={() => handleCloseImage(IMAGE_DEGREE_FRONT)}>
                    <CloseImage />
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={{flex: 1}}>
                <Image
                  resizeMode="stretch"
                  source={
                    degree_image_behind
                      ? {uri: degree_image_behind}
                      : require('../../../assets/images/bg-id-behind.png')
                  }
                  style={styles.boxIDItemImage}
                />
                {degree_image_behind ? (
                  <TouchableOpacity
                    style={styles.boxIDItemClose}
                    onPress={() => handleCloseImage(IMAGE_DEGREE_BEHIND)}>
                    <CloseImage />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            <View style={styles.viewButtonSelectID}>
              <TouchableOpacity
                style={[styles.buttonSelectID, {marginEnd: 10}]}
                onPress={() => handleOpenImage(IMAGE_DEGREE_FRONT)}>
                <Image
                  source={require('../../../assets/images/ic-camera-white.png')}
                />
                <Text style={styles.txtSelectID}>Mặt trước</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSelectID}
                onPress={() => handleOpenImage(IMAGE_DEGREE_BEHIND)}>
                <Image
                  source={require('../../../assets/images/ic-camera-white.png')}
                />
                <Text style={styles.txtSelectID}>Mặt sau</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CollapseBody>
      </Collapse>
    );
  }
}
