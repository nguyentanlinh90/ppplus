import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import styles from '../styles/styles';
import Swiper from 'react-native-web-swiper';
import BgButton from '../../../components/BgButton';
import {SCREEN_LOGIN} from '../../../api/screen';
import {SCREEN_CREATE_ACCOUNT} from '../../../api/screen';
import {setStoreData} from '../../../utils/utils';
import {KEY_CHECK_LAST_RETRO, VALUE_ONE} from '../../../utils/constants';
import {dispatchScreen} from '../../../utils/utils';

class RetroContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromPage: 0,
    };
    this.checkLastPage();
  }

  async checkLastPage() {
    var lastPage = await AsyncStorage.getItem(KEY_CHECK_LAST_RETRO);
    if (lastPage && lastPage == VALUE_ONE) {
      this.setState({fromPage: 2});
      this.swipe.goTo(2);
    }
  }

  _getTitle() {
    if (this.state.fromPage == 0) {
      return 'Linh động & thu nhập cao';
    } else if (this.state.fromPage == 1) {
      return 'Tuyển dụng và đào tạo trực tuyến';
    } else {
      return 'Đánh giá năng lực & thăng hạng';
    }
  }

  _getContent() {
    if (this.state.fromPage == 0) {
      return 'Linh động tối đa trong việc lựa chọn thời gian và địa điểm làm việc phù hợp. Thu nhập hấp dẫn theo giờ';
    } else if (this.state.fromPage == 1) {
      return 'Công việc phù hợp nhất được tự động gợi ý từ hệ thống. Chủ động thời gian trong việc đào tạo và thực hành';
    } else {
      return 'Đánh giá hiệu suất qua mỗi chương trình để thăng hạng. Phần thưởng và chế độ phúc lợi hấp dẫn';
    }
  }

  _openLoginScreen = () => {
    this.props.navigation.navigate(SCREEN_LOGIN)
    // dispatchScreen(this.props, SCREEN_LOGIN, {});
  };

  _openCreateAccountScreen = () => {
    this.props.navigation.navigate(SCREEN_CREATE_ACCOUNT)
    // dispatchScreen(this.props, SCREEN_CREATE_ACCOUNT, {});
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <Swiper
          ref={ref => {
            this.swipe = ref;
          }}
          controlsProps={{
            prevPos: false,
            nextPos: false,
            dotActiveStyle: {backgroundColor: '#F0532D'},
            dotsTouchable: true,
            dotProps: {badgeStyle: {backgroundColor: '#F6C8A1'}},
          }}
          from={this.state.fromPage}
          onIndexChanged={index => {
            if (index == 2) {
              setStoreData(KEY_CHECK_LAST_RETRO, VALUE_ONE);
            }
            this.setState({
              fromPage: index,
            });
          }}>
          <View style={styles.viewPage}>
            <Image
              resizeMode="center"
              source={require('../../../assets/images/retro-1.png')}
              style={styles.imagePage}
            />
          </View>
          <View style={styles.viewPage}>
            <Image
              resizeMode="center"
              source={require('../../../assets/images/retro-2.png')}
              style={styles.imagePage}
            />
          </View>
          <View style={styles.viewPage}>
            <Image
              resizeMode="center"
              source={require('../../../assets/images/retro-3.png')}
              style={styles.imagePage}
            />
          </View>
        </Swiper>
        <View style={styles.boxContent}>
          <Text style={styles.txtTitleContent}>{this._getTitle()}</Text>
          <Text style={styles.txtContent}>{this._getContent()}</Text>
          {this.state.fromPage == 2 ? (
            <View style={{height: 128, justifyContent: 'center'}}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this._openLoginScreen()}
                style={styles.buttonLogin}>
                <BgButton />
                <Text style={styles.txtLogin}>Đăng nhập</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this._openCreateAccountScreen()}
                style={[styles.buttonLogin, {marginTop: 10}]}>
                <Text style={[styles.txtLogin, styles.txtCreateAccount]}>
                  Tạo tài khoản
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{height: 128}} />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}

export default connect(mapStateToProps, {})(RetroContainer);
