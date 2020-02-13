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
import FormLevel from '../component/FormLevel';
import FormAccountIdentifier from '../component/FormAccountIdentifier';
import {SCREEN_PROFILE} from '../../../api/screen';
import KeyboardShift from './KeyboardShift';
import PopupSelectLevel from '../component/PopupSelectLevel';
import PopupSelectGender from '../component/PopupSelectGender';
const IMAGE_AVATAR = 0;
const IMAGE_1 = 1;
const IMAGE_2 = 2;
const IMAGE_3 = 3;

var list_Gender = [
  {label: 'Nam     ', value: 0},
  {label: 'Nữ', value: 1},
];

var list_Level = [
  {label: 'Trung Học Cơ Sở', value: 0},
  {label: 'Trung Học Phổ Thông', value: 1},
  {label: 'Trung Cấp', value: 2},
  {label: 'Cao Đẳng', value: 3},
  {label: 'Đại Học', value: 4},
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
      urlAvatar: 'http://via.placeholder.com/100x100',
      urlImage_1: '',
      urlImage_2: '',
      urlImage_3: '',
      urlImage_4: '',
      lastName: '',
      firstName: '',
      isDateTimePickerVisible: false,
      dob: '',
      showGenderSelect: false,
      genderValue: -1,
      height: 0,
      weight: 0,
      measure_1: 0,
      measure_2: 0,
      measure_3: 0,
      showLevelSelect: false,
      levelValue: -1,
      major: '',
      contact: '',
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
    } else if (type == 'contact') {
      this.setState({contact: text});
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

  _handleShowGenderSelect = () => {
    this.setState({showGenderSelect: true});
  };
  _handleShowLevelSelect = () => {
    this.setState({showLevelSelect: true});
  };
  _renderGenderPicker() {
    let genderValueTmp = this.state.genderValue;
    return (
      <Modal
        backdropOpacity={0.4}
        backdropColor="#000"
        useNativeDriver={true}
        animationIn={'slideInUp'}
        animationInTiming={300}
        animationOut={'slideOutDown'}
        animationOutTiming={300}
        isVisible={this.state.showGenderSelect}
        style={{margin: 15}}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 20,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16}}>Chọn giới tính</Text>
          <RadioForm
            style={{marginBottom: 20, marginTop: 20}}
            radio_props={list_Gender}
            initial={genderValueTmp}
            formHorizontal={true}
            buttonColor={'#F0532D'}
            selectedButtonColor={'#F0532D'}
            labelStyle={{fontSize: 18}}
            onPress={value => {
              genderValueTmp = value;
            }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={{backgroundColor: '#F0532D', borderRadius: 30}}
            onPress={() =>
              this.setState({
                showGenderSelect: false,
                genderValue: genderValueTmp,
              })
            }>
            <Text style={styles.btSelectGender}>Đồng ý</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  render() {
    const {percentage, name} = this.props;
    return (
      <KeyboardShift>
        {() => (
          <ScrollView style={styles.container}>
            {this._renderDOBPicker()}
            <PopupSelectGender
              isVisible={this.state.showGenderSelect}
              genderValue={this.state.genderValue}
              listGender={list_Gender}
              onConfirm={genderSelect =>
                this.setState({
                  showGenderSelect: false,
                  genderValue: genderSelect,
                })
              }
            />
            <PopupSelectLevel
              isVisible={this.state.showLevelSelect}
              levelValue={this.state.levelValue}
              listLevel={list_Level}
              onConfirm={levelSelect =>
                this.setState({
                  showLevelSelect: false,
                  levelValue: levelSelect,
                })
              }
            />
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
            <View style={[styles.boxIndicatorFill, {height: 5}]} />
            <FormBasicInfo
              onChangeText={this._onChangeText}
              lastName={this.state.lastName}
              firstName={this.state.firstName}
              showDateTimePicker={this._showDateTimePicker}
              txtDOB={this.state.dob ? this.state.dob : 'Chọn'}
              showGenderSelect={this._handleShowGenderSelect}
              txtGender={this.state.genderValue}
              height={this.state.height}
              weight={this.state.weight}
              measure_1={this.state.measure_1}
              measure_3={this.state.measure_2}
              measure_3={this.state.measure_3}
            />
            <View style={styles.boxIndicatorFill} />
            <FormLevel
              onChangeText={this._onChangeText}
              showLevelSelect={this._handleShowLevelSelect}
              txtLevel={this.state.levelValue}
              major={this.state.major}
            />
            <View style={styles.boxIndicatorFill} />
            <FormAccountIdentifier
              onChangeText={this._onChangeText}
              contact={this.state.contact}
            />
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
