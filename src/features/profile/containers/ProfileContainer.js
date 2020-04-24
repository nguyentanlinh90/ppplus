import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {Rating, AirbnbRating} from 'react-native-ratings';
import styles from '../styles/styles';
import {formatMoney} from '../../../utils/utils';
import {colors} from '../../../styles/styles';
export default class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _showAlert = () => {
    Alert.alert('Thông báo', 'Chức năng chưa hoàn thiện');
  };

  _showAlertLogout = props => {
    Alert.alert(
      'Thông báo',
      'Bạn có chắc chắn muốn thoát ứng dụng không?',
      [
        {text: 'Huỷ', onPress: () => {}},
        {
          text: 'Đồng Ý',
          onPress: () => {
            this.props.handleLogout();
          },
        },
      ],
      {cancelable: true},
    );
  };

  render() {
    const {props, user, updateUser} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View style={styles.viewCircleAvatar}>
            <ProgressCircle
              percent={user.percent_updated}
              radius={58}
              borderWidth={3}
              color={colors.c_f0532d}
              shadowColor={colors.c_d8d8d8}
              bgColor={colors.white}
            />
            <Image source={{uri: user.avatar}} style={styles.circleAvatar} />
          </View>

          <Rating
            type="custom"
            startingValue={user.rating}
            readonly
            imageSize={12}
            ratingColor="#FFC107"
            ratingBackgroundColor="#C7C7C7"
            tintColor="#fff"
          />
          <Text style={styles.name}>
            {user.last_name + ' ' + user.first_name}
          </Text>
          <View style={styles.viewReward}>
            <View style={styles.boxReward}>
              <Text style={styles.boxRewardTextReward}>Điểm thưởng </Text>
              <Text style={styles.boxRewardTextPoint}>
                {formatMoney(user.point_rewards)}
              </Text>
            </View>
          </View>
          {user.percent_updated < 100 ? (
            <Text style={styles.viewDes}>
              *Hoàn thiện hồ sơ để xác thực tài khoản của bạn và tích điểm
              thưởng
            </Text>
          ) : null}

          <View style={{backgroundColor: colors.c_f1f1f1, height: 2}} />
          <TouchableOpacity style={styles.boxItem} onPress={() => updateUser()}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-edit.png')}
              style={styles.boxItemImage}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.boxItemTitle}>Cập nhật hồ sơ</Text>
              {user.percent_updated < 100 ? (
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: colors.c_757575, fontSize: 12}}>
                    {' (Đã hoàn thiện '}
                  </Text>
                  <Text style={{color: colors.c_f0532d, fontSize: 12}}>
                    {user.percent_updated + '%'}
                  </Text>
                  <Text style={{color: colors.c_757575, fontSize: 12}}>
                    {')'}
                  </Text>
                </View>
              ) : (
                <Text style={{color: colors.c_25a174, fontSize: 12}}>
                  {' (Đã hoàn thiện hồ sơ)'}
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.boxItemIndicator} />
          <TouchableOpacity
            style={styles.boxItem}
            onPress={() => {
              // this.props.navigation.navigate(SCREEN_PROGRAM);
              this._showAlert();
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-program.png')}
              style={styles.boxItemImage}
            />
            <Text style={styles.boxItemTitle}>Chương trình</Text>
          </TouchableOpacity>
          <View style={styles.boxItemIndicator} />
          <TouchableOpacity
            style={styles.boxItem}
            onPress={() => {
              this._showAlert();
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-history.png')}
              style={styles.boxItemImage}
            />
            <Text style={styles.boxItemTitle}>Lịch sử</Text>
          </TouchableOpacity>
          <View style={styles.boxItemIndicator} />
          <TouchableOpacity
            style={styles.boxItem}
            onPress={() => this._showAlert()}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-gift.png')}
              style={styles.boxItemImage}
            />
            <Text style={styles.boxItemTitle}>Ưu đãi</Text>
          </TouchableOpacity>
          <View style={styles.boxItemIndicator} />
          <TouchableOpacity
            style={styles.boxItem}
            onPress={() => this._showAlert()}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-add-friend.png')}
              style={styles.boxItemImage}
            />
            <Text style={styles.boxItemTitle}>Mời bạn bè</Text>
          </TouchableOpacity>
          <View style={styles.boxItemIndicator} />
          <TouchableOpacity
            style={styles.boxItem}
            onPress={() => this._showAlert()}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-process.png')}
              style={styles.boxItemImage}
            />
            <Text style={styles.boxItemTitle}>
              Quy trình làm việc và chế độ phúc lợi
            </Text>
          </TouchableOpacity>
          <View style={styles.boxItemIndicator} />
          <TouchableOpacity
            style={styles.boxItem}
            onPress={() => this._showAlert()}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-tutorial.png')}
              style={styles.boxItemImage}
            />
            <Text style={styles.boxItemTitle}>Hướng dẫn</Text>
          </TouchableOpacity>
          <View style={styles.boxItemIndicator} />
          <TouchableOpacity
            style={styles.boxItem}
            onPress={() => this._showAlert()}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-sp.png')}
              style={styles.boxItemImage}
            />
            <Text style={styles.boxItemTitle}>Hỗ trợ</Text>
          </TouchableOpacity>
          <View style={styles.boxItemIndicator} />
          <TouchableOpacity
            style={styles.boxItem}
            onPress={() => this._showAlert()}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-star-gray.png')}
              style={styles.boxItemImage}
            />
            <Text style={styles.boxItemTitle}>Đánh giá ứng dụng</Text>
          </TouchableOpacity>
          <View style={styles.boxItemIndicator} />
          <TouchableOpacity
            style={styles.boxItem}
            onPress={() => {
              this._showAlertLogout(props);
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-logout.png')}
              style={styles.boxItemImage}
            />
            <Text style={styles.boxItemTitle}>Đăng xuất</Text>
          </TouchableOpacity>
          <View style={styles.boxItemIndicator} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
