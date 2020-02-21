import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  AsyncStorage,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../styles/styles';
import InfoForm from '../component/InfoForm';
import {SCREEN_MAIN} from '../../../api/screen';
import {text_select} from '../../../utils/constants';
import {dispatchScreen} from '../../../utils/utils';
import {showAlert} from '../../../utils/utils';
import {doUpdateUserInfo} from '../../user/actions/index';
import {ACCESS_TOKEN} from '../../../utils/constants';
import {handleCheck, arrayToString} from '../../../utils/utils';
import {changeMsgCode} from '../../../api/helpers';
var token = '';
var provinceList = [];
var majorList = [];
class InfoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      firstName: 'Linh',
      lastName: 'Nguyen Tan',
      genderMale: true,
      genderFeMale: false,
      yearOfBirth: text_select,
      provinceIDs: [],
      majorIDs: [],
    };

    provinceList = this.props.navigation.state.params.province_list;
    majorList = this.props.navigation.state.params.major_list;
    this._getToKen();
  }

  componentDidMount = () => {
    this._loadListBasic();
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('linhnt', nextProps);
  }

  render() {
    return (
      <View style={{flex: 1}}>
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
            selectYearOfBirth={this._selectYearOfBirth}
            yearOfBirth={this.state.yearOfBirth}
            listProvince={provinceList}
            handleSelectProvince={this._handleSelectProvince}
            provinceIDs={this.state.provinceIDs}
            listMajor={majorList}
            handleSelectMajor={this._handleSelectMajor}
            majorIDs={this.state.majorIDs}
            handleUpdateBasicInfo={this._handleUpdateBasicInfo}
          />
        </SafeAreaView>
      </View>
    );
  }

  async _getToKen() {
    token = await AsyncStorage.getItem(ACCESS_TOKEN);
  }
  _loadListBasic = () => {};
  _onChangeText = (text, type) => {
    if (type == 'lastName') {
      this.setState({lastName: text});
    } else if (type == 'firstName') {
      this.setState({firstName: text});
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

  _handleUpdateBasicInfo = () => {
    const {doUpdateUserInfo} = this.props;
    const {
      firstName,
      lastName,
      genderMale,
      genderFeMale,
      yearOfBirth,
      provinceIDs,
      majorIDs,
    } = this.state;

    if (
      firstName == '' ||
      lastName == '' ||
      (!genderMale && !genderFeMale) ||
      yearOfBirth == text_select ||
      provinceIDs.length == 0 ||
      majorIDs.length == 0
    ) {
      showAlert('Vui lòng cung cấp đầy đủ các trường thông tin ở trên');
      return;
    }
    var specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (specialCharacters.test(firstName) || specialCharacters.test(lastName)) {
      showAlert('Tên không được chứa ký tự đặc biệt');
      return;
    }
    this.setState({isLoading: true});

    const params = {
      first_name: firstName,
      last_name: lastName,
      gender: genderMale ? '1' : '2',
      birthday: yearOfBirth+"",
      working_places: arrayToString(provinceIDs),
      working_careers: arrayToString(majorIDs),
      type: 'basic_detail',
    };

    if (token != '') {
      doUpdateUserInfo(params, token);
    }
  };

  _selectYearOfBirth = yearSelect => {
    this.setState({yearOfBirth: yearSelect});
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

  _openHomeScreen = () => {
    dispatchScreen(this.props, SCREEN_MAIN, {});
  };
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}

export default connect(mapStateToProps, {
  doUpdateUserInfo,
  changeMsgCode,
})(InfoContainer);
