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
import ItemRelativeDegree from '../component/ItemRelativeDegree';
import styles from '../styles/styles';
import {
  IMAGE_ID_FRONT,
  IMAGE_ID_BEHIND,
  IMAGE_JUDICIAL_RECORD,
  text_select,
} from '../../../utils/constants';
import {
  boxSelectStyle,
  boxSelectStyleWithAlert,
  txtInputStyle,
  getNameFromId,
  showAlert,
  isEmpty,
  txtInputStyleWithAlert,
} from '../../../utils/utils';

import CloseImage from '../../../components/CloseImage';

export default class FormAccountIdentifier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      isShowBank: false,
      isShowBranch: false,
      isShowPersonalInfo: false,
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

  _setShowPersonalInfo = () => {
    this.setState({
      isShowPersonalInfo: !this.state.isShowPersonalInfo,
    });
  };

  render() {
    const {
      myScroll,
      handleScrollView,
      enableScrollViewScroll,
      onChangeText,
      onChangeTextDegree,
      province_list,
      bank_list,
      bank_branch_list_follow_bank,
      personal_types_list,

      user_bank_info,
      personal_info,
      judicial_record_image,
      degree_info,

      handleSelectBank,
      handleSelectBranch,
      handleSelectPersonalInfo,
      handleOpenImage,
      handleCloseImage,
      handleOpenImageDegree,
      handleCloseImageDegree,
      handleAddDegreeRelativeItem,
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
                  style={boxSelectStyleWithAlert(
                    this.state.isShowBank || !isEmpty(user_bank_info.bank_id),
                  )}>
                  <Text style={styles.txtSelectStyle}>
                    {getNameFromId(user_bank_info.bank_id, bank_list)}
                  </Text>
                  <ArrowUpDown />
                </TouchableOpacity>
                {this.state.isShowBank ? (
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
                      listKey={(item, index) => 'D' + index.toString()}
                    />
                  </View>
                ) : null}
              </View>
            </View>
            <View
              style={{marginBottom: 10, marginTop: 10, flexDirection: 'row'}}>
              <Text style={styles.txtTitleBasicInfo}>Chi nhánh: </Text>
              <View style={{flex: 1, marginStart: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    if (
                      getNameFromId(user_bank_info.bank_id, bank_list) ==
                      text_select
                    ) {
                      showAlert('Bạn chưa chọn ngân hàng');
                    } else {
                      this._setShowBranch();
                    }
                  }}
                  style={boxSelectStyleWithAlert(
                    this.state.isShowBranch ||
                      !isEmpty(user_bank_info.bank_branch_id),
                  )}>
                  <Text style={styles.txtSelectStyle}>
                    {getNameFromId(
                      user_bank_info.bank_branch_id,
                      bank_branch_list_follow_bank,
                    )}
                  </Text>
                  <ArrowUpDown />
                </TouchableOpacity>
                {this.state.isShowBranch ? (
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
                      listKey={(item, index) => 'D' + index.toString()}
                    />
                  </View>
                ) : null}
              </View>
            </View>
            <TextInput
              style={[
                txtInputStyleWithAlert(user_bank_info.bank_account_name),
                {marginBottom: 10},
              ]}
              returnKeyType="done"
              value={user_bank_info.bank_account_name}
              name="bank_account_name"
              placeholder="Tên chủ tài khoản"
              onChangeText={text => onChangeText(text, 'bank_account_name')}
            />
            <TextInput
              style={[
                txtInputStyleWithAlert(user_bank_info.bank_account_number),
                {marginBottom: 10},
              ]}
              returnKeyType="done"
              value={user_bank_info.bank_account_number}
              name="bank_account_number"
              placeholder="Số tài khoản"
              keyboardType="numeric"
              onChangeText={text => onChangeText(text, 'bank_account_number')}
            />
            <Text style={styles.txtTitleBasicInfo}>
              Xác nhận thông tin cá nhân*
            </Text>

            <TouchableOpacity
              onPress={() => {
                this.setState({
                  isShowPersonalInfo: !this.state.isShowPersonalInfo,
                });
              }}
              style={boxSelectStyleWithAlert(
                this.state.isShowPersonalInfo ||
                  !isEmpty(personal_info.id_type),
              )}>
              <Text style={styles.txtSelectStyle}>
                {getNameFromId(personal_info.id_type, personal_types_list)}
              </Text>
              <ArrowUpDown />
            </TouchableOpacity>
            {this.state.isShowPersonalInfo ? (
              <View>
                <FlatList
                  style={styles.viewSelectFullHeight}
                  data={personal_types_list}
                  renderItem={({item: rowData}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          this._setShowPersonalInfo();
                          handleSelectPersonalInfo(rowData.id);
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
              </View>
            ) : null}
            <Text style={{fontSize: 12, color: '#333333', marginTop: 5}}>
              *Chụp hai mặt trước và sau như định dạng bên dưới
            </Text>
            <View style={styles.boxID}>
              <View style={{flex: 1, marginEnd: 10}}>
                <Image
                  resizeMode="stretch"
                  source={
                    personal_info.id_image_front
                      ? {uri: personal_info.id_image_front}
                      : require('../../../assets/images/bg-id-front.png')
                  }
                  style={styles.boxIDItemImage}
                />
                {personal_info.id_image_front ? (
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
                    personal_info.id_image_behind
                      ? {uri: personal_info.id_image_behind}
                      : require('../../../assets/images/bg-id-behind.png')
                  }
                  style={styles.boxIDItemImage}
                />
                {personal_info.id_image_behind ? (
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
                  resizeMode="contain"
                  source={require('../../../assets/images/ic-camera-white.png')}
                  style={{width: 24, height: 24}}
                />
                <Text style={styles.txtSelectID}>Mặt trước</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSelectID}
                onPress={() => handleOpenImage(IMAGE_ID_BEHIND)}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/ic-camera-white.png')}
                  style={{width: 24, height: 24}}
                />
                <Text style={styles.txtSelectID}>Mặt sau</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.txtTitleBasicInfo}>Lý lịch tư pháp*</Text>
            <View style={styles.viewJudicial}>
              {judicial_record_image ? (
                <View style={{width: '100%', height: '100%'}}>
                  <Image
                    resizeMode="stretch"
                    source={{uri: judicial_record_image}}
                    style={styles.boxIDItemImage}
                  />
                  <TouchableOpacity
                    style={styles.boxIDItemClose}
                    onPress={() => handleCloseImage(IMAGE_JUDICIAL_RECORD)}>
                    <CloseImage />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => handleOpenImage(IMAGE_JUDICIAL_RECORD)}>
                  <Image
                    resizeMode="contain"
                    source={require('../../../assets/images/ic-plus.png')}
                    style={{width: 45, height: 45}}
                  />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.txtTitleBasicInfo}>Bằng cấp</Text>
            <FlatList
              style={{width: '100%'}}
              data={degree_info}
              renderItem={({item: rowData, index}) => {
                return (
                  <ItemRelativeDegree
                    onChangeTextDegree={onChangeTextDegree}
                    index={index}
                    item={rowData}
                    handleOpenImageDegree={handleOpenImageDegree}
                    handleCloseImageDegree={handleCloseImageDegree}
                  />
                );
              }}
              listKey={(item, index) => 'D' + index.toString()}
            />
            {degree_info.length < 5 ? (
              <TouchableOpacity onPress={() => handleAddDegreeRelativeItem()}>
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
                    Thêm bằng cấp
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
