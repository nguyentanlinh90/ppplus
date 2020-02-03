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
import styles from '../styles/styles';
import Swiper from 'react-native-web-swiper';
import BgButton from '../../../components/BgButton';

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
            style={styles.viewIgnore}
            activeOpacity={0.7}
            onPress={() => this.setState({currentPage: 2})}>
            <Text style={styles.txtIgnore}></Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.viewIgnore} />
        )}

        <Swiper
          controlsProps={{
            prevPos: false,
            nextPos: false,
            dotActiveStyle: {backgroundColor: '#F0532D'},
            dotsTouchable: true,
            dotProps: {badgeStyle: {backgroundColor: '#F6C8A1'}},
          }}
          currentPage={this.state.currentPage}
          onIndexChanged={index => {
            this.setState({
              currentPage: index,
            });
          }}>
          <View style={styles.viewPage}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/retro-1.png')}
            />
          </View>
          <View style={styles.viewPage}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/retro-2.png')}
            />
          </View>
          <View style={styles.viewPage}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/retro-3.png')}
            />
          </View>
        </Swiper>
        <View style={styles.boxContent}>
          <Text style={styles.txtTitleContent}>{this._getTitle()}</Text>
          <Text style={styles.txtContent}>{this._getContent()}</Text>
          {this.state.currentPage == 2 ? (
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
                <BgButton />

                <Text style={styles.txtLogin}>Tạo tài khoản</Text>
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
