import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styleHome from '../styles/styles';
import styles from '../styles/styles';
import {Card} from 'react-native-shadow-cards';
import {getNamesFromIds} from '../../../utils/utils';
export default class JobHotItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _setLocation = (working_places, province_list) => {
    var text = '';
    if (working_places.length > 1) {
      text = working_places.length + ' địa điểm';
    } else {
      text = getNamesFromIds(working_places, province_list);
    }
    return text;
  };

  render() {
    const {item, province_list} = this.props;
    let colorOfBgTrending;
    let textTrending;
    let textColorTrending;
    if (item.trending == 1) {
      colorOfBgTrending = '#CAF4CF';
      textTrending = 'Mới';
      textColorTrending = '#63D471';
    } else {
      JobHotItem;
      colorOfBgTrending = '#FFE2E2';
      textTrending = 'Hot';
      textColorTrending = '#FF3434';
    }
    return (
      <Card
        style={{padding: 12, marginBottom: 10, width: '100%'}}
        cornerRadius={6}
        elevation={1}
        opacity={0.4}>
        <View style={{flexDirection: 'row'}}>
          <Image
            resizeMode="cover"
            source={{uri: item.job_company.icon}}
            style={{width: 80, height: 80, borderRadius: 6, marginEnd: 12}}
          />
          <View style={styles.newItemViewRight}>
            <Text numberOfLines={1} style={styles.newItemCompanyName}>
              {item.job_company.name}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  resizeMode="stretch"
                  source={require('../../../assets/images/ic-thunder-red.png')}
                  style={styleHome.imgInfoJob}
                />
                <Text style={{color: '#fa6400', fontSize: 13}}>Độ khó: </Text>
                <Text
                  style={{color: '#fa6400', fontSize: 13, fontWeight: 'bold'}}>
                  {item.hard_level}
                </Text>
                <Text style={{color: '#fa6400', fontSize: 13}}>/5</Text>
              </View>
              <View style={styles.newItemViewAddress}>
                <Image
                  resizeMode="stretch"
                  source={require('../../../assets/images/ic-location.png')}
                  style={styleHome.imgInfoJob}
                />
                <Text style={styleHome.txtInfoJob}>
                  {' '}
                  {this._setLocation(item.working_places, province_list)}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  resizeMode="stretch"
                  source={require('../../../assets/images/ic-calendar.png')}
                  style={styleHome.imgInfoJob}
                />
                <Text numberOfLines={1} style={styleHome.txtInfoJob}>
                  {item.start_date} - {item.end_date}
                </Text>
              </View>
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
        </View>
      </Card>
    );
  }
}
