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
import SpinnerComponent from '../../../components/Spinner';
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
  IMAGE_JUDICIAL_RECORD,
  REGEX,
} from '../../../utils/constants';
var token = '';
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
export class FillProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableScrollViewScroll: true,

      isLoading: true,
      isShowBirthday: false,

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
      personal_types_list: [],

      percent_updated: 0,
      avatar: '',
      avatar_data: '',
      sub_avatar_list: {},

      last_name: '',
      first_name: '',
      birthday: '',
      gender: 0,
      height: 0,
      weight: 0,
      working_places: [],
      working_majors: [],
      address: {},
      user_relative_info: [],
      education: {},
      user_bank_info: {},
      personal_info: {},
      degree_info: [],
      judicial_record_image: '',
      judicial_record_image_data: '',
    };
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
      const {address} = this.state;
      var temp = address;
      temp.address = text;
      this.setState({address: temp});
    } else if (type == 'education_major_name') {
      const {education} = this.state;
      var temp = education;
      temp.education_major_name = text;
      this.setState({
        education: temp,
      });
    } else if (type == 'bank_account_name') {
      const {user_bank_info} = this.state;
      var temp = user_bank_info;
      temp.bank_account_name = text;
      this.setState({user_bank_info: temp});
    } else if (type == 'bank_account_number') {
      const {user_bank_info} = this.state;
      var temp = user_bank_info;
      temp.bank_account_number = text;
      this.setState({user_bank_info: temp});
    }
  };

  _onChangeTextRelative = (index, text, type) => {
    const {user_relative_info} = this.state;
    var arr = user_relative_info;

    if (type == 'relative_name') {
      arr[index].relative_name = text;
      this.setState({user_relative_info: arr});
    } else if (type == 'relative_phone') {
      arr[index].relative_phone = text;
      this.setState({user_relative_info: arr});
    } else if (type == 'relative_address') {
      arr[index].relative_address = text;
      this.setState({user_relative_info: arr});
    }
  };

  _onChangeTextDegree = (index, text, type) => {
    const {degree_info} = this.state;
    var arr = degree_info;
    arr[index].degree_name = text;
    this.setState({degree_info: arr});
  };

  _handleOpenImage = numberOfImage => {
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
          var temp = this.state.sub_avatar_list;
          temp.sub_avatar_1 = response.uri;
          temp.sub_avatar_1_data = response.data;
          this.setState({sub_avatar_list: temp});
        } else if (numberOfImage == IMAGE_2) {
          var temp = this.state.sub_avatar_list;
          temp.sub_avatar_2 = response.uri;
          temp.sub_avatar_2_data = response.data;
          this.setState({sub_avatar_list: temp});
        } else if (numberOfImage == IMAGE_3) {
          var temp = this.state.sub_avatar_list;
          temp.sub_avatar_3 = response.uri;
          temp.sub_avatar_3_data = response.data;
          this.setState({sub_avatar_list: temp});
        } else if (numberOfImage == IMAGE_4) {
          var temp = this.state.sub_avatar_list;
          temp.sub_avatar_4 = response.uri;
          temp.sub_avatar_4_data = response.data;
          this.setState({sub_avatar_list: temp});
        } else if (numberOfImage == IMAGE_ID_FRONT) {
          const {personal_info} = this.state;
          var temp = personal_info;
          temp.id_image_front = response.uri;
          temp.id_image_front_data = response.data;
          this.setState({personal_info: temp});
        } else if (numberOfImage == IMAGE_ID_BEHIND) {
          const {personal_info} = this.state;
          var temp = personal_info;
          temp.id_image_behind = response.uri;
          temp.id_image_behind_data = response.data;
          this.setState({personal_info: temp});
        } else if (numberOfImage == IMAGE_JUDICIAL_RECORD) {
          this.setState({
            judicial_record_image: response.uri,
            judicial_record_image_data: response.data,
          });
        }
      }
    });
  };

  _handleOpenImageDegree = (index, numberOfImage) => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
        ``;
      } else if (response.customButton) {
      } else {
        if (numberOfImage == IMAGE_DEGREE_FRONT) {
          var arr = this.state.degree_info;
          arr[index].degree_image_front = response.uri;
          arr[index].degree_image_front_data = response.data;

          this.setState({degree_info: arr});
        } else if (numberOfImage == IMAGE_DEGREE_BEHIND) {
          var arr = this.state.degree_info;
          arr[index].degree_image_behind = response.uri;
          arr[index].degree_image_behind_data = response.data;

          this.setState({degree_info: arr});
        }
      }
    });
  };

  _handleCloseImage = numberOfImage => {
    if (numberOfImage == IMAGE_1) {
      var temp = this.state.sub_avatar_list;
      temp.sub_avatar_1 = '';
      temp.sub_avatar_1_data = '';
      this.setState({sub_avatar_list: temp});
    } else if (numberOfImage == IMAGE_2) {
      var temp = this.state.sub_avatar_list;
      temp.sub_avatar_2 = '';
      temp.sub_avatar_2_data = '';
      this.setState({sub_avatar_list: temp});
    } else if (numberOfImage == IMAGE_3) {
      var temp = this.state.sub_avatar_list;
      temp.sub_avatar_3 = '';
      temp.sub_avatar_3_data = '';
      this.setState({sub_avatar_list: temp});
    } else if (numberOfImage == IMAGE_4) {
      var temp = this.state.sub_avatar_list;
      temp.sub_avatar_4 = '';
      temp.sub_avatar_4_data = '';
      this.setState({sub_avatar_list: temp});
    } else if (numberOfImage == IMAGE_ID_FRONT) {
      const {personal_info} = this.state;
      var temp = personal_info;
      temp.id_image_front = '';
      this.setState({
        personal_info: temp,
        id_image_front_data: '',
      });
    } else if (numberOfImage == IMAGE_ID_BEHIND) {
      const {personal_info} = this.state;
      var temp = personal_info;
      temp.id_image_behind = '';
      this.setState({
        personal_info: temp,
        id_image_behind_data: '',
      });
    } else if (numberOfImage == IMAGE_JUDICIAL_RECORD) {
      this.setState({
        judicial_record_image: '',
        judicial_record_image_data: '',
      });
    }
  };
  _handleCloseImageDegree = (index, numberOfImage) => {
    if (numberOfImage == IMAGE_DEGREE_FRONT) {
      var arr = this.state.degree_info;
      arr[index].degree_image_front = '';
      arr[index].degree_image_front_data = '';

      this.setState({degree_info: arr});
    } else if (numberOfImage == IMAGE_DEGREE_BEHIND) {
      var arr = this.state.degree_info;
      arr[index].degree_image_behind = '';
      arr[index].degree_image_behind_data = '';

      this.setState({degree_info: arr});
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

  _handleSelectGender = genderSelect => {
    this.setState({gender: genderSelect});
  };

  _handleSelectProvince = provinceSelect => {
    const {district_list, address} = this.state;
    var temp = address;
    temp.province_id = provinceSelect;
    this.setState({
      address: temp,
      district_list_follow_province: district_list[provinceSelect],
    });
  };

  _handleSelectProvinceRelative = (idRelative, provinceSelect) => {
    const {district_list, user_relative_info} = this.state;
    for (var i = 0; i < user_relative_info.length; i++) {
      if (idRelative == user_relative_info[i].relative_id) {
        var arr = user_relative_info;
        arr[i].relative_province_id = provinceSelect;
        this.setState({
          user_relative_info: arr,
          district_list_follow_province_relative: district_list[provinceSelect],
        });
      }
    }
  };

  _handleSelectDistrict = districtSelect => {
    const {address} = this.state;
    var temp = address;
    temp.district_id = districtSelect;
    this.setState({address: temp});
  };

  _handleSelectDistrictRelative = (idRelative, districtSelect) => {
    const {user_relative_info} = this.state;

    for (var i = 0; i < user_relative_info.length; i++) {
      if (idRelative == user_relative_info[i].relative_id) {
        var arr = user_relative_info;
        arr[i].relative_district_id = districtSelect;
        this.setState({
          user_relative_info: arr,
        });
      }
    }
  };

  _handleAddInfoRelativeItem = () => {
    const objectParams = {
      relative_name: '',
      relative_phone: '',
      relative_province_id: '',
      relative_district_id: '',
      relative_address: '',
    };
    var arr = this.state.user_relative_info;
    arr.push(objectParams);
    this.setState({user_relative_info: arr});
  };

  _handleAddDegreeRelativeItem = () => {
    const objectParams = {
      degree_name: '',
      degree_image_front: '',
      degree_image_front_data: '',
      degree_image_behind: '',
      degree_image_behind_data: '',
    };
    var arr = this.state.degree_info;
    arr.push(objectParams);
    this.setState({degree_info: arr});
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
    const {education} = this.state;
    var temp = education;
    temp.education_id = educationSelect;
    this.setState({
      education: temp,
    });
  };
  _handleSelectBank = bankSelect => {
    const {bank_branch_list, user_bank_info} = this.state;
    var temp = user_bank_info;
    temp.bank_id = bankSelect;
    this.setState({
      user_bank_info: temp,
      bank_branch_list_follow_bank: bank_branch_list[bankSelect],
    });
  };

  _handleSelectBranch = branchSelect => {
    const {user_bank_info} = this.state;
    var temp = user_bank_info;
    temp.bank_branch_id = branchSelect;
    this.setState({user_bank_info: temp});
  };

  _handleSelectPersonalInfo = id_type => {
    const {personal_info} = this.state;
    var temp = personal_info;
    temp.id_type = id_type;
    this.setState({personal_info: temp});
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
    var relative_province_id = data.user_relative_info[0].relative_province_id;
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
      personal_types_list: data.personal_types_list,

      avatar: data.avatar,
      sub_avatar_list: data.sub_avatar_list,
      percent_updated: data.percent_updated,
      first_name: data.first_name,
      last_name: data.last_name,
      birthday: data.birthday,
      gender: data.gender,
      height: data.height,
      weight: data.weight,
      working_places: stringToArray(data.working_places),
      working_majors: stringToArray(data.working_majors),
      address: data.address,
      user_relative_info: data.user_relative_info,
      education: data.education,
      user_bank_info: data.user_bank_info,
      personal_info: data.personal_info,
      judicial_record_image: data.judicial_record_image,
      degree_info: data.degree_info,
    });
  };

  _handleUpdateFullInfo = () => {
    const {doUpdateUserInfo} = this.props;

    const {
      avatar_data,
      sub_avatar_list,
      first_name,
      last_name,
      birthday,
      gender,
      height,
      weight,
      working_places,
      working_majors,
      address,
      user_relative_info,
      education,
      user_bank_info,
      personal_info,
      degree_info,
      judicial_record_image,
      judicial_record_image_data,
    } = this.state;

    if (
      isEmpty(first_name) ||
      isEmpty(last_name) ||
      isEmpty(birthday) ||
      isZero(gender) ||
      isZero(height) ||
      isZero(weight) ||
      isEmpty(address.province_id) ||
      isEmpty(address.district_id) ||
      isEmpty(address.address) ||
      isEmpty(user_relative_info[0].relative_name) ||
      isEmpty(user_relative_info[0].relative_phone) ||
      (user_relative_info.length == 2 &&
        !isEmpty(user_relative_info[1].relative_name) &&
        isEmpty(user_relative_info[1].relative_phone)) ||
      (user_relative_info.length == 2 &&
        isEmpty(user_relative_info[1].relative_name) &&
        !isEmpty(user_relative_info[1].relative_phone)) ||
      isZero(personal_info.id_type) ||
      isEmpty(personal_info.id_image_front) ||
      isEmpty(personal_info.id_image_behind) ||
      isEmpty(judicial_record_image)
    ) {
      showAlert('Vui lòng cung cấp đầy đủ các trường thông tin bắt buộc');
      return;
    }
    if (
      !isEmpty(user_relative_info[0].relative_phone) &&
      !REGEX.test(user_relative_info[0].relative_phone)
    ) {
      showAlert('Số điện thoại không đúng định dạng.');
      return;
    }
    if (
      user_relative_info.length == 2 &&
      !isEmpty(user_relative_info[1].relative_phone) &&
      !REGEX.test(user_relative_info[1].relative_phone)
    ) {
      showAlert('Số điện thoại không đúng định dạng.');
      return;
    }

    const params = {
      avatar: avatar_data,
      //
      sub_avatar_1: sub_avatar_list.sub_avatar_1_data,
      sub_avatar_2: sub_avatar_list.sub_avatar_2_data,
      sub_avatar_3: sub_avatar_list.sub_avatar_3_data,
      sub_avatar_4: sub_avatar_list.sub_avatar_4_data,
      //
      first_name: first_name,
      last_name: last_name,
      birthday: birthday,
      gender: gender,
      height: height,
      weight: weight,
      working_places: arrayToString(working_places),
      working_majors: arrayToString(working_majors),
      //
      province_id: address.province_id,
      district_id: address.district_id,
      address: address.address,
      //
      relative_name_1: user_relative_info[0].relative_name,
      relative_phone_1: user_relative_info[0].relative_phone,
      relative_province_id_1: user_relative_info[0].relative_province_id,
      relative_district_id_1: user_relative_info[0].relative_district_id,
      relative_address_1: user_relative_info[0].relative_address,
      relative_name_2:
        user_relative_info.length == 2
          ? user_relative_info[1].relative_name
          : '',
      relative_phone_2:
        user_relative_info.length == 2
          ? user_relative_info[1].relative_phone
          : '',
      relative_province_id_2:
        user_relative_info.length == 2
          ? user_relative_info[1].relative_province_id
          : '',
      relative_district_id_2:
        user_relative_info.length == 2
          ? user_relative_info[1].relative_district_id
          : '',
      relative_address_2:
        user_relative_info.length == 2
          ? user_relative_info[1].relative_address
          : '',
      //
      education_id: education.education_id,
      education_major_name: education.education_major_name,
      //
      bank_id: user_bank_info.bank_id,
      bank_branch_id: user_bank_info.bank_branch_id,
      bank_account_name: user_bank_info.bank_account_name,
      bank_account_number: user_bank_info.bank_account_number,
      //
      id_type: personal_info.id_type,
      id_image_front: personal_info.id_image_front_data,
      id_image_behind: personal_info.id_image_behind_data,
      //
      degree_name_1: degree_info[0].degree_name,
      degree_image_front_1: degree_info[0].degree_image_front_data,
      degree_image_behind_1: degree_info[0].degree_image_behind_data,
      //
      degree_name_2: degree_info.length == 2 ? degree_info[1].degree_name : '',
      degree_image_front_2:
        degree_info.length == 2 ? degree_info[1].degree_image_front_data : '',
      degree_image_behind_2:
        degree_info.length == 2 ? degree_info[1].degree_image_behind_data : '',
      //
      degree_name_3: degree_info.length == 3 ? degree_info[2].degree_name : '',
      degree_image_front_3:
        degree_info.length == 3 ? degree_info[2].degree_image_front_data : '',
      degree_image_behind_3:
        degree_info.length == 3 ? degree_info[2].degree_image_behind_data : '',
      //
      degree_name_4: degree_info.length == 4 ? degree_info[3].degree_name : '',
      degree_image_front_4:
        degree_info.length == 4 ? degree_info[3].degree_image_front_data : '',
      degree_image_behind_4:
        degree_info.length == 4 ? degree_info[3].degree_image_behind_data : '',
      //
      degree_name_5: degree_info.length == 5 ? degree_info[4].degree_name : '',
      degree_image_front_5:
        degree_info.length == 5 ? degree_info[4].degree_image_front_data : '',
      degree_image_behind_5:
        degree_info.length == 5 ? degree_info[4].degree_image_behind_data : '',
      //
      judicial_record_image: judicial_record_image_data,
      type: 'full_detail',
    };

    if (token != '') {
      this.setState({isLoading: true});
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
      this.setState({
        isLoading: false,
        percent_updated: nextProps.data.percent_updated,
      });
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.UPDATE_USER_INFO_FAIL) {
      showAlert('Cập nhật thông tin thất bại');
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
    }
  }

  _goBack = navigation => {
    navigation.state.params.onGoBack(
      this.state.percent_updated,
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
              <SpinnerComponent visible={this.state.isLoading} />

              {this._renderBirthdayPicker()}
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
                sub_avatar_list={this.state.sub_avatar_list}
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
                onChangeTextRelative={this._onChangeTextRelative}
                //
                province_list={this.state.province_list}
                district_list_follow_province={
                  this.state.district_list_follow_province
                }
                district_list_follow_province_relative={
                  this.state.district_list_follow_province_relative
                }
                //
                address={this.state.address}
                user_relative_info={this.state.user_relative_info}
                //
                handleSelectProvince={this._handleSelectProvince}
                handleSelectDistrict={this._handleSelectDistrict}
                //
                handleSelectProvinceRelative={
                  this._handleSelectProvinceRelative
                }
                handleSelectDistrictRelative={
                  this._handleSelectDistrictRelative
                }
                handleAddInfoRelativeItem={this._handleAddInfoRelativeItem}
              />
              <View style={styles.boxIndicatorFill} />

              <FormLevel
                myScroll={this._myScroll}
                handleScrollView={this._handleScrollView}
                enableScrollViewScroll={this.state.enableScrollViewScroll}
                onChangeText={this._onChangeText}
                education_list={this.state.education_list}
                education={this.state.education}
                handleSelectEducation={this._handleSelectEducation}
              />
              <View style={styles.boxIndicatorFill} />
              <FormAccountIdentifier
                myScroll={this._myScroll}
                handleScrollView={this._handleScrollView}
                enableScrollViewScroll={this.state.enableScrollViewScroll}
                onChangeText={this._onChangeText}
                onChangeTextDegree={this._onChangeTextDegree}
                bank_list={this.state.bank_list}
                bank_branch_list_follow_bank={
                  this.state.bank_branch_list_follow_bank
                }
                province_list={this.state.province_list}
                personal_types_list={this.state.personal_types_list}
                //
                user_bank_info={this.state.user_bank_info}
                personal_info={this.state.personal_info}
                judicial_record_image={this.state.judicial_record_image}
                degree_info={this.state.degree_info}
                //
                handleSelectBank={this._handleSelectBank}
                handleSelectBranch={this._handleSelectBranch}
                handleSelectPersonalInfo={this._handleSelectPersonalInfo}
                showPickerIdentification={this._showPickerIdentification}
                handleSelectProvinceIdentification={
                  this._handleSelectProvinceIdentification
                }
                handleOpenImage={this._handleOpenImage}
                handleCloseImage={this._handleCloseImage}
                handleAddDegreeRelativeItem={this._handleAddDegreeRelativeItem}
                handleOpenImageDegree={this._handleOpenImageDegree}
                handleCloseImageDegree={this._handleCloseImageDegree}
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
