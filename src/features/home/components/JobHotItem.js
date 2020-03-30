import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import moment from 'moment';
import styles from '../styles/styles';
import {getNamesFromIds, isEmpty, setGender} from '../../../utils/utils';
export default class JobHotItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _setLocation = (working_places, province_list) => {
    var text = '';
    if (working_places.length > 1) {
      text = working_places.length + ' tỉnh';
    } else {
      text = getNamesFromIds(working_places, province_list);
    }
    return text;
  };

  render() {
    const {item, province_list, gender_list} = this.props;

    let colorOfBgTrending;
    let textTrending;
    let textColorTrending;
    //1:mới, 2: hot, 3: Gấp
    if (item.trending == 1) {
      colorOfBgTrending = '#CAF4CF';
      textTrending = 'Mới';
      textColorTrending = '#63D471';
    } else if (item.trending == 2) {
      colorOfBgTrending = '#FFE2E2';
      textTrending = 'Hot';
      textColorTrending = '#FF3434';
    } else {
      colorOfBgTrending = '#FFE2E2';
      textTrending = 'Gấp';
      textColorTrending = '#FF3434';
    }
    return (
      <Card
        style={{width: 200, marginEnd: 16, padding: 10}}
        cornerRadius={6}
        elevation={1.5}
        opacity={0.4}>
        <View style={{flexDirection: 'row'}}>
          {item.job_company.icon == '' ? (
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/broken-image.png')}
              style={styles.hotItemLogo}
            />
          ) : (
            <Image
              resizeMode="contain"
              source={{uri: item.job_company.icon}}
              style={styles.hotItemLogo}
            />
          )}

          <View style={styles.hotItemTopRight}>
            <Text numberOfLines={1} style={styles.hotItemCompanyName}>
              {item.job_company.name}
            </Text>
            <View
              style={[
                styles.itemViewTrending,
                {backgroundColor: colorOfBgTrending},
              ]}>
              <Text
                style={[styles.itemTextTrending, {color: textColorTrending}]}>
                {textTrending}
              </Text>
            </View>
          </View>
        </View>
        <Text numberOfLines={1} style={styles.hotItemTextDescription}>
          {item.description}
        </Text>
        <View style={styles.hotItemBoxContent}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-thunder-red.png')}
            style={styles.imgInfoJob}
          />
          <Text style={{color: '#fa6400', fontSize: 13}}>Độ khó: </Text>
          <Text style={{color: '#fa6400', fontSize: 13, fontWeight: 'bold'}}>
            {item.hard_level}
          </Text>
          <Text style={{color: '#fa6400', fontSize: 13}}>/5</Text>
        </View>
        <View style={styles.hotItemBoxContent}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-dob.png')}
            style={styles.imgInfoJob}
          />
          <Text style={styles.txtInfoJob}>
            {item.employee_min_age} - {item.employee_max_age} tuổi
          </Text>
        </View>
        {/* <View style={styles.hotItemBoxContent}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-gender.png')}
            style={styles.imgInfoJob}
          />
          <Text style={styles.txtInfoJob}>
            {setGender(item.employee_gender, gender_list)}
          </Text>
        </View> */}
        <View style={styles.hotItemBoxContent}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-location.png')}
            style={styles.imgInfoJob}
          />
          <Text numberOfLines={1} style={styles.txtInfoJob}>
            {this._setLocation(item.working_places, province_list)}
          </Text>
        </View>
        <View style={styles.hotItemBoxContent}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-calendar.png')}
            style={styles.imgInfoJob}
          />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            allowFontScaling
            style={styles.txtInfoJob}>
            {moment(moment(item.start_date, 'DD/MM/YYYY')).format('DD.MM.YYYY')}{' '}
            - {moment(moment(item.end_date, 'DD/MM/YYYY')).format('DD.MM.YYYY')}
          </Text>
        </View>
      </Card>
    );
  }
}
