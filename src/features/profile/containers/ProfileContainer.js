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
import Spinner from 'react-native-loading-spinner-overlay';
import rootStyles from '../../../styles/styles';
import styles from '../styles/styles';
import {
  SCREEN_FILL_PROFILE,
  SCREEN_RETRO,
  SCREEN_PROGRAM,
  SCREEN_CREATE_ACCOUNT,
  SCREEN_INFO,
} from '../../../api/screen';
import {dispatchScreen, setStoreData, showAlert} from '../../../utils/utils';
import {ACCESS_TOKEN} from '../../../utils/constants';
import {doLogout} from '../../user/actions/index';
import * as types from '../../../api/types';
import {isEmpty} from '../../../utils/utils';
import {changeMsgCode} from '../../../api/helpers';
import {getUserInfo} from '../../../features/user/actions';
var token = '';
class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      avatar: '',
      percent_updated: 0,
      rating: 0,
      last_name: '',
      first_name: '',
      point_rewards: 0,
    };
    token = this.props.token.token;
  }

  refresh = (avatar, last_name, first_name) => {
    this.setState({
      avatar: avatar,
      last_name: last_name,
      first_name: first_name,
    });
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

  _setUser = data => {
    this.setState({
      avatar: data.avatar,
      percent_updated: data.percent_updated,
      rating: data.rating,
      last_name: data.last_name,
      first_name: data.first_name,
      point_rewards: data.point_rewards,
    });
  };

  _getUserInfo = () => {
    const {getUserInfo} = this.props;
    getUserInfo('basic_detail', token);
  };
  componentDidMount() {
    this._getUserInfo();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == types.GET_USER_BASIC_INFO_SUCCESS) {
      this.setState({isLoading: false});
      this._setUser(nextProps.data);
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.GET_USER_BASIC_INFO_FAIL) {
      showAlert(nextProps.message);
      this.setState({isLoading: false});
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.LOGOUT_SUCCESS) {
      nextProps.changeMsgCode('');
      setStoreData(ACCESS_TOKEN, '');
      this.props.gotoRetroScreen();
    } else if (nextProps.msg_code == types.LOGOUT_FAIL) {
      showAlert(nextProps.message);
      nextProps.changeMsgCode('');
    }
  }

  render() {
    const {props} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <Spinner
            visible={this.state.isLoading}
            color={'white'}
            size={'large'}
            textStyle={{color: '#fff'}}
          />

          <View style={styles.viewCircleAvatar}>
            <ProgressCircle
              percent={this.state.percent_updated}
              radius={58}
              borderWidth={3}
              color="#F0532D"
              shadowColor="#d8d8d8"
              bgColor="#fff"
            />
            <Image
              source={{uri: this.state.avatar}}
              style={styles.circleAvatar}
            />
          </View>
          {/* <Rating
            readonly={true}
            type="custom"
            ratingColor="#FEBE10"
            ratingBackgroundColor="#d8d8d8"
            ratingCount={5}
            imageSize={20}
            startingValue={this.state.rating}
            style={{paddingVertical: 5}}
            tintColor="#fff"
          /> */}
          <Text style={styles.name}>
            {this.state.last_name + ' ' + this.state.first_name}
          </Text>
          <View style={styles.viewReward}>
            <View style={styles.boxReward}>
              <Text style={styles.boxRewardTextReward}>Điểm thưởng </Text>
              <Text style={styles.boxRewardTextPoint}>
                {this.state.point_rewards}
              </Text>
            </View>
          </View>
          {this.state.percent_updated < 100 ? (
            <Text style={styles.viewDes}>
              *Hoàn thiện hồ sơ để xác thực tài khoản của bạn và tích điểm
              thưởng
            </Text>
          ) : null}

          <View style={{backgroundColor: '#d8d8d8', height: 5}} />
          <TouchableOpacity
            style={styles.boxItem}
            onPress={() => {
              props.navigation.navigate(SCREEN_FILL_PROFILE, {
                onGoBack: (avatar, last_name, first_name) =>
                  this.refresh(avatar, last_name, first_name),
              });
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-edit.png')}
              style={styles.boxItemImage}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.boxItemTitle}>Cập nhật hồ sơ</Text>
              <Text style={{color: '#757575', fontSize: 12}}>
                {' (Đã hoàn thiện'}
              </Text>
              <Text style={{color: '#f0532d', fontSize: 12}}>
                {' ' + this.state.percent_updated}%
              </Text>
              <Text style={{color: '#757575', fontSize: 12}}>{')'}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.boxItemIndicator} />
          <TouchableOpacity
            style={styles.boxItem}
            onPress={() => {
              this.props.navigation.navigate(SCREEN_PROGRAM);
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

function mapStateToProps(state) {
  return {
    msg_code: state.user.msg_code,
    message: state.user.message,
    data: state.user.data,
  };
}
export default connect(mapStateToProps, {
  getUserInfo,
  doLogout,
  changeMsgCode,
})(ProfileContainer);
