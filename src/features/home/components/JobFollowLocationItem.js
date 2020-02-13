import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from '../styles/styles';
import CheckBox from 'react-native-check-box';
import CBChecked from '../../../components/CBChecked';
import CBUnChecked from '../../../components/CBUnChecked';
export default class JobFollowLocationItem extends Component {
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
        hourDay = item.hourDay[i].start_time + ' - ' + item.hourDay[i].end_time;
      } else {
        hourDay =
          hourDay +
          ' ; ' +
          item.hourDay[i].start_time +
          ' - ' +
          item.hourDay[i].end_time;
      }
    }

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({isSelect: !this.state.isSelect});
        }}
        style={styles.jobFollowLocationContainer}>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <Text
            style={{
              flex: 1,
              color: '#F0532D',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {item.name_store}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 22,
                width: 160,
                backgroundColor: '#d8d8d8',
                marginEnd: 10,
                marginStart:10,
                borderRadius: 6,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  borderRadius: 6,
                  height: 22,
                  width: (160 * 22) / 30,
                  backgroundColor: '#F0532D',
                }}
              />
              <Text
                style={{
                  color: '#fff',
                  fontSize: 13,
                  position: 'absolute',
                  alignSelf: 'center',
                }}>
                Đã ứng tuyển 22/30
              </Text>
            </View>
            <CheckBox
              isChecked={this.state.isSelect}
              checkedImage={<CBChecked />}
              unCheckedImage={<CBUnChecked />}
            />
          </View>
        </View>
        <View style={styles.jobFollowLocationDetail}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-building.png')}
          />
          <Text style={styles.jobFollowLocationTxtDetail}>{item.address}</Text>
        </View>
        <View style={styles.jobFollowLocationDetail}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-calendar.png')}
          />
          <Text style={styles.jobFollowLocationTxtDetail}>{weekDay}</Text>
        </View>
        <View style={styles.jobFollowLocationDetail}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-time.png')}
          />
          <Text style={styles.jobFollowLocationTxtDetail}>{hourDay}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
