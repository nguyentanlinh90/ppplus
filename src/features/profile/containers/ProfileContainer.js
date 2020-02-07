import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  AsyncStorage,
  Alert
} from 'react-native';
import Modal from 'react-native-modal';
import ProgressCircle from 'react-native-progress-circle';
import rootStyles from '../../../styles/styles';
import styles from '../styles/styles';
import {SCREEN_FILL_PROFILE, SCREEN_RETRO} from '../../../api/screen';
import DropdownAlert from 'react-native-dropdownalert';
import {dispatchScreen} from '../../../utils/utils';
class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 70,
      name: 'Nguyễn Tấn Linh',
      showPopUpLogout: false,
    };
  }

  refresh = data => {
    this.setState({name: data});
  };

  _showAlert = () => {
    // this.dropdown.alertWithType('error', 'Lỗi', 'Chức năng chưa hoàn thiện');
    Alert.alert("Thông báo", "Chức năng chưa hoàn thiện");
    // Alert.alert(
    //   'Alert Title',
    //   'My Alert Msg',
    //   [
    //     {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    //     {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    //     {text: 'OK', onPress: () => console.log('Ok Pressed')},
    //   ],
    //   { cancelable: false }
    // )
  };

  _handleLogout = isLogout => {
    this.setState({showPopUpLogout: false});
  };
  _renderPopUpLogout = props => {
    return (
      <Modal
        backdropOpacity={0.4}
        backdropColor="#000"
        useNativeDriver={true}
        animationIn={'slideInUp'}
        animationInTiming={300}
        animationOut={'slideOutDown'}
        animationOutTiming={300}
        isVisible={this.state.showPopUpLogout}
        style={{margin: 20}}>
        <View style={{backgroundColor: '#fff', borderRadius: 10, padding: 30}}>
          <Text style={styles.popupLogoutTitle}>{'Thông báo'}</Text>
          <Text style={styles.popupLogoutContent}>
            {'Bạn có chắc chắn muốn đăng xuất không?'}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                this.setState({showPopUpLogout: false});
              }}
              style={styles.popupLogoutButtonNo}>
              <Text style={styles.popupLogoutButtonText}>Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.setItem('login', '0');
                dispatchScreen(props, SCREEN_RETRO, {});
              }}
              style={styles.popupLogoutButtonYes}>
              <Text style={styles.popupLogoutButtonText}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const {props, percentage, name} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        {this._renderPopUpLogout(props)}
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
              source={{uri: 'http://via.placeholder.com/100x100'}}
              style={styles.circleAvatar}
            />
          </View>
          <Text style={styles.name}>{this.state.name}</Text>
          <View style={styles.viewReward}>
            <View style={styles.boxReward}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-star.png')}
                style={styles.boxRewardStar}
              />
              <Text style={styles.boxRewardTextReward}>Điểm thưởng </Text>
              <Text style={styles.boxRewardTextPoint}>3,480</Text>
            </View>
          </View>
          <View style={{backgroundColor: '#d8d8d8', height: 5}} />
          <TouchableOpacity
            style={styles.boxItem}
            onPress={() => this._showAlert()}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-program.png')}
            />
            <Text style={styles.boxItemTitle}>Chương trình</Text>
          </TouchableOpacity>
          <View style={styles.boxItemIndicator} />
          <TouchableOpacity
            style={styles.boxItem}
            onPress={() => this._showAlert()}>
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
              this.setState({showPopUpLogout: true});
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-logout.png')}
            />
            <Text style={styles.boxItemTitle}>Đăng xuất</Text>
          </TouchableOpacity>
          <View style={styles.boxItemIndicator} />
        </ScrollView>
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          defaultContainer={rootStyles.defaultContainerDropdown}
          defaultTextContainer={rootStyles.defaultTextContainerDropdown}
        />
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}
export default connect(mapStateToProps, {})(ProfileContainer);
