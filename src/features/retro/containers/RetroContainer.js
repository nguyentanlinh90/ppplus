import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import stylesRetro from '../styles/styles';
import Swiper from 'react-native-web-swiper';
import LinearGradient from 'react-native-linear-gradient';

import {SCREEN_LOGIN} from '../../../api/screen';
import {SCREEN_CREATE_ACCOUNT} from '../../../api/screen';

class RetroContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
    };
  }
  _getTitle() {
    if (this.state.currentPage == 1) {
      return 'Retro occupy org';
    } else if (this.state.currentPage == 2) {
      return 'Tousled food truck';
    } else {
      return 'Portland ugh';
    }
  }

  _getContent() {
    if (this.state.currentPage == 1) {
      return 'Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap. Hashtag.';
    } else if (this.state.currentPage == 2) {
      return 'Synth polaroid bitters chillwave pickled. Vegan disrupt tousled, Portland keffiyeh aesthetic food.';
    } else {
      return 'Kogi Cosby sweater ethical squid irony disrupt, organic tote bag gluten-free XOXO wolf typewriter.';
    }
  }

  _openLoginScreen = () => {
    this.props.navigation.dispatch({
      key: SCREEN_LOGIN,
      type: 'ReplaceCurrentScreen',
      routeName: SCREEN_LOGIN,
      params: {},
    });
  };

  _openCreateAccountScreen = () => {
    this.props.navigation.dispatch({
      key: SCREEN_CREATE_ACCOUNT,
      type: 'ReplaceCurrentScreen',
      routeName: SCREEN_CREATE_ACCOUNT,
      params: {},
    });
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        {this.state.currentPage != 2 ? (
          <TouchableOpacity
            style={stylesRetro.viewIgnore}
            activeOpacity={0.7}
            onPress={() => this.setState({currentPage: 2})}>
            <Text style={stylesRetro.txtIgnore}></Text>
          </TouchableOpacity>
        ) : (
          <View style={stylesRetro.viewIgnore} />
        )}

        <Swiper
          controlsProps={{
            prevPos: false,
            nextPos: false,
            dotStyle: {dotColor: '#F6C8A1'},
            dotActiveStyle: {backgroundColor: '#F0532D'},
            dotsTouchable: true,
          }}
          currentPage={this.state.currentPage}
          onIndexChanged={index => {
            this.setState({
              currentPage: index,
            });
          }}>
          <View style={stylesRetro.viewPage}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/retro-1.png')}
            />
          </View>
          <View style={stylesRetro.viewPage}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/retro-2.png')}
            />
          </View>
          <View style={stylesRetro.viewPage}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/retro-3.png')}
            />
          </View>
        </Swiper>
        <View style={stylesRetro.boxContent}>
          <Text style={stylesRetro.txtTitleContent}>{this._getTitle()}</Text>
          <Text style={stylesRetro.txtContent}>{this._getContent()}</Text>
          {this.state.currentPage == 2 ? (
            <View style={{height: 128, justifyContent: 'center'}}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this._openLoginScreen()}>
                <LinearGradient
                  colors={['#F0532D', '#FEBE10']}
                  useAngle={true}
                  angle={-90}
                  style={stylesRetro.buttonLogin}>
                  <Text style={stylesRetro.txtLogin}>Đăng nhập</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this._openCreateAccountScreen()}>
                <LinearGradient
                  colors={['#F0532D', '#FEBE10']}
                  useAngle={true}
                  angle={-90}
                  style={[stylesRetro.buttonLogin, {marginTop: 10}]}>
                  <Text style={stylesRetro.txtLogin}>Tạo tài khoản</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{height: 128}}></View>
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
