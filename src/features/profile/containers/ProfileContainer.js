import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import styles from '../../../styles/styles';
import stylesProfile from '../styles/styles';
import {SCREEN_FILL_PROFILE} from '../../../api/screen';
import Footer from '../../../components/footer/Footer';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 70,
      name: 'Nguyễn Ngọc Tiên',
    };
  }

  render() {
    const {percentage, name} = this.props;
    return (
      <View style={styles.body}>
        <ScrollView style={stylesProfile.container}>
          <View>
            <View style={stylesProfile.viewEdit}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.props.navigation.navigate(SCREEN_FILL_PROFILE);
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/ic-edit.png')}
                  style={{margin: 16}}
                />
              </TouchableOpacity>
            </View>
            <View style={stylesProfile.viewCircleAvatar}>
              <ProgressCircle
                percent={20}
                radius={58}
                borderWidth={3}
                color="#F0532D"
                shadowColor="#d8d8d8"
                bgColor="#fff"
              />
              <Image
                resizeMode="contain"
                source={{uri: 'http://via.placeholder.com/100x100'}}
                style={stylesProfile.circleAvatar}
              />
            </View>
            <Text style={stylesProfile.name}>Nguyễn Ngọc Tiên</Text>
            <View style={stylesProfile.viewReward}>
              <View style={stylesProfile.boxReward}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/ic-star.png')}
                  style={stylesProfile.boxRewardStar}
                />
                <Text style={stylesProfile.boxRewardTextReward}>
                  Điểm thưởng{' '}
                </Text>
                <Text style={stylesProfile.boxRewardTextPoint}>3,480</Text>
              </View>
            </View>
            <View style={{backgroundColor: '#d8d8d8', height: 5}} />
            <View style={stylesProfile.boxItem}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-program.png')}
              />
              <Text style={stylesProfile.boxItemTitle}>Chương trình</Text>
            </View>
            <View style={stylesProfile.boxItemIndicator} />
            <View style={stylesProfile.boxItem}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-history.png')}
              />
              <Text style={stylesProfile.boxItemTitle}>Lịch sử</Text>
            </View>
            <View style={stylesProfile.boxItemIndicator} />
            <View style={stylesProfile.boxItem}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-gift.png')}
              />
              <Text style={stylesProfile.boxItemTitle}>Ưu đãi</Text>
            </View>
            <View style={stylesProfile.boxItemIndicator} />
            <View style={stylesProfile.boxItem}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-add-friend.png')}
              />
              <Text style={stylesProfile.boxItemTitle}>Mời bạn bè</Text>
            </View>
            <View style={stylesProfile.boxItemIndicator} />
            <View style={stylesProfile.boxItem}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-process.png')}
              />
              <Text style={stylesProfile.boxItemTitle}>
                Quy trình làm việc và chế độ phúc lợi
              </Text>
            </View>
            <View style={stylesProfile.boxItemIndicator} />
            <View style={stylesProfile.boxItem}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-tutorial.png')}
              />
              <Text style={stylesProfile.boxItemTitle}>Hướng dẫn</Text>
            </View>
            <View style={stylesProfile.boxItemIndicator} />
            <View style={stylesProfile.boxItem}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-sp.png')}
              />
              <Text style={stylesProfile.boxItemTitle}>Hỗ trợ</Text>
            </View>
            <View style={stylesProfile.boxItemIndicator} />
            <View style={stylesProfile.boxItem}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-star-gray.png')}
              />
              <Text style={stylesProfile.boxItemTitle}>Đánh giá ứng dụng</Text>
            </View>
            <View style={stylesProfile.boxItemIndicator} />
            <View style={stylesProfile.boxItem}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-logout.png')}
              />
              <Text style={stylesProfile.boxItemTitle}>Đăng xuất</Text>
            </View>
            <View style={stylesProfile.boxItemIndicator} />
          </View>
        </ScrollView>
        <Footer page={'profile'} navigation={this.props.navigation} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}
export default connect(mapStateToProps, {})(ProfileContainer);
