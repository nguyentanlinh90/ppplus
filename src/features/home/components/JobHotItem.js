import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styleHome from '../styles/styles';
import {Rating} from 'react-native-elements';
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
      <View style={styleHome.jobHotItemContainer}>
        <View
          style={{
            height: 44,
            flexDirection: 'row',
          }}>
          <Image
            resizeMode="cover"
            source={{uri: item.logoUrl}}
            style={{width: 44, height: '100%', borderRadius: 6}}
          />

          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginStart: 5,
              marginEnd: 5,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{flex: 1, fontSize: 16, fontWeight: 'bold'}}>
                {item.merchantName}
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
            <Rating
              imageSize={16}
              readonly
              startingValue={item.rating}
              style={{}}
            />
          </View>
        </View>
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 5,
            marginBottom: 5,
          }}>
          {item.jobTitle}
        </Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Image
            resizeMode="stretch"
            source={require('../../../assets/images/ic-dob.png')}
            style={styleHome.imgInfoJob}
          />
          <Text style={styleHome.txtInfoJob}>
            {item.ageMin} - {item.ageMax} tuổi
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-sex.png')}
            style={styleHome.imgInfoJob}
          />
          <Text style={styleHome.txtInfoJob}>
            {item.gender == 0 ? 'Nữ' : 'Nam'}
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-location.png')}
            style={styleHome.imgInfoJob}
          />
          <Text numberOfLines={1} style={styleHome.txtInfoJob}>
            {item.location}
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Image
            resizeMode="stretch"
            source={require('../../../assets/images/ic-calendar.png')}
            style={styleHome.imgInfoJob}
          />
          <Text numberOfLines={1} adjustsFontSizeToFit   allowFontScaling style={styleHome.txtInfoJob}>
            {moment(item.timeStart).format('DD/MM/YYYY')} -{' '}
            {moment(item.timeEnd).format('DD/MM/YYYY')}
          </Text>
        </View>
      </View>
    );
  }
}
export default JobHotItem;
