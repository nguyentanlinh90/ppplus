import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import styles from '../styles/styles';
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
        style={{width: 200, marginEnd: 16, padding: 12}}
        cornerRadius={6}
        elevation={1.5}
        opacity={0.4}>
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
              <Text
                numberOfLines={1}
                style={{flex: 1, fontSize: 16, fontWeight: 'bold'}}>
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
              readonly={true}
              type="custom"
              ratingColor="#FEBE10"
              ratingBackgroundColor="#d8d8d8"
              ratingCount={5}
              imageSize={16}
              startingValue={item.rating}
              tintColor="#fff"
            />
          </View>
        </View>
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: '700',
            marginTop: 5,
            marginBottom: 5,
            color: '#1c1c1c',
          }}>
          {item.jobTitle}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <Image
            resizeMode="stretch"
            source={require('../../../assets/images/ic-dob.png')}
            style={styles.imgInfoJob}
          />
          <Text style={styles.txtInfoJob}>
            {item.ageMin} - {item.ageMax} tuổi
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-sex.png')}
            style={styles.imgInfoJob}
          />
          <Text style={styles.txtInfoJob}>
            {item.gender == 0 ? 'Nữ' : 'Nam'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-location.png')}
            style={styles.imgInfoJob}
          />
          <Text numberOfLines={1} style={styles.txtInfoJob}>
            {item.location}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <Image
            resizeMode="stretch"
            source={require('../../../assets/images/ic-calendar.png')}
            style={styles.imgInfoJob}
          />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            allowFontScaling
            style={styles.txtInfoJob}>
            {moment(item.timeStart).format('DD/MM/YYYY')} -{' '}
            {moment(item.timeEnd).format('DD/MM/YYYY')}
          </Text>
        </View>
      </Card>
    );
  }
}
export default JobHotItem;
