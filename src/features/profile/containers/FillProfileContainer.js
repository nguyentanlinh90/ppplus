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
import {ADDRESS_OF_RELATIVE} from '../../../utils/constants';
import {text_select} from '../../../utils/constants';
import {changeMsgCode} from '../../home/actions/index';
import {getUserInfo} from '../../../features/user/actions';
import {ACCESS_TOKEN} from '../../../utils/constants';
import * as types from '../../../api/types';
import {
  showAlert,
  handleCheck,
  arrayToString,
  stringToArray,
} from '../../../utils/utils';

const IMAGE_AVATAR = 0;
import {
  IMAGE_1,
  IMAGE_2,
  IMAGE_3,
  IMAGE_4,
  IMAGE_ID_FRONT,
  IMAGE_ID_BEHIND,
  IMAGE_DEGREE,
} from '../../../utils/constants';

export class FillProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      urlImage_1: '',
      urlImage_2: '',
      urlImage_3: '',
      urlImage_4: '',

      avatar: '',
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
      name_relative: '',
      phone_relative: '',
      province_id_relative: '',
      district_id_relative: '',
      address_relative: '',
      education_id: '',
      education_degree_name: '',
      education_degree_images: '',
      education_major_name: '',
      bank_id: '',
      branch_id: '',
      account_name: '',
      number_account: '',
      number: '',
      issue_date: text_select,
      issue_place: '',
      front_image: '',
      behind_image: '',
      degree_name: '',
      degree_image: '',
    };
    this._onChangeText = this._onChangeText.bind(this);
    this._getToken();
  }

  async _getToken() {
    var token = await AsyncStorage.getItem(ACCESS_TOKEN);
    if (token && token != '') {
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
    } else if (type == 'name_relative') {
      this.setState({name_relative: text});
    } else if (type == 'phone_relative') {
      this.setState({phone_relative: text});
    } else if (type == 'address_relative') {
      this.setState({address_relative: text});
    } else if (type == 'education_major_name') {
      this.setState({education_major_name: text});
    } else if (type == 'account_name') {
      this.setState({account_name: text});
    } else if (type == 'number_account') {
      this.setState({number_account: text});
    } else if (type == 'degree_name') {
      this.setState({degree_name: text});
    } else if (type == 'number') {
      this.setState({number: text});
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
          });
        } else if (numberOfImage == IMAGE_1) {
          this.setState({
            showButtonAdd_1: false,
            urlImage_1: response.uri,
          });
        } else if (numberOfImage == IMAGE_2) {
          this.setState({
            showButtonAdd_2: false,
            urlImage_2: response.uri,
          });
        } else if (numberOfImage == IMAGE_3) {
          this.setState({
            showButtonAdd_3: false,
            urlImage_3: response.uri,
          });
        } else if (numberOfImage == IMAGE_4) {
          this.setState({
            showButtonAdd_4: false,
            urlImage_4: response.uri,
          });
        } else if (numberOfImage == IMAGE_ID_FRONT) {
          this.setState({
            urlIDFront: response.uri,
          });
        } else if (numberOfImage == IMAGE_ID_BEHIND) {
          this.setState({
            urlIDBehind: response.uri,
          });
        } else if (numberOfImage == IMAGE_DEGREE) {
          this.setState({
            urlDegree: response.uri,
          });
        }
      }
    });
  };

  _handleCloseImage = numberOfImage => {
    if (numberOfImage == IMAGE_1) {
      this.setState({
        urlImage_1: '',
      });
    } else if (numberOfImage == IMAGE_2) {
      this.setState({
        urlImage_2: '',
      });
    } else if (numberOfImage == IMAGE_3) {
      this.setState({
        urlImage_3: '',
      });
    } else if (numberOfImage == IMAGE_4) {
      this.setState({
        urlImage_4: '',
      });
    } else if (numberOfImage == IMAGE_ID_FRONT) {
      this.setState({
        urlIDFront: '',
      });
    } else if (numberOfImage == IMAGE_ID_BEHIND) {
      this.setState({
        urlIDBehind: '',
      });
    } else if (numberOfImage == IMAGE_DEGREE) {
      this.setState({
        urlDegree: '',
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
    const dateFormat = moment(date).format('DD-MM-YYYY');
    this.setState({birthday: dateFormat});
    this._hidePicker();
  };

  _renderBirthdayPicker() {
    return (
      <DateTimePicker
        isVisible={this.state.isShowBirthday}
        onConfirm={this._handleDatePicked}
        onCancel={this._hidePicker}
        mode="date"
        locale="vi"
        minimumDate={new Date('01/01/1950')}
        maximumDate={new Date()}
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
    const dateFormat = moment(date).format('DD-MM-YYYY');
    this.setState({issue_date: dateFormat});
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
        province_id_relative: provinceSelect,
        district_list_follow_province_relative: district_list[provinceSelect],
      });
    }
  };

  _handleSelectDistrict = (isUser, districtSelect) => {
    if (isUser) {
      this.setState({district_id: districtSelect});
    } else {
      this.setState({district_id_relative: districtSelect});
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
    this.setState({branch_id: branchSelect});
  };

  _handleSelectProvinceIdentification = provinceSelect => {
    this.setState({
      issue_place: provinceSelect,
    });
  };

  _getUserInfo = token => {
    const {getUserInfo} = this.props;
    getUserInfo('full', token);
  };

  _setUser = data => {
    var province_id_relative = data.user_relative_info.province_id_relative;
    var province_id = data.address.province_id;

    this.setState({
      gender_list: data.gender_list,
      province_list: data.province_list,
      district_list: data.district_list,
      district_list_follow_province:
        province_id == '' ? [] : data.district_list[province_id],
      district_list_follow_province_relative:
        province_id_relative == ''
          ? []
          : data.district_list[province_id_relative],
      major_list: data.major_list,
      education_list: data.education_list,
      bank_list: data.bank_list,
      bank_branch_list:data.bank_branch_list,

      avatar: data.avatar,
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
      name_relative: data.user_relative_info.name_relative,
      phone_relative: data.user_relative_info.phone_relative,
      province_id_relative: data.user_relative_info.province_id_relative,
      district_id_relative: data.user_relative_info.district_id_relative,
      address_relative: data.user_relative_info.address_relative,
      education_id: data.education.education_id,
      education_degree_name: data.education.education_degree_name,
      education_major_name: data.education.education_major_name,
      education_degree_images: data.education.education_degree_images,
      bank_id: data.user_bank_info.bank_id,
      branch_id: data.user_bank_info.branch_id,
      account_name: data.user_bank_info.account_name,
      number_account: data.user_bank_info.number_account,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log('linhnt nextProps data', nextProps.data);

    if (nextProps.msg_code == types.GET_USER_INFO_SUCCESS) {
      // nextProps.changeMsgCode('');
      this.setState({isLoading: false});
      this._setUser(nextProps.data);
    } else if (nextProps.msg_code == types.GET_USER_INFO_FAIL) {
      showAlert(nextProps.message);
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
    }
  }

  render() {
    const {percent_updated, name, user} = this.props;
    return (
      <KeyboardShift>
        {() => (
          <ScrollView style={styles.container}>
            <Spinner
              visible={this.state.isLoading}
              color={'white'}
              size={'large'}
              textStyle={{color: '#fff'}}
            />
            {this._renderBirthdayPicker()}
            {this._renderIdentificationPicker()}

            <TouchableOpacity
              style={styles.viewEdit}
              onPress={() => {
                this.props.navigation.state.params.onGoBack('Linh Nguyen');
                this.props.navigation.goBack();
              }}>
              <Text style={styles.txtSave}>Lưu</Text>
            </TouchableOpacity>
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
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <FormImageProfile
              urlImage_1={this.state.urlImage_1}
              urlImage_2={this.state.urlImage_2}
              urlImage_3={this.state.urlImage_3}
              urlImage_4={this.state.urlImage_4}
              handleOpenImage={this._handleOpenImage}
              handleCloseImage={this._handleCloseImage}
            />
            <View style={styles.boxIndicatorFill} />
            <FormBasicInfo
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
              name_relative={this.state.name_relative}
              phone_relative={this.state.phone_relative}
              province_id_relative={this.state.province_id_relative}
              district_id_relative={this.state.district_id_relative}
              address_relative={this.state.address_relative}
              //
              handleSelectProvince={this._handleSelectProvince}
              handleSelectDistrict={this._handleSelectDistrict}
            />
            <View style={styles.boxIndicatorFill} />

            <FormLevel
              onChangeText={this._onChangeText}
              education_list={this.state.education_list}
              education_id={this.state.education_id}
              education_major_name={this.state.education_major_name}
              handleSelectEducation={this._handleSelectEducation}
            />
            <View style={styles.boxIndicatorFill} />
            <FormAccountIdentifier
              onChangeText={this._onChangeText}
              bank_list={this.state.bank_list}
              bank_branch_list_follow_bank={
                this.state.bank_branch_list_follow_bank
              }
              province_list={this.state.province_list}
              bank_id={this.state.bank_id}
              branch_id={this.state.branch_id}
              account_name={this.state.account_name}
              number_account={this.state.number_account}
              number={this.state.number}
              issue_place={this.state.issue_place}
              issue_date={this.state.issue_date}
              front_image={this.state.front_image}
              behind_image={this.state.behind_image}
              handleSelectBank={this._handleSelectBank}
              handleSelectBranch={this._handleSelectBranch}
              showPickerIdentification={this._showPickerIdentification}
              handleSelectProvinceIdentification={
                this._handleSelectProvinceIdentification
              }
              handleOpenImage={this._handleOpenImage}
              degreeName={this.state.degreeName}
              handleCloseImage={this._handleCloseImage}
            />
            <View style={styles.boxIndicatorFill} />
          </ScrollView>
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
  changeMsgCode,
})(FillProfileContainer);
