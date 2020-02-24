import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  AsyncStorage,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import ProgressCircle from 'react-native-progress-circle';
import rootStyles from '../../../styles/styles';
import styles from '../styles/styles';
import {
  SCREEN_FILL_PROFILE,
  SCREEN_RETRO,
  SCREEN_PROGRAM,
  SCREEN_CREATE_ACCOUNT,
  SCREEN_INFO,
} from '../../../api/screen';
import {dispatchScreen, setStoreData} from '../../../utils/utils';
import {ACCESS_TOKEN} from '../../../utils/constants';
import {doLogout} from '../../user/actions/index';
import {changeMsgCode} from '../../../api/helpers';
import * as types from '../../../api/types';

var token = '';
class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 70,
      name: 'Nguyễn Tấn Linh',
    };
    this._getToken();
    this._handleLogout = this._handleLogout.bind(this);
  }

  async _getToken() {
    token = await AsyncStorage.getItem(ACCESS_TOKEN);
  }

  refresh = data => {
    this.setState({name: data});
  };

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
            this._handleLogout();
          },
        },
      ],
      {cancelable: true},
    );
  };

  _handleLogout = () => {
    const {doLogout} = this.props;
    doLogout(token);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == types.LOGOUT_SUCCESS) {
      nextProps.changeMsgCode('');
      setStoreData(ACCESS_TOKEN, '');
      this.props._gotoRetroScreen()
    } else if (nextProps.msg_code == types.LOGOUT_FAIL) {
      showAlert(nextProps.message);
      nextProps.changeMsgCode('');
    }
  }

  render() {
    const {props, percentage, name} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <TouchableOpacity
            style={styles.viewEdit}
            activeOpacity={0.8}
            onPress={() => {
              props.navigation.navigate(SCREEN_FILL_PROFILE, {
                onGoBack: data => this.refresh(data),
              });
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-edit.png')}
              style={{margin: 16}}
            />
          </TouchableOpacity>
          <View style={styles.viewCircleAvatar}>
            <ProgressCircle
              percent={this.state.percentage}
              radius={58}
              borderWidth={3}
              color="#F0532D"
              shadowColor="#d8d8d8"
              bgColor="#fff"
            />
            <Image
              resizeMode="contain"
              source={{uri: 'http://via.placeholder.com/150x150'}}
              style={styles.circleAvatar}
            />
          </View>
          <Rating
            readonly={true}
            type="custom"
            ratingColor="#FEBE10"
            ratingBackgroundColor="#d8d8d8"
            ratingCount={5}
            imageSize={20}
            startingValue={3.6}
            style={{paddingVertical: 5}}
            tintColor="#fff"
          />
          <Text style={styles.name}>{this.state.name}</Text>
          <View style={styles.viewReward}>
            <View style={styles.boxReward}>
              <Text style={styles.boxRewardTextReward}>Điểm thưởng </Text>
              <Text style={styles.boxRewardTextPoint}>3,480</Text>
            </View>
          </View>
          <View style={{backgroundColor: '#d8d8d8', height: 5}} />
          <TouchableOpacity
            style={styles.boxItem}
            onPress={() => {
              this.props.navigation.navigate(SCREEN_PROGRAM);
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-program.png')}
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
            />
            <Text style={styles.boxItemTitle}>Đăng xuất</Text>
          </TouchableOpacity>
          <View style={styles.boxItemIndicator} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    msg_code: state.user.msg_code,
    message: state.user.message,
  };
}
export default connect(mapStateToProps, {
  doLogout,
  changeMsgCode,
})(ProfileContainer);
