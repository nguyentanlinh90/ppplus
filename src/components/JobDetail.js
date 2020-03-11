import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import JobDetailContent from './JobDetailContent';

const screenHeight = Math.round(Dimensions.get('window').height);
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {isEmptyObject} from '../utils/utils';
import styles from '../styles/styles';

export default class JobDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {data, closeRBSheet} = this.props;
    return (
      <View style={{paddingBottom: Platform.OS === 'ios' ? 110 : 100}}>
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
