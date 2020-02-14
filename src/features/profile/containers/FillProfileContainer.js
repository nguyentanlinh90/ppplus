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
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Modal from 'react-native-modal';
import RadioForm from 'react-native-simple-radio-button';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import styles from '../styles/styles';
import FormImageProfile from '../component/FormImageProfile';
import FormBasicInfo from '../component/FormBasicInfo';
import FormContactInfo from '../component/FormContactInfo';
import FormLevel from '../component/FormLevel';
import FormAccountIdentifier from '../component/FormAccountIdentifier';
import {SCREEN_PROFILE} from '../../../api/screen';
import KeyboardShift from './KeyboardShift';
import PopupSelect from '../component/PopupSelect';
import {ADDRESS_OF_RELATIVE} from '../../../utils/constants';
import {text_select} from '../../../utils/constants';
const IMAGE_AVATAR = 0;
const IMAGE_1 = 1;
const IMAGE_2 = 2;
const IMAGE_3 = 3;

var listGender = [
  {label: 'Nam     ', value: 0},
  {label: 'Nữ', value: 1},
];

var listLevel = [
  {label: 'Trung Học Cơ Sở', value: 0},
  {label: 'Trung Học Phổ Thông', value: 1},
  {label: 'Trung Cấp', value: 2},
  {label: 'Cao Đẳng', value: 3},
  {label: 'Đại Học', value: 4},
];
var listCity = [
  {label: 'Hồ Chí Minh', value: 0},
  {label: 'Hà Nội', value: 1},
];
var listDistrict = [
  {label: 'Quận 1', value: 0},
  {label: 'Quận 2', value: 1},
  {label: 'Quận 3', value: 2},
];
var listBank = [
  {label: 'Vietcombank', value: 0},
  {label: 'Sacombank', value: 1},
  {label: 'ACB', value: 2},
];
class FillProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 20,
      showButtonAdd_1: true,
      showButtonAdd_2: true,
      showButtonAdd_3: true,
      showButtonAdd_4: true,
      urlAvatar: 'http://via.placeholder.com/150x150',
      urlImage_1: '',
      urlImage_2: '',
      urlImage_3: '',
      urlImage_4: '',
      lastName: '',
      firstName: '',
      isDateTimePickerVisible: false,
      dob: '',
      isShowPopupSelectGender: false,
      valueGender: text_select,
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
      height: 0,
      weight: 0,
      major: '',
      isShowPopupSelectBank: false,
      valueBank: text_select,
      bankBranch: '',
      accountBankName: '',
      accountBankNumber: '',
      degreeName: '',
      city: text_select,
      industry: text_select,
    };
    this._onChangeText = this._onChangeText.bind(this);
  }
  _onChangeText = (text, type) => {
    if (type == 'lastName') {
      this.setState({lastName: text});
    } else if (type == 'firstName') {
      this.setState({firstName: text});
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
    }else if (type == 'bankBranch') {
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
            urlAvatar: response.uri,
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
        } else {
          this.setState({
            showButtonAdd_4: false,
            urlImage_4: response.uri,
          });
        }
      }
    });
  };

  _handleCloseImage = numberOfImage => {
    if (numberOfImage == IMAGE_1) {
      this.setState({
        showButtonAdd_1: true,
        urlImage_1: '',
      });
    } else if (numberOfImage == IMAGE_2) {
      this.setState({
        showButtonAdd_2: true,
        urlImage_2: '',
      });
    } else if (numberOfImage == IMAGE_3) {
      this.setState({
        showButtonAdd_3: true,
        urlImage_3: '',
      });
    } else {
      this.setState({
        showButtonAdd_4: true,
        urlImage_4: '',
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
    const dateFormat = moment(date).format('DD/MM/YYYY');
    this.setState({dob: dateFormat});
    this._hideDateTimePicker();
  };

  _renderDOBPicker() {
    return (
      <DateTimePicker
        isVisible={this.state.isDateTimePickerVisible}
        onConfirm={this._handleDatePicked}
        onCancel={this._hideDateTimePicker}
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

  _popupSelectGender = () => {
    return (
      <PopupSelect
        title="Chọn giới tính"
        isVisible={this.state.isShowPopupSelectGender}
        data={this.state.valueGender}
        listData={listGender}
        onConfirm={dataSelect =>
          this.setState({
            isShowPopupSelectGender: false,
            valueGender: dataSelect,
          })
        }
      />
    );
  };

  _popupSelectLevel = () => {
    return (
      <PopupSelect
        title="Chọn trình độ"
        isVisible={this.state.isShowPopupSelectLevel}
        data={this.state.valueLevel}
        listData={listLevel}
        onConfirm={dataSelect =>
          this.setState({
            isShowPopupSelectLevel: false,
            valueLevel: dataSelect,
          })
        }
      />
    );
  };

  _popupSelectCity = typeUser => {
    return (
      <PopupSelect
        title="Chọn Tỉnh / Thành Phố"
        isVisible={this.state.isShowPopupSelectCity}
        data={
          this.state.isCityRelative
            ? this.state.valueCityRelative
            : this.state.valueCity
        }
        listData={listCity}
        onConfirm={dataSelect => {
          this.setState({
            isShowPopupSelectCity: false,
          });
          if (this.state.isCityRelative) {
            this.setState({
              valueCityRelative: dataSelect,
            });
          } else {
            this.setState({
              valueCity: dataSelect,
            });
          }
        }}
      />
    );
  };
  _popupSelectDistrict = typeUser => {
    return (
      <PopupSelect
        title="Chọn Quận / Huyện"
        isVisible={this.state.isShowPopupSelectDistrict}
        data={
          this.state.isDistrictRelative
            ? this.state.valueDistrictRelative
            : this.state.valueDistrict
        }
        listData={listDistrict}
        onConfirm={dataSelect => {
          this.setState({
            isShowPopupSelectDistrict: false,
          });
          if (this.state.isDistrictRelative) {
            this.setState({
              valueDistrictRelative: dataSelect,
            });
          } else {
            this.setState({
              valueDistrict: dataSelect,
            });
          }
        }}
      />
    );
  };

  _popupSelectBank = () => {
    return (
      <PopupSelect
        title="Chọn ngân hàng"
        isVisible={this.state.isShowPopupSelectBank}
        data={this.state.valueBank}
        listData={listBank}
        onConfirm={dataSelect =>
          this.setState({
            isShowPopupSelectBank: false,
            valueBank: dataSelect,
          })
        }
      />
    );
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

  render() {
    const {percentage, name} = this.props;
    return (
      <KeyboardShift>
        {() => (
          <ScrollView style={styles.container}>
            {this._renderDOBPicker()}
            {this._popupSelectGender()}
            {this._popupSelectLevel()}
            {this._popupSelectCity()}
            {this._popupSelectDistrict()}
            {this._popupSelectBank()}

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
                percent={this.state.percentage}
                radius={58}
                borderWidth={3}
                color="#F0532D"
                shadowColor="#d8d8d8"
                bgColor="#fff"
              />
              <Image
                resizeMode="cover"
                source={{uri: this.state.urlAvatar}}
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
              showButtonAdd_1={this.state.showButtonAdd_1}
              showButtonAdd_2={this.state.showButtonAdd_2}
              showButtonAdd_3={this.state.showButtonAdd_3}
              showButtonAdd_4={this.state.showButtonAdd_4}
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
              lastName={this.state.lastName}
              firstName={this.state.firstName}
              showDateTimePicker={this._showDateTimePicker}
              txtDOB={this.state.dob ? this.state.dob : 'Chọn'}
              showSelectGender={this._handleShowSelectGender}
              txtGender={this.state.valueGender}
              height={this.state.height}
              weight={this.state.weight}
              selectCity={this._selectCity}
              city={this.state.city}
              selectIndustry={this._selectIndustry}
              industry={this.state.industry}
            />
             <View style={[styles.boxIndicatorFill,{marginTop:20}]} />
            <FormContactInfo
              onChangeText={this._onChangeText}
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
              degreeName={this.state.degreeName}
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
    state: state,
  };
}
export default connect(mapStateToProps, {})(FillProfileContainer);
