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

  render() {
    const {item} = this.props;
    let weekDay = '';
    for (let i = 0; i < item.weekDay.length; i++) {
      if (i == 0) {
        weekDay = item.weekDay[i];
      } else {
        weekDay = weekDay + ' - ' + item.weekDay[i];
      }
    }

    let hourDay = '';
    for (let i = 0; i < item.hourDay.length; i++) {
      if (i == 0) {
        hourDay = item.hourDay[i];
      } else {
        hourDay = hourDay + ' ; ' + item.hourDay[i];
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
