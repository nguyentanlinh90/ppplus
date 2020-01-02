import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styleHome from '../styles/styles';
import LinearGradient from 'react-native-linear-gradient';
import {Rating} from 'react-native-elements';
export class JobHotItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {item} = this.props;
    let colorOfBgTrending;
    let textTrending;
    let textColorTrending;
    if (item.trending == 1) {
      colorOfBgTrending = '#CAF4CF';
      textTrending = 'Mới';
      textColorTrending = '#63D471';
    } else {
      colorOfBgTrending = '#FFE2E2';
      textTrending = 'Hot';
      textColorTrending = '#FF3434';
    }
    return (
      <View style={{marginBottom: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: '900',
              paddingEnd: 5,
              marginBottom: 10,
              color: '#1C1C1C',
            }}>
            {item.jobTitle}
          </Text>
          <View
            style={{
              backgroundColor: colorOfBgTrending,
              borderRadius: 30,
              fontSize: 12,
            }}>
            <Text
              style={{
                paddingStart: 10,
                paddingBottom: 2,
                paddingEnd: 10,
                paddingTop: 2,
                fontSize: 12,
                color: textColorTrending,
              }}>
              {textTrending}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <Image
              resizeMode="stretch"
              source={require('../../../assets/images/ic-calendar.png')}
              style={styleHome.imgInfoJob}
            />
            <Text style={styleHome.txtInfoJob}>
              {item.timeStart} - {item.timeEnd}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <Image
              resizeMode="stretch"
              source={require('../../../assets/images/ic-location.png')}
              style={styleHome.imgInfoJob}
            />
            <Text style={styleHome.txtInfoJob}>{item.location}</Text>
          </View>
        </View>
        <View
          style={{height: 1, backgroundColor: '#f1f1f1', marginTop: 5}}></View>
      </View>
    );
  }
}
export default JobHotItem;
