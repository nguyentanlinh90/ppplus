import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import CheckBox from 'react-native-check-box';
import ActionSheet from 'react-native-actionsheet';
import styles from '../styles/styles';
import BgButton from '../../../components/BgButton';
import CBChecked from '../../../components/CBChecked';
import CBUnChecked from '../../../components/CBUnChecked';
import AlertInvalidCheckIn from '../components/AlertInvalidCheckIn';
class StartJobContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reason_1: false,
      reason_2: false,
      reason_3: false,
      fileUri: '',
      widthImg: Math.round(Dimensions.get('window').width) - 32, //32 -  mean padding left and right
      heightImg: 220,
      showAlertInvalidCheckIn: false,
    };
  }
  _openCamera = () => {
    let options = {
      quality: 1.0,
      cameraType: 'front',
      mediaType: 'photo',
      rotation: 0,
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
      },
    };
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        alert('response didCancel');
      } else if (response.error) {
        alert(response.error);
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        alert(response.width+" : "+response.height);
        this.setState({
          // filePath: response,
          // fileData: response.data,
          //calculate height of image follow width image after capture
          heightImg: (response.height * this.state.widthImg) / response.width,
          fileUri: response.uri,
        });
      }
    });
  };
  _openOptionsEdit = () => {
    console.log('linhnt open');
    this.optionsEdit.show();
  };

  _closeOptionsEdit = () => {
    this.optionsEdit.close();
  };
  _optionsEdit = () => {
    var optionArray = ['Chụp ảnh mới', 'Xoá ảnh', 'Huỷ'];
    return (
      <ActionSheet
        ref={o => (this.optionsEdit = o)}
        options={optionArray}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={index => {
          if (index == 0) {
            this._openCamera();
          } else if (index == 1) {
            this.setState({fileUri: ''});
          }
        }}
      />
    );
  };
  _doCheckIn = () => {
    //do check in
    this._openAlertCheckIn();
  };
  _openAlertCheckIn = () => {
    this.setState({showAlertInvalidCheckIn: true});
  };

  _closeAlertCheckIn = () => {
    this.setState({showAlertInvalidCheckIn: false});
  };

  _checkInAgain = () => {
    this._closeAlertCheckIn();
    //do check in again
  };

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        {this._optionsEdit()}
        <AlertInvalidCheckIn
          visible={this.state.showAlertInvalidCheckIn}
          closeAlertCheckIn={this._closeAlertCheckIn}
          checkInAgain={this._checkInAgain}
        />
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.navigation.goBack()}
              style={styles.buttonBack}>
              <Image source={require('../../../assets/images/ic-back-1.png')} />
            </TouchableOpacity>

            <Text style={{color: '#1c1c1c', fontSize: 18, fontWeight: 'bold'}}>
              {JSON.stringify(navigation.getParam('jobTitle', 'No Title'))}
            </Text>
          </View>
          <View style={styles.indicator} />
          <ScrollView>
            <View style={{flexDirection: 'row', margin: 16}}>
              <Text style={styles.txtHeader}>Ca làm việc</Text>
              <Text style={styles.txtTime}>
                {JSON.stringify(navigation.getParam('timeStart', '-'))} -
                {JSON.stringify(navigation.getParam('timeEnd', '-'))}
              </Text>
            </View>
            <View style={{marginEnd: 16, marginStart: 16, marginBottom: 16}}>
              <Text style={styles.txtHeader}>
                Hãy cho chúng tôi biết lý do bạn vào ca trễ nhé!
              </Text>
              <View style={styles.viewReason}>
                <CheckBox
                  isChecked={this.state.reason_1}
                  onClick={() =>
                    this.setState({reason_1: !this.state.reason_1})
                  }
                  checkedImage={<CBChecked />}
                  unCheckedImage={<CBUnChecked />}
                />
                <Text style={styles.txtReasonLate}>
                  Hella narwhal Cosby sweater McSweeney's
                </Text>
              </View>
              <View style={styles.viewReason}>
                <CheckBox
                  isChecked={this.state.reason_2}
                  onClick={() =>
                    this.setState({reason_2: !this.state.reason_2})
                  }
                  checkedImage={<CBChecked />}
                  unCheckedImage={<CBUnChecked />}
                />
                <Text style={styles.txtReasonLate}>
                  Retro occupy organic, stump.
                </Text>
              </View>
              <View style={styles.viewReason}>
                <CheckBox
                  isChecked={this.state.reason_3}
                  onClick={() =>
                    this.setState({reason_3: !this.state.reason_3})
                  }
                  checkedImage={<CBChecked />}
                  unCheckedImage={<CBUnChecked />}
                />
                <Text style={styles.txtReasonLate}>
                  In hac habitasse platea dictumst. Viva.
                </Text>
              </View>
              <TextInput
                style={styles.txtReasonDif}
                multiline
                placeholder="Nhập lý do khác"
                maxLength={200}
              />
            </View>

            <View style={styles.indicator} />
            <View style={styles.boxCheckIn}>
              <Text style={styles.txtHeader}>Check </Text>
              {this.state.fileUri != '' ? (
                <TouchableOpacity
                  style={styles.buttonEdit}
                  onPress={() => {
                    this._openOptionsEdit();
                  }}>
                  <Text
                    style={[
                      styles.txtHeader,
                      {color: '#F0532D', fontWeight: 'normal'},
                    ]}>
                    Chỉnh sửa
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            {this.state.fileUri == '' ? (
              <View style={styles.bgCheckIn}>
                <Image
                  source={require('../../../assets/images/no-image.png')}
                />

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this._openCamera();
                  }}
                  style={styles.buttonTakePicture}>
                  <BgButton />
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../../assets/images/ic-camera-white.png')}
                    />
                    <Text style={styles.txtTakePicture}>Chụp ảnh</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <Image
                resizeMode="stretch"
                source={{uri: this.state.fileUri}}
                style={{
                  width: this.state.widthImg,
                  height: this.state.heightImg,
                  borderRadius: 6,
                  alignSelf: 'center',
                }}
              />
            )}

            <Text style={styles.txtDetailCheckIn}>
              * Aenean tincidunt velit vitae orci varius, vitae intat {'\n'}*
              Facilisis nisi vulputate. Sed pulvinar, lorem ac ione {'\n'}* Quam
              mauris lacinia ex.
            </Text>
          </ScrollView>
        </View>
        {this.state.fileUri != '' ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this._doCheckIn();
            }}
            style={styles.buttonContinue}>
            <BgButton />
            <Text style={styles.txtContinue}>Tiếp Tục</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonContinueDisable}>
            <Text style={styles.txtContinueDisable}>Tiếp Tục</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}

export default connect(mapStateToProps, {})(StartJobContainer);
