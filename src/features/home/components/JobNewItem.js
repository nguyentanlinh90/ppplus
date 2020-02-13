import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styleHome from '../styles/styles';
import {Card} from 'react-native-shadow-cards';
import {Rating} from 'react-native-ratings';
import moment from 'moment';
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
            source={{uri: item.logoUrl}}
            style={{width: 80, height: 80, borderRadius: 6, marginEnd: 12}}
          />
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#060606',
              }}>
              {item.jobTitle}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Rating
                readonly={true}
                type="custom"
                ratingColor="#FEBE10"
                ratingBackgroundColor="#d8d8d8"
                ratingCount={5}
                imageSize={16}
                startingValue={item.rating}
                tintColor="#fff"
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Image
                  resizeMode="stretch"
                  source={require('../../../assets/images/ic-location.png')}
                  style={styleHome.imgInfoJob}
                />
                <Text style={styleHome.txtInfoJob}> 12 địa điểm</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode="stretch"
                  source={require('../../../assets/images/ic-calendar.png')}
                  style={styleHome.imgInfoJob}
                />
                <Text numberOfLines={1} style={styleHome.txtInfoJob}>
                  {moment(item.timeStart).format('DD/MM/YYYY')} -{' '}
                  {moment(item.timeEnd).format('DD/MM/YYYY')}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: colorOfBgTrending,
                  borderRadius: 20,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    paddingStart: 12,
                    paddingBottom: 3,
                    paddingEnd: 12,
                    paddingTop: 3,
                    fontSize: 12,
                    color: textColorTrending,
                  }}>
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
export default JobHotItem;
