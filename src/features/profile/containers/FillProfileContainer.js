import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage,
  BackHandler,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../styles/styles';
import FormImageProfile from '../component/FormImageProfile';
import FormBasicInfo from '../component/FormBasicInfo';
import FormContactInfo from '../component/FormContactInfo';
import FormLevel from '../component/FormLevel';
import FormAccountIdentifier from '../component/FormAccountIdentifier';
import {SCREEN_PROFILE} from '../../../api/screen';
import KeyboardShift from './KeyboardShift';
import {text_select} from '../../../utils/constants';
import {changeMsgCode} from '../../../api/helpers';
import {getUserInfo, doUpdateUserInfo} from '../../../features/user/actions';

import {ACCESS_TOKEN} from '../../../utils/constants';
import * as types from '../../../api/types';
import {
  showAlert,
  handleCheck,
  arrayToString,
  stringToArray,
  isEmpty,
  isZero,
} from '../../../utils/utils';

const IMAGE_AVATAR = 0;
import {
  IMAGE_1,
  IMAGE_2,
  IMAGE_3,
  IMAGE_4,
  IMAGE_ID_FRONT,
  IMAGE_ID_BEHIND,
  IMAGE_DEGREE_FRONT,
  IMAGE_DEGREE_BEHIND,
} from '../../../utils/constants';
var token = '';
export class FillProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableScrollViewScroll: true,

      isLoading: true,
      isShowBirthday: false,
      isShowIdentification: false,

      gender_list: [],
      province_list: [],
      district_list: [],
      district_list_follow_province: [],
      district_list_follow_province_relative: [],
      major_list: [],
      education_list: [],
      bank_list: [],
      bank_branch_list: [],
      bank_branch_list_follow_bank: [],

      percent_updated: 0,
      avatar: '',
      avatar_data: '',
      sub_avatar_1: '',
      sub_avatar_1_data: '',
      sub_avatar_2: '',
      sub_avatar_2_data: '',
      sub_avatar_3: '',
      sub_avatar_3_data: '',
      sub_avatar_4: '',
      sub_avatar_4_data: '',

      last_name: '',
      first_name: '',
      birthday: '',
      gender: 0,
      height: 0,
      weight: 0,
      working_places: [],
      working_majors: [],
      province_id: '',
      district_id: '',
      address: '',
      relative_name: '',
      relative_phone: '',
      relative_province_id: '',
      relative_district_id: '',
      relative_address: '',
      education_id: '',
      education_major_name: '',
      bank_id: '',
      bank_branch_id: '',
      bank_account_name: '',
      bank_account_number: '',
      id_number: '',
      id_issue_date: '',
      id_issue_place: '',
      id_front_image: '',
      id_front_image_data: '',
      id_behind_image: '',
      id_behind_image_data: '',
      degree_name: '',
      degree_image_front: '',
      degree_image_front_data: '',
      degree_image_behind: '',
      degree_image_behind_data: '',
    };
    this._onChangeText = this._onChangeText.bind(this);
    this._getToken();
  }

  async _getToken() {
    token = await AsyncStorage.getItem(ACCESS_TOKEN);
    if (token && !isEmpty(token)) {
      this._getUserInfo(token);
    }
  }
  _onChangeText = (text, type) => {
    if (type == 'last_name') {
      this.setState({last_name: text});
    } else if (type == 'first_name') {
      this.setState({first_name: text});
    } else if (type == 'height') {
      this.setState({height: text});
    } else if (type == 'weight') {
      this.setState({weight: text});
    } else if (type == 'address') {
      this.setState({address: text});
    } else if (type == 'relative_name') {
      this.setState({relative_name: text});
    } else if (type == 'relative_phone') {
      this.setState({relative_phone: text});
    } else if (type == 'relative_address') {
      this.setState({relative_address: text});
    } else if (type == 'education_major_name') {
      this.setState({education_major_name: text});
    } else if (type == 'bank_account_name') {
      this.setState({bank_account_name: text});
    } else if (type == 'bank_account_number') {
      this.setState({bank_account_number: text});
    } else if (type == 'id_number') {
      this.setState({id_number: text});
    } else if (type == 'degree_name') {
      this.setState({degree_name: text});
    }
  };

  _handleOpenImage = numberOfImage => {
    let options = {
      title: 'Chọn ảnh',
      cancelButtonTitle: 'Hủy',
      takePhotoButtonTitle: 'Chụp từ Camera',
      chooseFromLibraryButtonTitle: 'Chọn từ thư viện',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const {urlImage} = this.props;

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        if (numberOfImage == IMAGE_AVATAR) {
          this.setState({
            avatar: response.uri,
            avatar_data: response.data,
          });
        } else if (numberOfImage == IMAGE_1) {
          this.setState({
            sub_avatar_1: response.uri,
            sub_avatar_1_data: response.data,
          });
        } else if (numberOfImage == IMAGE_2) {
          this.setState({
            sub_avatar_2: response.uri,
            sub_avatar_2_data: response.data,
          });
        } else if (numberOfImage == IMAGE_3) {
          this.setState({
            sub_avatar_3: response.uri,
            sub_avatar_3_data: response.data,
          });
        } else if (numberOfImage == IMAGE_4) {
          this.setState({
            sub_avatar_4: response.uri,
            sub_avatar_4_data: response.data,
          });
        } else if (numberOfImage == IMAGE_ID_FRONT) {
          this.setState({
            id_front_image: response.uri,
            id_front_image_data: response.data,
          });
        } else if (numberOfImage == IMAGE_ID_BEHIND) {
          this.setState({
            id_behind_image: response.uri,
            id_behind_image_data: response.data,
          });
        } else if (numberOfImage == IMAGE_DEGREE_FRONT) {
          this.setState({
            degree_image_front: response.uri,
            degree_image_front_data: response.data,
          });
        } else if (numberOfImage == IMAGE_DEGREE_BEHIND) {
          this.setState({
            degree_image_behind: response.uri,
            degree_image_behind_data: response.data,
          });
        }
      }
    });
  };

  _handleCloseImage = numberOfImage => {
    if (numberOfImage == IMAGE_1) {
      this.setState({
        sub_avatar_1: '',
        sub_avatar_1_data: '',
      });
    } else if (numberOfImage == IMAGE_2) {
      this.setState({
        sub_avatar_2: '',
        sub_avatar_2_data: '',
      });
    } else if (numberOfImage == IMAGE_3) {
      this.setState({
        sub_avatar_3: '',
        sub_avatar_3_data: '',
      });
    } else if (numberOfImage == IMAGE_4) {
      this.setState({
        sub_avatar_4: '',
        sub_avatar_4_data: '',
      });
    } else if (numberOfImage == IMAGE_ID_FRONT) {
      this.setState({
        id_front_image: '',
        id_front_image_data: '',
      });
    } else if (numberOfImage == IMAGE_ID_BEHIND) {
      this.setState({
        id_behind_image: '',
        id_behind_image_data: '',
      });
    } else if (numberOfImage == IMAGE_DEGREE_FRONT) {
      this.setState({
        degree_image_front: '',
        degree_image_front_data: '',
      });
    } else if (numberOfImage == IMAGE_DEGREE_BEHIND) {
      this.setState({
        degree_image_behind: '',
        degree_image_behind_data: '',
      });
    }
  };

  _showPicker = () => {
    this.setState({isShowBirthday: true});
  };

  _hidePicker = () => {
    this.setState({isShowBirthday: false});
  };

  _handleDatePicked = date => {
    const dateFormat = moment(date).format('DD/MM/YYYY');
    this.setState({birthday: dateFormat});
    this._hidePicker();
  };

  _renderBirthdayPicker() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const c = new Date(year - 18, month, day);
    return (
      <DateTimePicker
        isVisible={this.state.isShowBirthday}
        onConfirm={this._handleDatePicked}
        onCancel={this._hidePicker}
        mode="date"
        locale="vi"
        minimumDate={new Date('01/01/1950')}
        maximumDate={c}
        titleIOS="Chọn ngày sinh"
        confirmTextIOS="Xác nhận"
        cancelTextIOS="Huỷ"
      />
    );
  }
  _showPickerIdentification = () => {
    this.setState({isShowIdentification: true});
  };

  _hidePickerIdentification = () => {
    this.setState({isShowBirthday: false});
  };

  _handleDatePickedIdentification = date => {
    const dateFormat = moment(date).format('DD/MM/YYYY');
    this.setState({id_issue_date: dateFormat});
    this._hidePickerIdentification();
  };

  _renderIdentificationPicker() {
    return (
      <DateTimePicker
        isVisible={this.state.isShowIdentification}
        onConfirm={this._handleDatePickedIdentification}
        onCancel={this._hidePickerIdentification}
        mode="date"
        locale="vi"
        minimumDate={new Date('01/01/1950')}
        maximumDate={new Date()}
        titleIOS="Chọn ngày"
        confirmTextIOS="Xác nhận"
        cancelTextIOS="Huỷ"
      />
    );
  }

  _handleSelectGender = genderSelect => {
    this.setState({gender: genderSelect});
  };

  _handleSelectProvince = (isUser, provinceSelect) => {
    const {district_list} = this.state;
    if (isUser) {
      this.setState({
        province_id: provinceSelect,
        district_list_follow_province: district_list[provinceSelect],
      });
    } else {
      this.setState({
        relative_province_id: provinceSelect,
        district_list_follow_province_relative: district_list[provinceSelect],
      });
    }
  };

  _handleSelectDistrict = (isUser, districtSelect) => {
    if (isUser) {
      this.setState({district_id: districtSelect});
    } else {
      this.setState({relative_district_id: districtSelect});
    }
  };

  _handleSelectProvinces = provinceIdSelect => {
    const {working_places} = this.state;
    if (handleCheck(provinceIdSelect, working_places)) {
      var array = [...working_places];
      var index = array.indexOf(provinceIdSelect);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({working_places: array});
      }
    } else {
      working_places.push(provinceIdSelect);
      this.setState({working_places: working_places});
    }
  };
  _handleSelectMajors = majorIdSelect => {
    const {working_majors} = this.state;
    if (handleCheck(majorIdSelect, working_majors)) {
      var array = [...working_majors];
      var index = array.indexOf(majorIdSelect);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({working_majors: array});
      }
    } else {
      working_majors.push(majorIdSelect);
      this.setState({working_majors: working_majors});
    }
  };

  _handleSelectEducation = educationSelect => {
    this.setState({
      education_id: educationSelect,
    });
  };
  _handleSelectBank = bankSelect => {
    const {bank_branch_list} = this.state;
    this.setState({
      bank_id: bankSelect,
      bank_branch_list_follow_bank: bank_branch_list[bankSelect],
    });
  };

  _handleSelectBranch = branchSelect => {
    this.setState({bank_branch_id: branchSelect});
  };

  _handleSelectProvinceIdentification = provinceSelect => {
    this.setState({
      id_issue_place: provinceSelect,
    });
  };

  _getUserInfo = token => {
    const {getUserInfo} = this.props;
    getUserInfo('full_detail', token);
  };

  _setUser = data => {
    var relative_province_id = data.user_relative_info.relative_province_id;
    var province_id = data.address.province_id;

    this.setState({
      gender_list: data.gender_list,
      province_list: data.province_list,
      district_list: data.district_list,
      district_list_follow_province:
        province_id == '' ? [] : data.district_list[province_id],
      district_list_follow_province_relative:
        relative_province_id == ''
          ? []
          : data.district_list[relative_province_id],
      major_list: data.major_list,
      education_list: data.education_list,
      bank_list: data.bank_list,
      bank_branch_list: data.bank_branch_list,

      avatar: data.avatar,
      sub_avatar_1: data.sub_avatar_list.sub_avatar_1,
      sub_avatar_2: data.sub_avatar_list.sub_avatar_2,
      sub_avatar_3: data.sub_avatar_list.sub_avatar_3,
      sub_avatar_4: data.sub_avatar_list.sub_avatar_4,
      percent_updated: data.percent_updated,
      first_name: data.first_name,
      last_name: data.last_name,
      birthday: data.birthday,
      gender: data.gender,
      height: data.height,
      weight: data.weight,
      working_places: stringToArray(data.working_places),
      working_majors: stringToArray(data.working_majors),
      province_id: data.address.province_id,
      district_id: data.address.district_id,
      address: data.address.address,
      relative_name: data.user_relative_info.relative_name,
      relative_phone: data.user_relative_info.relative_phone,
      relative_province_id: data.user_relative_info.relative_province_id,
      relative_district_id: data.user_relative_info.relative_district_id,
      relative_address: data.user_relative_info.relative_address,
      education_id: data.education.education_id,
      education_major_name: data.education.education_major_name,
      bank_id: data.user_bank_info.bank_id,
      bank_branch_id: data.user_bank_info.bank_branch_id,
      bank_account_name: data.user_bank_info.bank_account_name,
      bank_account_number: data.user_bank_info.bank_account_number,
      id_number: data.identification_info.id_number,
      id_issue_date: data.identification_info.id_issue_date,
      id_issue_place: data.identification_info.id_issue_place,
      id_front_image: data.identification_info.id_front_image,
      id_behind_image: data.identification_info.id_behind_image,
      degree_name: data.education.degree_name,
      degree_image_front: data.education.degree_images.degree_image_front,
      degree_image_behind: data.education.degree_images.degree_image_behind,
    });
  };

  _handleUpdateFullInfo = () => {
    const {doUpdateUserInfo} = this.props;
    const {
      avatar_data,
      sub_avatar_1_data,
      sub_avatar_2_data,
      sub_avatar_3_data,
      sub_avatar_4_data,
      first_name,
      last_name,
      birthday,
      gender,
      height,
      weight,
      working_places,
      working_majors,
      province_id,
      district_id,
      address,
      relative_name,
      relative_phone,
      relative_province_id,
      relative_district_id,
      relative_address,
      education_id,
      education_major_name,
      bank_id,
      bank_branch_id,
      bank_account_name,
      bank_account_number,
      id_number,
      id_issue_date,
      id_issue_place,
      id_front_image_data,
      id_behind_image_data,
      degree_name,
      degree_image_front_data,
      degree_image_behind_data,
    } = this.state;

    if (
      isEmpty(first_name) ||
      isEmpty(last_name) ||
      isEmpty(birthday) ||
      isZero(gender) ||
      isZero(height) ||
      isZero(weight) ||
      isEmpty(province_id) ||
      isEmpty(district_id) ||
      isEmpty(address) ||
      isEmpty(relative_name) ||
      isEmpty(relative_phone)
    ) {
      showAlert('Vui lòng cung cấp đầy đủ các trường thông tin bắt buộc');
      return;
    }
    const params = {
      avatar: avatar_data,
      sub_avatar_1: sub_avatar_1_data,
      sub_avatar_2: sub_avatar_2_data,
      sub_avatar_3: sub_avatar_3_data,
      sub_avatar_4: sub_avatar_4_data,
      first_name: first_name,
      last_name: last_name,
      birthday: birthday,
      gender: gender,
      height: height,
      weight: weight,
      working_places: arrayToString(working_places),
      working_majors: arrayToString(working_majors),
      province_id: province_id,
      district_id: district_id,
      address: address,
      relative_name: relative_name,
      relative_phone: relative_phone,
      relative_province_id: relative_province_id,
      relative_district_id: relative_district_id,
      relative_address: relative_address,
      education_id: education_id,
      education_major_name: education_major_name,
      bank_id: bank_id,
      bank_branch_id: bank_branch_id,
      bank_account_name: bank_account_name,
      bank_account_number: bank_account_number,
      id_number: id_number,
      id_issue_date: id_issue_date,
      id_issue_place: id_issue_place,
      id_front_image: id_front_image_data,
      id_behind_image: id_behind_image_data,
      degree_name: degree_name,
      degree_image_front: degree_image_front_data,
      degree_image_behind: degree_image_behind_data,
      type: 'full_detail',
    };

    if (token != '') {
      doUpdateUserInfo(params, token);
    }
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true; //disable
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == types.GET_USER_INFO_SUCCESS) {
      this.setState({isLoading: false});
      this._setUser(nextProps.data);
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.GET_USER_INFO_FAIL) {
      showAlert(nextProps.message);
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.UPDATE_USER_INFO_SUCCESS) {
      showAlert('Cập nhật thông tin thành công');
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.UPDATE_USER_INFO_FAIL) {
      showAlert('Cập nhật thông tin thất bại');
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
    }
  }

  _goBack = navigation => {
    navigation.state.params.onGoBack(
      this.state.avatar,
      this.state.last_name,
      this.state.first_name,
    );
    navigation.goBack();
  };

  _handleScrollView = isEnable => {
    this.setState({enableScrollViewScroll: isEnable});
  };

  render() {
    const {navigation, percent_updated, name, user} = this.props;
    return (
      <KeyboardShift>
        {() => (
          <View
            onStartShouldSetResponderCapture={() => {
              this._handleScrollView(true);
            }}>
            <ScrollView
              style={styles.container}
              scrollEnabled={this.state.enableScrollViewScroll}
              ref={myScroll => (this._myScroll = myScroll)}>
              <Spinner
                visible={this.state.isLoading}
                color={'white'}
                size={'large'}
                textStyle={{color: '#fff'}}
              />
              {this._renderBirthdayPicker()}
              {this._renderIdentificationPicker()}
              <View style={styles.viewTop}>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={styles.viewBack}
                    onPress={() => {
                      this._goBack(navigation);
                    }}>
                    <Image
                      resizeMode="contain"
                      source={require('../../../assets/images/ic-back-black.png')}
                      style={{width: 24, height: 24}}
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    this._handleUpdateFullInfo();
                  }}>
                  <Text style={styles.txtSave}>Lưu</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.viewCircleAvatar}>
                <ProgressCircle
                  percent={this.state.percent_updated}
                  radius={58}
                  borderWidth={3}
                  color="#F0532D"
                  shadowColor="#d8d8d8"
                  bgColor="#fff"
                />
                <Image
                  resizeMode="cover"
                  source={{uri: this.state.avatar}}
                  style={styles.circleAvatarFill}
                />
                <View style={styles.viewCamera}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this._handleOpenImage(IMAGE_AVATAR)}>
                    <View style={styles.boxCamera}>
                      <Image
                        resizeMode="contain"
                        source={require('../../../assets/images/ic-camera.png')}
                        style={{width: 18, height: 18}}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <FormImageProfile
                sub_avatar_1={this.state.sub_avatar_1}
                sub_avatar_2={this.state.sub_avatar_2}
                sub_avatar_3={this.state.sub_avatar_3}
                sub_avatar_4={this.state.sub_avatar_4}
                handleOpenImage={this._handleOpenImage}
                handleCloseImage={this._handleCloseImage}
              />
              <View style={styles.boxIndicatorFill} />
              <FormBasicInfo
                myScroll={this._myScroll}
                handleScrollView={this._handleScrollView}
                enableScrollViewScroll={this.state.enableScrollViewScroll}
                onChangeText={this._onChangeText}
                gender_list={this.state.gender_list}
                province_list={this.state.province_list}
                major_list={this.state.major_list}
                last_name={this.state.last_name}
                first_name={this.state.first_name}
                height={this.state.height}
                weight={this.state.weight}
                birthday={this.state.birthday}
                gender={this.state.gender}
                working_places={this.state.working_places}
                working_majors={this.state.working_majors}
                showPicker={this._showPicker}
                handleSelectGender={this._handleSelectGender}
                handleSelectProvinces={this._handleSelectProvinces}
                handleSelectMajors={this._handleSelectMajors}
              />
              <View style={styles.boxIndicatorFill} />
              <FormContactInfo
                myScroll={this._myScroll}
                handleScrollView={this._handleScrollView}
                enableScrollViewScroll={this.state.enableScrollViewScroll}
                onChangeText={this._onChangeText}
                //
                province_list={this.state.province_list}
                district_list_follow_province={
                  this.state.district_list_follow_province
                }
                district_list_follow_province_relative={
                  this.state.district_list_follow_province_relative
                }
                //
                province_id={this.state.province_id}
                district_id={this.state.district_id}
                address={this.state.address}
                relative_name={this.state.relative_name}
                relative_phone={this.state.relative_phone}
                relative_province_id={this.state.relative_province_id}
                relative_district_id={this.state.relative_district_id}
                relative_address={this.state.relative_address}
                //
                handleSelectProvince={this._handleSelectProvince}
                handleSelectDistrict={this._handleSelectDistrict}
              />
              <View style={styles.boxIndicatorFill} />

              <FormLevel
                myScroll={this._myScroll}
                handleScrollView={this._handleScrollView}
                enableScrollViewScroll={this.state.enableScrollViewScroll}
                onChangeText={this._onChangeText}
                education_list={this.state.education_list}
                education_id={this.state.education_id}
                education_major_name={this.state.education_major_name}
                handleSelectEducation={this._handleSelectEducation}
              />
              <View style={styles.boxIndicatorFill} />
              <FormAccountIdentifier
                myScroll={this._myScroll}
                handleScrollView={this._handleScrollView}
                enableScrollViewScroll={this.state.enableScrollViewScroll}
                onChangeText={this._onChangeText}
                bank_list={this.state.bank_list}
                bank_branch_list_follow_bank={
                  this.state.bank_branch_list_follow_bank
                }
                province_list={this.state.province_list}
                bank_id={this.state.bank_id}
                bank_branch_id={this.state.bank_branch_id}
                bank_account_name={this.state.bank_account_name}
                bank_account_number={this.state.bank_account_number}
                number={this.state.number}
                id_issue_place={this.state.id_issue_place}
                id_issue_date={this.state.id_issue_date}
                id_front_image={this.state.id_front_image}
                id_behind_image={this.state.id_behind_image}
                degree_name={this.state.degree_name}
                degree_image_front={this.state.degree_image_front}
                degree_image_behind={this.state.degree_image_behind}
                handleSelectBank={this._handleSelectBank}
                handleSelectBranch={this._handleSelectBranch}
                showPickerIdentification={this._showPickerIdentification}
                handleSelectProvinceIdentification={
                  this._handleSelectProvinceIdentification
                }
                handleOpenImage={this._handleOpenImage}
                handleCloseImage={this._handleCloseImage}
              />
              <View style={styles.boxIndicatorFill} />
            </ScrollView>
          </View>
        )}
      </KeyboardShift>
    );
  }
}

function mapStateToProps(state) {
  return {
    msg_code: state.user.msg_code,
    message: state.user.message,
    data: state.user.data,
  };
}
export default connect(mapStateToProps, {
  getUserInfo,
  doUpdateUserInfo,
  changeMsgCode,
})(FillProfileContainer);
