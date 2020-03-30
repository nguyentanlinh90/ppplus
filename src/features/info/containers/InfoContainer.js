import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, SafeAreaView, Image, AsyncStorage} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import styles from '../styles/styles';
import InfoForm from '../component/InfoForm';
import {SCREEN_MAIN} from '../../../api/screen';
import {txt_dob_select} from '../../../utils/constants';
import {dispatchScreen} from '../../../utils/utils';
import {showAlert} from '../../../utils/utils';
import {doUpdateUserInfo} from '../../user/actions/index';
import {
  ACCESS_TOKEN,
  specialCharacters,
  numberCharacters,
} from '../../../utils/constants';
import {handleCheck, arrayToString} from '../../../utils/utils';
import {changeMsgCode} from '../../../api/helpers';
import * as types from '../../../api/types';

var token = '';
var provinceList = [];
var majorList = [];
var dayList = [];
var turnList = [];

class InfoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isDateTimePickerVisible: false,
      firstName: '',
      lastName: '',
      genderMale: true,
      genderFeMale: false,
      birthday: txt_dob_select,
      provinceIDs: [],
      majorIDs: [],
      dayIDs: [0, 1, 2, 3, 4, 5, 6, 7],
      turnIDs: [],
    };

    provinceList = this.props.navigation.state.params.province_list;
    majorList = this.props.navigation.state.params.major_list;
    dayList = this.props.navigation.state.params.day_list;
    turnList = this.props.navigation.state.params.turn_list;

    this._getToKen();
  }
  async _getToKen() {
    token = await AsyncStorage.getItem(ACCESS_TOKEN);
  }
  _onChangeText = (text, type) => {
    if (type == 'lastName') {
      if (specialCharacters.test(text) || numberCharacters.test(text)) {
        this.setState({lastName: text.substring(0, text.length - 1)});
      } else {
        this.setState({lastName: text});
      }
    } else if (type == 'firstName') {
      if (
        specialCharacters.test(text) ||
        numberCharacters.test(text) ||
        /\s/.test(text)
      ) {
        this.setState({firstName: text.substring(0, text.length - 1)});
      } else {
        this.setState({firstName: text});
      }
    }
  };
  _handleGenderSelect = (isMale, isCheck) => {
    if (isMale) {
      if (isCheck) {
        this.setState({genderMale: true, genderFeMale: false});
      } else {
        this.setState({genderMale: false, genderFeMale: true});
      }
    } else {
      if (isCheck) {
        this.setState({genderMale: false, genderFeMale: true});
      } else {
        this.setState({genderMale: true, genderFeMale: false});
      }
    }
  };

  _handleSelectProvince = provinceIdSelect => {
    const {provinceIDs} = this.state;
    if (handleCheck(provinceIdSelect, provinceIDs)) {
      var array = [...provinceIDs];
      var index = array.indexOf(provinceIdSelect);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({provinceIDs: array});
      }
    } else {
      provinceIDs.push(provinceIdSelect);
      this.setState({provinceIDs: provinceIDs});
    }
  };

  _handleSelectMajor = majorIdSelect => {
    const {majorIDs} = this.state;
    if (handleCheck(majorIdSelect, majorIDs)) {
      var array = [...majorIDs];
      var index = array.indexOf(majorIdSelect);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({majorIDs: array});
      }
    } else {
      majorIDs.push(majorIdSelect);
      this.setState({majorIDs: majorIDs});
    }
  };

  _handleSelectDay = dayIdSelect => {
    const {dayIDs} = this.state;
    if (handleCheck(dayIdSelect, dayIDs)) {
      if (dayIdSelect == 0) {
        this.setState({dayIDs: []});
      } else {
        let array = [...dayIDs];
        let index = array.indexOf(dayIdSelect);
        if (index !== -1) {
          array.splice(index, 1);
          //remove full day
          if (handleCheck(0, array)) {
            let temp = [...array];
            let _index = temp.indexOf(0);
            if (_index !== -1) {
              let temp = [...array];
              temp.splice(_index, 1);
              this.setState({dayIDs: temp});
            }
          } else {
            this.setState({dayIDs: array});
          }
        }
      }
    } else {
      if (dayIdSelect == 0) {
        let array = [];
        for (let i = 0; i < dayList.length; i++) {
          array.push(dayList[i].id);
        }
        this.setState({dayIDs: array});
      } else {
        dayIDs.push(dayIdSelect);
        //if click monday -> sunday
        if (dayIDs.length == 7) {
          let array = [];
          for (let i = 0; i < dayList.length; i++) {
            array.push(dayList[i].id);
          }
          this.setState({dayIDs: array});
        } else {
          this.setState({dayIDs: dayIDs});
        }
      }
    }
  };

  _handleSelectTurn = turnIdSelect => {
    const {turnIDs} = this.state;
    if (handleCheck(turnIdSelect, turnIDs)) {
      var array = [...turnIDs];
      var index = array.indexOf(turnIdSelect);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({turnIDs: array});
      }
    } else {
      turnIDs.push(turnIdSelect);
      this.setState({turnIDs: turnIDs});
    }
  };

  _handleUpdateBasicInfo = () => {
    const {doUpdateUserInfo} = this.props;
    const {
      firstName,
      lastName,
      genderMale,
      genderFeMale,
      birthday,
      provinceIDs,
      majorIDs,
      dayIDs,
      turnIDs,
    } = this.state;
    if (
      firstName == '' ||
      lastName == '' ||
      (!genderMale && !genderFeMale) ||
      birthday == txt_dob_select ||
      provinceIDs.length == 0 ||
      majorIDs.length == 0 ||
      dayIDs.length == 0 ||
      turnIDs.length == 0
    ) {
      showAlert('Vui lòng cung cấp đầy đủ các trường thông tin ở trên');
      return;
    }
    if (specialCharacters.test(firstName) || specialCharacters.test(lastName)) {
      showAlert('Tên không được chứa ký tự đặc biệt.');
      return;
    }
    if (provinceIDs.length > 2) {
      showAlert(
        'Bạn chỉ được chọn tối đa 2 địa điểm làm việc. Vui lòng bỏ bớt địa điểm làm việc',
      );
      return;
    }

    this.setState({isLoading: true});

    const params = {
      first_name: firstName,
      last_name: lastName,
      gender: genderMale ? '1' : '2',
      birthday: birthday,
      working_places: arrayToString(provinceIDs),
      working_majors: arrayToString(majorIDs),
      working_days: arrayToString(dayIDs),
      working_turns: arrayToString(turnIDs),
      type: 'basic_detail',
    };

    if (token != '') {
      doUpdateUserInfo(params, token);
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == types.UPDATE_USER_INFO_SUCCESS) {
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
      dispatchScreen(this.props, SCREEN_MAIN, [token, nextProps.data]);
    } else if (nextProps.msg_code == types.UPDATE_USER_INFO_FAIL) {
      this.setState({isLoading: false});
      showAlert(nextProps.message);
      nextProps.changeMsgCode('');
    }
  }

  _showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  _hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  _handleDatePicked = date => {
    const dateFormat = moment(date).format('DD/MM/YYYY');
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

  render() {
    return (
      <View style={{flex: 1}}>
        {this._renderDOBPicker()}
        <Image
          style={{width: '100%', height: '100%', position: 'absolute'}}
          source={require('../../../assets/images/bg.png')}
        />
        <SafeAreaView style={[styles.container]}>
          <Spinner
            visible={this.state.isLoading}
            color={'white'}
            size={'large'}
            textStyle={{color: '#fff'}}
          />
          <InfoForm
            onChangeText={this._onChangeText}
            lastName={this.state.lastName}
            firstName={this.state.firstName}
            genderMale={this.state.genderMale}
            genderFeMale={this.state.genderFeMale}
            handleGenderSelect={this._handleGenderSelect}
            showDateTimePicker={this._showDateTimePicker}
            birthday={this.state.birthday}
            listProvince={provinceList}
            handleSelectProvince={this._handleSelectProvince}
            provinceIDs={this.state.provinceIDs}
            listMajor={majorList}
            handleSelectMajor={this._handleSelectMajor}
            majorIDs={this.state.majorIDs}
            listDay={dayList}
            handleSelectDay={this._handleSelectDay}
            dayIDs={this.state.dayIDs}
            listTurn={turnList}
            handleSelectTurn={this._handleSelectTurn}
            turnIDs={this.state.turnIDs}
            handleUpdateBasicInfo={this._handleUpdateBasicInfo}
          />
        </SafeAreaView>
      </View>
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
  doUpdateUserInfo,
  changeMsgCode,
})(InfoContainer);
