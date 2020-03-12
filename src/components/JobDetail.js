import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import JobDetailContent from './JobDetailContent';
import SpinnerComponent from '../components/Spinner';
const screenHeight = Math.round(Dimensions.get('window').height);
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {isEmptyObject} from '../utils/utils';
import styles from '../styles/styles';
import {applyJob} from '../features/main/actions/index';
import {changeMsgCode} from '../api/helpers';
import * as types from '../api/types';

class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  _handleApplyJob = () => {
    const {applyJob} = this.props;
    var params = {
      job_list_id: '',
      working_province_ids: '',
      working_district_ids: '',
      working_times: '',
    };
    console.log('linhnt apply', token, params)
    // applyJob(this.props.token, params);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == types.APPLY_JOBS_SUCCESS) {
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
      showAlert('Nộp đơn thành công');
    } else if (nextProps.msg_code == types.APPLY_JOBS_FAIL) {
      showAlert(nextProps.message);
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
    }
  }

  render() {
    const {data, closeRBSheet, token} = this.props;
    console.log('linhnt 111', data)

    return (
      <View style={{paddingBottom: Platform.OS === 'ios' ? 110 : 100}}>
        <SpinnerComponent visible={this.state.isLoading} />

        <View style={styles.jobDetailViewHeader}>
          {data.job_company.banner == '' ? (
            <Image
              resizeMode="stretch"
              source={require('../assets/images/bg-home-header.png')}
              style={{position: 'absolute', width: '100%', height: '100%'}}
            />
          ) : (
            <Image
              resizeMode="contain"
              source={{uri: data.job_company.banner}}
              style={{position: 'absolute', width: '100%', height: '100%'}}
            />
          )}

          <TouchableOpacity
            style={styles.jobDetailBoxButtonBack}
            onPress={() => {
              closeRBSheet();
            }}>
            <Image
              resizeMode="contain"
              source={require('../assets/images/ic-back-white.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
        <JobDetailContent item={data} submit={closeRBSheet} />
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    msg_code: state.main.msg_code,
    message: state.main.message,
    data: state.main.data,
  };
}
export default connect(mapStateToProps, {
  applyJob,
  changeMsgCode,
})(JobDetail);
