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
import {Dialog} from 'react-native-simple-dialogs';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import styles from '../../../styles/styles';
import stylesProfile from '../styles/styles';
import AddImageComponent from '../component/AddImageComponent';
import BasicInfoForm from '../component/BasicInfoForm';
import LevelForm from '../component/LevelForm';
import ContactForm from '../component/ContactForm';
import {SCREEN_PROFILE} from '../../../api/screen';
import KeyboardShift from './KeyboardShift';
const IMAGE_AVATAR = 0;
const IMAGE_1 = 1;
const IMAGE_2 = 2;
const IMAGE_3 = 3;

const options = {
  title: 'Chọn ảnh',
  cancelButtonTitle: 'Hủy',
  takePhotoButtonTitle: 'Chụp từ Camera',
  chooseFromLibraryButtonTitle: 'Chọn từ thư viện',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
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
      isCollapsedBasicInfo: true,
      isCollapsedLevel: true,
      isCollapsedContact: true,
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
      <Dialog
        visible={this.state.showGenderSelect}
        onTouchOutside={() => this.setState({showGenderSelect: false})}>
        <View style={{alignItems: 'center'}}>
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
            <Text style={stylesProfile.btSelectGender}>Đồng ý</Text>
          </TouchableOpacity>
        </View>
      </Dialog>
    );
  }
  _renderLevelPicker() {
    let levelValueTmp = this.state.levelValue;
    return (
      <Dialog
        visible={this.state.showLevelSelect}
        onTouchOutside={() => this.setState({showLevelSelect: false})}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 16}}>Chọn trình độ</Text>
          <RadioForm
            style={{marginBottom: 20, marginTop: 20}}
            radio_props={list_Level}
            initial={levelValueTmp}
            buttonColor={'#F0532D'}
            selectedButtonColor={'#F0532D'}
            labelStyle={{fontSize: 18, marginBottom: 20}}
            onPress={value => {
              levelValueTmp = value;
            }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={{backgroundColor: '#F0532D', borderRadius: 30}}
            onPress={() =>
              this.setState({
                showLevelSelect: false,
                levelValue: levelValueTmp,
              })
            }>
            <Text style={stylesProfile.btSelectGender}>Đồng ý</Text>
          </TouchableOpacity>
        </View>
      </Dialog>
    );
  }

  render() {
    const {percentage, name} = this.props;
    return (
      <KeyboardShift>
        {() => (
          <ScrollView style={stylesProfile.container}>
            {this._renderDOBPicker()}
            {this._renderGenderPicker()}
            {this._renderLevelPicker()}
            <TouchableOpacity
              style={stylesProfile.viewEdit}
              onPress={() => {
                this.props.navigation.state.params.onGoBack('Linh Nguyen');
                this.props.navigation.goBack();
              }}>
              <Text style={stylesProfile.txtSave}>Save</Text>
            </TouchableOpacity>
            <View style={stylesProfile.viewCircleAvatar}>
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
                style={stylesProfile.circleAvatarFill}
              />
              <View style={stylesProfile.viewCamera}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => this._handleOpenImage(IMAGE_AVATAR)}>
                  <View style={stylesProfile.boxCamera}>
                    <Image
                      resizeMode="contain"
                      source={require('../../../assets/images/ic-camera.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <AddImageComponent
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
            <View style={[stylesProfile.boxIndicatorFill, {height: 5}]} />
            <Collapse
              isCollapsed={this.state.isCollapsedBasicInfo}
              onToggle={isCollapsed =>
                this.setState({isCollapsedBasicInfo: isCollapsed})
              }>
              <CollapseHeader>
                <View style={stylesProfile.boxTitleFill}>
                  <Text style={stylesProfile.txtBasicInfo}>
                    THÔNG TIN CƠ BẢN
                  </Text>
                  <View style={stylesProfile.boxArrow}>
                    {this.state.isCollapsedBasicInfo ? (
                      <Image
                        resizeMode="contain"
                        source={require('../../../assets/images/ic-arrow-up.png')}
                      />
                    ) : (
                      <Image
                        resizeMode="contain"
                        source={require('../../../assets/images/ic-arrow-down.png')}
                      />
                    )}
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <BasicInfoForm
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
              </CollapseBody>
            </Collapse>
            <View style={stylesProfile.boxIndicatorFill} />
            <Collapse
              isCollapsed={this.state.isCollapsedLevel}
              onToggle={isCollapsed =>
                this.setState({isCollapsedLevel: isCollapsed})
              }>
              <CollapseHeader>
                <View style={stylesProfile.boxTitleFill}>
                  <Text style={stylesProfile.txtBasicInfo}>TRÌNH ĐỘ</Text>
                  <View style={stylesProfile.boxArrow}>
                    {this.state.isCollapsedLevel ? (
                      <Image
                        resizeMode="contain"
                        source={require('../../../assets/images/ic-arrow-up.png')}
                      />
                    ) : (
                      <Image
                        resizeMode="contain"
                        source={require('../../../assets/images/ic-arrow-down.png')}
                      />
                    )}
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <LevelForm
                  onChangeText={this._onChangeText}
                  showLevelSelect={this._handleShowLevelSelect}
                  txtLevel={this.state.levelValue}
                  major={this.state.major}
                />
              </CollapseBody>
            </Collapse>
            <View style={stylesProfile.boxIndicatorFill} />
            <Collapse
              isCollapsed={this.state.isCollapsedContact}
              onToggle={isCollapsed =>
                this.setState({isCollapsedContact: isCollapsed})
              }>
              <CollapseHeader>
                <View style={stylesProfile.boxTitleFill}>
                  <Text style={stylesProfile.txtBasicInfo}>
                    THÔNG TIN LIÊN LẠC
                  </Text>
                  <View style={stylesProfile.boxArrow}>
                    {this.state.isCollapsedContact ? (
                      <Image
                        resizeMode="contain"
                        source={require('../../../assets/images/ic-arrow-up.png')}
                      />
                    ) : (
                      <Image
                        resizeMode="contain"
                        source={require('../../../assets/images/ic-arrow-down.png')}
                      />
                    )}
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <ContactForm
                  onChangeText={this._onChangeText}
                  contact={this.state.contact}
                />
              </CollapseBody>
            </Collapse>
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
