import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import JobDetailContent from '../../../components/JobDetailContent';
import SpinnerComponent from '../../../components/Spinner';
import PopupApplyJobSuccess from '../components/PopupApplyJobSuccess';
import styles from '../styles/styles';
import {applyJob} from '../actions/index';
import {changeMsgCode} from '../../../api/helpers';
import * as types from '../../../api/types';
import {
  arrayToString,
  handleCheck,
  showAlert,
  showAlertWithPress,
} from '../../../utils/utils';
let token = '';
let gender_list = [];
let province_list = [];
let district_list = [];
class JobDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.state.params.data,
      isLoading: false,
      working_province_ids: [],
      working_district_ids: [],
      working_times: [],
      isValidToApply: false,
      is_applied: false,
      showPopupApplyJobSuccess: false,
    };
    token = this.props.navigation.state.params.token;
    gender_list = this.props.navigation.state.params.gender_list;
    province_list = this.props.navigation.state.params.province_list;
    district_list = this.props.navigation.state.params.district_list;
  }

  _checkValid = (isValid, provinceSelect, province_id) => {
    this.setState({isValidToApply: isValid});
    const {working_province_ids} = this.state;

    if (isValid && provinceSelect) {
      //check province select, if not exits => push to array
      if (!handleCheck(province_id, working_province_ids)) {
        let arr = working_province_ids;
        arr.push(province_id);
        this.setState({working_province_ids: arr});
      }
    } else {
      //check province unselect, if  exits => remove from array
      if (handleCheck(province_id, working_province_ids)) {
        var arr = [...working_province_ids];
        var index = arr.indexOf(province_id);
        if (index !== -1) {
          arr.splice(index, 1);
          this.setState({working_province_ids: arr});
        }
      }
    }
  };

  _getWorkingDistrictIds = districtSelect => {
    //district total for apply
    const {working_district_ids} = this.state;
    if (handleCheck(districtSelect, working_district_ids)) {
      var array = [...working_district_ids];
      var index = array.indexOf(districtSelect);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({working_district_ids: array});
      }
    } else {
      working_district_ids.push(districtSelect);
      this.setState({working_district_ids: working_district_ids});
    }
  };

  _getWorkingTimeIds = (timeSelectValue, working_time_list) => {
    var timeSelect = '';
    //will find time id (key - range_139_1) from time value (value - 04:00-05:00)
    var values = Object.values(working_time_list);
    for (var i = 0; i < values.length; i++) {
      if (timeSelectValue == values[i]) {
        timeSelect = Object.keys(working_time_list)[i];
      }
    }

    //time total for apply
    const {working_times} = this.state;
    if (handleCheck(timeSelect, working_times)) {
      var array = [...working_times];
      var index = array.indexOf(timeSelect);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({working_times: array});
      }
    } else {
      working_times.push(timeSelect);
      this.setState({working_times: working_times});
    }
  };

  _handleApplyJob = () => {
    const {applyJob} = this.props;
    const {
      working_province_ids,
      working_district_ids,
      working_times,
    } = this.state;

    if (working_district_ids.length == 0 && working_times.length == 0) {
      showAlert('Bạn chưa chọn địa điểm và thời gian');
      return;
    }
    if (working_district_ids.length > 0 && working_times.length == 0) {
      showAlert('Bạn chưa chọn thời gian');
      return;
    }
    if (working_district_ids.length == 0 && working_times.length > 0) {
      showAlert('Bạn chưa chọn địa điểm');
      return;
    }
    if (!this.state.isValidToApply) {
      showAlert('Bạn chưa chọn đầy đủ Quận/Huyện và thời gian làm việc');
      return;
    }

    var params = {
      job_list_id: this.state.data.id,
      working_province_ids: arrayToString(working_province_ids),
      working_district_ids: arrayToString(working_district_ids),
      working_times: arrayToString(working_times),
    };
    this.setState({isLoading: true});
    applyJob(token, params);
  };

  _closePopupApplyJobSuccess = () => {
    this.setState({showPopupApplyJobSuccess: false});
  };

  _hideLoading = () => {
    this.setState({isLoading: false});
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == types.APPLY_JOBS_SUCCESS) {
      this.setState({isLoading: false});
      var temp = this.state.data;
      temp.is_applied = true;
      this.setState({data: temp, showPopupApplyJobSuccess: true});
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.APPLY_JOBS_FAIL) {
      showAlertWithPress(nextProps.message, this._hideLoading);
      nextProps.changeMsgCode('');
    }
  }

  render() {
    const {data} = this.state;
    return (
      <View style={{paddingBottom: Platform.OS === 'ios' ? 110 : 100}}>
        <SpinnerComponent visible={this.state.isLoading} />
        <PopupApplyJobSuccess
          visible={this.state.showPopupApplyJobSuccess}
          joinTraining={this._closePopupApplyJobSuccess} //todo load webview
          close={this._closePopupApplyJobSuccess}
        />

        <View style={styles.jobDetailViewHeader}>
          {data.job_company.banner == '' ? (
            <Image
              resizeMode="stretch"
              source={require('../../../assets/images/bg-home-header.png')}
              style={{position: 'absolute', width: '100%', height: '100%'}}
            />
          ) : (
            <Image
              resizeMode="stretch"
              source={{uri: data.job_company.banner}}
              style={{position: 'absolute', width: '100%', height: '100%'}}
            />
          )}

          <TouchableOpacity
            style={styles.jobDetailBoxButtonBack}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-back-white.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
        <JobDetailContent
          item={data}
          gender_list={gender_list}
          getWorkingDistrictIds={this._getWorkingDistrictIds}
          getWorkingTimeIds={this._getWorkingTimeIds}
          checkValid={this._checkValid}
          handleApplyJob={this._handleApplyJob}
          province_list={province_list}
          district_list={district_list}
        />
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    msg_code: state.job_detail.msg_code,
    message: state.job_detail.message,
    data: state.job_detail.data,
  };
}
export default connect(
  mapStateToProps,
  {
    applyJob,
    changeMsgCode,
  },
)(JobDetailContainer);
