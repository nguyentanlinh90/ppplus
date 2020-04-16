import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import styles, {dotStyle} from '../styles/styles';
import Swiper from 'react-native-web-swiper';
import BgButton from '../../../components/BgButton';
import {SCREEN_LOGIN} from '../../../api/screen';
import {SCREEN_CREATE_ACCOUNT} from '../../../api/screen';
import {setStoreData} from '../../../utils/utils';
import {KEY_CHECK_LAST_RETRO, VALUE_ONE} from '../../../utils/constants';

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
    this.props.navigation.navigate(SCREEN_LOGIN);
    // dispatchScreen(this.props, SCREEN_LOGIN, {});
  };

  _openCreateAccountScreen = () => {
    this.props.navigation.navigate(SCREEN_CREATE_ACCOUNT);
    // dispatchScreen(this.props, SCREEN_CREATE_ACCOUNT, {});
  };

  render() {
    const {fromPage} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <Swiper
          containerStyle={{
            flex: 1,
            marginEnd: 20,
            marginStart: 20,
          }}
          ref={ref => {
            this.swipe = ref;
          }}
          // controlsProps={{
          //   prevPos: false,
          //   nextPos: false,
          //   dotActiveStyle: {backgroundColor: '#F0532D'},
          //   dotsTouchable: true,
          //   dotProps: {badgeStyle: {backgroundColor: '#F6C8A1'}},
          // }}
          controlsEnabled={false}
          from={this.state.fromPage}
          onIndexChanged={index => {
            if (index == 2) {
              setStoreData(KEY_CHECK_LAST_RETRO, VALUE_ONE);
            }
            this.setState({
              fromPage: index,
            });
          }}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/retro-1.png')}
            style={styles.imagePage}
          />
          <View
            style={{
              flex: 1,
              marginBottom: 40,
              marginTop: 40,
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/retro-2.png')}
              style={styles.imagePage}
            />
          </View>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/retro-3.png')}
            style={styles.imagePage}
          />
        </Swiper>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={dotStyle(fromPage == 0)} />
            <View style={dotStyle(fromPage == 1)} />
            <View style={dotStyle(fromPage == 2)} />
          </View>
          <Text style={styles.txtTitleContent}>{this._getTitle()}</Text>
          <ScrollView style={{flex: 1}}>
            <Text style={styles.txtContent}>{this._getContent()}</Text>
          </ScrollView>
          {this.state.fromPage == 2 ? (
            <View style={{justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => this._openLoginScreen()}
                style={styles.buttonLogin}>
                <BgButton />
                <Text style={styles.txtLogin}>Đăng nhập</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this._openCreateAccountScreen()}
                style={styles.buttonLogin}>
                <Text style={[styles.txtLogin, styles.txtCreateAccount]}>
                  Tạo tài khoản
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
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

export default connect(
  mapStateToProps,
  {},
)(RetroContainer);
