import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import stylesRetro from '../styles/styles';
import Swiper from 'react-native-web-swiper';
import {SCREEN_CREATE_ACCOUNT} from '../../../api/screen';
class RetroContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      title: 'Bỏ qua',
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
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={stylesRetro.boxIgnore}>
          <Text
            style={stylesRetro.txtIgnore}
            onPress={() => {
              this.props.navigation.navigate(SCREEN_CREATE_ACCOUNT);
            }}>
            {this.state.title}
          </Text>
        </View>
        <Swiper
          controlsProps={{
            prevPos: false,
            nextPos: false,
            dotStyle: {dotColor: '#FEBE10'},
            dotActiveStyle: {backgroundColor: '#F0532D'},
          }}
          onIndexChanged={index => {
            this.setState({
              currentPage: index,
            });
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/retro-1.png')}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/retro-2.png')}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/retro-3.png')}
            />
          </View>
        </Swiper>
        <View style={stylesRetro.boxContent}>
          <Text style={stylesRetro.txtTitleContent}>{this._getTitle()}</Text>
          <ScrollView style={stylesRetro.boxContent}>
            <Text style={stylesRetro.txtContent}>{this._getContent()}</Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}

export default connect(mapStateToProps, {})(RetroContainer);
