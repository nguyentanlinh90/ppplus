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
      gender_list: [],
      province_list: [],
      district_list:[],
      major_list: [],

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
      province_id: 0,

      isDateTimePickerVisible: false,
      isShowPopupSelectGender: false,
      isShowPopupSelectLevel: false,
      valueLevel: text_select,
      isShowPopupSelectCity: false,
      valueCity: text_select,
      valueCityRelative: text_select,
      isCityRelative: !ADDRESS_OF_RELATIVE,
      isShowPopupSelectDistrict: false,
      valueDistrict: text_select,
      valueDistrictRelative: text_select,
      isDistrictRelative: !ADDRESS_OF_RELATIVE,
      address: '',
      nameRelative: '',
      phoneRelative: '',
      addressRelative: '',
      major: '',
      isShowPopupSelectBank: false,
      valueBank: text_select,
      bankBranch: '',
      accountBankName: '',
      accountBankNumber: '',
      degreeName: '',
      city: text_select,
      industry: text_select,
      urlIDFront: '',
      urlIDBehind: '',
      urlDegree: '',
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
    } else if (type == 'measure_1') {
      this.setState({measure_1: text});
    } else if (type == 'measure_2') {
      this.setState({measure_2: text});
    } else if (type == 'measure_3') {
      this.setState({measure_3: text});
    } else if (type == 'major') {
      this.setState({major: text});
    } else if (type == 'address') {
      this.setState({address: text});
    } else if (type == 'nameRelative') {
      this.setState({nameRelative: text});
    } else if (type == 'phoneRelative') {
      this.setState({phoneRelative: text});
    } else if (type == 'addressRelative') {
      this.setState({addressRelative: text});
    } else if (type == 'bankBranch') {
      this.setState({bankBranch: text});
    } else if (type == 'accountBankName') {
      this.setState({accountBankName: text});
    } else if (type == 'accountBankNumber') {
      this.setState({accountBankNumber: text});
    } else if (type == 'degreeName') {
      this.setState({degreeName: text});
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
  _showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  _hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  _handleDatePicked = date => {
    const dateFormat = moment(date).format('DD-MM-YYYY');
    this.setState({birthday: dateFormat});
    this._hideDateTimePicker();
  };

  _renderDOBPicker() {
    return (
      <DateTimePicker
        isVisible={this.state.isDateTimePickerVisible}
        onConfirm={this._handleDatePicked}
        onCancel={this._hideDateTimePicker}
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

  _handleShowSelectGender = () => {
    this.setState({isShowPopupSelectGender: true});
  };
  _handleShowSelectLevel = () => {
    this.setState({isShowPopupSelectLevel: true});
  };

  _handleShowSelectBank = () => {
    this.setState({isShowPopupSelectBank: true});
  };

  _handleShowSelectCity = isCityRelative => {
    this.setState({
      isShowPopupSelectCity: true,
      isCityRelative: isCityRelative,
    });
  };

  _handleShowSelectDistrict = isDistrictRelative => {
    this.setState({
      isShowPopupSelectDistrict: true,
      isDistrictRelative: isDistrictRelative,
    });
  };

  _selectCity = citySelect => {
    if (this.state.city.includes(citySelect)) {
      var cityTemp = this.state.city
        .replace(citySelect + '; ', '')
        .replace('; ' + citySelect, '')
        .replace(citySelect, '');
      if (cityTemp == '') {
        cityTemp = text_select;
      }
      this.setState({city: cityTemp});
      return;
    }
    this.setState({
      city: (this.state.city + '; ' + citySelect).replace(
        text_select + '; ',
        '',
      ),
    });
  };

  _selectIndustry = industrySelect => {
    if (this.state.industry.includes(industrySelect)) {
      var industryTemp = this.state.industry
        .replace(industrySelect + '; ', '')
        .replace('; ' + industrySelect, '')
        .replace(industrySelect, '');
      if (industryTemp == '') {
        industryTemp = text_select;
      }
      this.setState({industry: industryTemp});
      return;
    }
    this.setState({
      industry: (this.state.industry + '; ' + industrySelect).replace(
        text_select + '; ',
        '',
      ),
    });
  };

  _handleSelectGender = genderSelect => {
    this.setState({gender: genderSelect});
  };

  _handleSelectProvince = provinceSelect => {
    this.setState({province_id: provinceSelect});
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

  _getUserInfo = token => {
    const {getUserInfo} = this.props;
    getUserInfo('full', token);
  };

  _setUser = data => {
    this.setState({
      gender_list: data.gender_list,
      province_list: data.province_list,
      district_list: data.district_list,
      major_list: data.major_list,

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
      province_id: data.province_id
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
            {this._renderDOBPicker()}

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
              showDateTimePicker={this._showDateTimePicker}
              handleSelectGender={this._handleSelectGender}
              handleSelectProvinces={this._handleSelectProvinces}
              handleSelectMajors={this._handleSelectMajors}
            />
            <View style={styles.boxIndicatorFill} />
            <FormContactInfo
              onChangeText={this._onChangeText}

              province_list={this.state.province_list}

              province_id={this.state.province_id}


              handleSelectProvince={this._handleSelectProvince}

              showSelectCity={this._handleShowSelectCity}
              valueCity={this.state.valueCity}
              valueCityRelative={this.state.valueCityRelative}
              showSelectDistrict={this._handleShowSelectDistrict}
              valueDistrict={this.state.valueDistrict}
              valueDistrictRelative={this.state.valueDistrictRelative}
              address={this.state.address}
              addressRelative={this.state.addressRelative}
              nameRelative={this.state.nameRelative}
              phoneRelative={this.state.phoneRelative}
            />
            <View style={styles.boxIndicatorFill} />

            <FormLevel
              onChangeText={this._onChangeText}
              showSelectLevel={this._handleShowSelectLevel}
              valueLevel={this.state.valueLevel}
              major={this.state.major}
            />
            <View style={styles.boxIndicatorFill} />
            <FormAccountIdentifier
              onChangeText={this._onChangeText}
              showSelectBank={this._handleShowSelectBank}
              valueBank={this.state.valueBank}
              bankBranch={this.state.bankBranch}
              accountBankName={this.state.accountBankName}
              accountBankNumber={this.state.accountBankNumber}
              urlIDFront={this.state.urlIDFront}
              urlIDBehind={this.state.urlIDBehind}
              urlDegree={this.state.urlDegree}
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
