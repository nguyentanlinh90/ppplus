import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styleHome from '../styles/styles';
import {Rating} from 'react-native-elements';
import {c_F0532D, c_1c1c1c, c_ffffff} from '../../../utils/constants';
export class JobFollowLocationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formatToWeekDay = day => {
    switch (day) {
      case 1:
        return 'Thứ 2';
      case 2:
        return 'Thứ 3';
      case 3:
        return 'Thứ 4';
      case 4:
        return 'Thứ 5';
      case 5:
        return 'Thứ 6';
      case 6:
        return 'Thứ 7';
      case 7:
        return 'Chủ Nhật';
    }
  };

  render() {
    const {item} = this.props;
    console.log('linhnt', item);
    let weekDay = '';
    for (let i = 0; i < item.weekDay.length; i++) {
      if (i == 0) {
        weekDay = this.formatToWeekDay(item.weekDay[i]);
      } else {
        weekDay = weekDay + ' - ' + this.formatToWeekDay(item.weekDay[i]);
      }
    }

    let hourDay = '';
    for (let i = 0; i < item.hourDay.length; i++) {
      if (i == 0) {
        hourDay = item.hourDay[i].startTime + ' - ' + item.hourDay[i].endTime;
      } else {
        hourDay =
          hourDay +
          ' ; ' +
          item.hourDay[i].startTime +
          ' - ' +
          item.hourDay[i].endTime;
      }
    }

    return (
      <View style={styleHome.jobFollowLocationContainer}>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <Text
            style={{
              flex: 1,
              color: c_F0532D,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {item.nameStore}
          </Text>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-location.png')}
            style={{width: 24, height: 24}}
          />
        </View>
        <View style={styleHome.jobFollowLocationDetail}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-location.png')}
          />
          <Text style={styleHome.jobFollowLocationTxtDetail}>
            {item.address}
          </Text>
        </View>
        <View style={styleHome.jobFollowLocationDetail}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-location.png')}
          />
          <Text style={styleHome.jobFollowLocationTxtDetail}>{weekDay}</Text>
        </View>
        <View style={styleHome.jobFollowLocationDetail}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-location.png')}
          />
          <Text style={styleHome.jobFollowLocationTxtDetail}>{hourDay}</Text>
        </View>
      </View>
    );
  }
}
export default JobFollowLocationItem;
