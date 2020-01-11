import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styleHome from '../styles/styles';
import {Rating} from 'react-native-elements';
import CheckBox from 'react-native-check-box';
import CBChecked from '../../../components/CBChecked';
import CBUnChecked from '../../../components/CBUnChecked';
export class JobFollowLocationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelect: false,
    };
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
              color: '#F0532D',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {item.nameStore}
          </Text>
          <CheckBox
            onClick={() => {
              this.setState({isSelect: !this.state.isSelect});
            }}
            isChecked={this.state.isSelect}
            checkedImage={<CBChecked />}
            unCheckedImage={<CBUnChecked />}
          />
        </View>
        <View style={styleHome.jobFollowLocationDetail}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-building.png')}
          />
          <Text style={styleHome.jobFollowLocationTxtDetail}>
            {item.address}
          </Text>
        </View>
        <View style={styleHome.jobFollowLocationDetail}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-calendar.png')}
          />
          <Text style={styleHome.jobFollowLocationTxtDetail}>{weekDay}</Text>
        </View>
        <View style={styleHome.jobFollowLocationDetail}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-time.png')}
          />
          <Text style={styleHome.jobFollowLocationTxtDetail}>{hourDay}</Text>
        </View>
      </View>
    );
  }
}
export default JobFollowLocationItem;
