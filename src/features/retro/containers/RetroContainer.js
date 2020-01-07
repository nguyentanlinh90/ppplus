import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import stylesRetro from '../styles/styles';
import Swiper from 'react-native-web-swiper';
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
      return 'Title 1';
    } else if (this.state.currentPage == 2) {
      return 'Title 2';
    } else {
      return 'Title 0';
    }
  }

  _getContent() {
    if (this.state.currentPage == 1) {
      return 'Content 1';
    } else if (this.state.currentPage == 2) {
      return 'Content 2';
    } else {
      return 'Content 0';
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
            Bỏ qua
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
          <View style={{backgroundColor: '#432', flex: 1}}>
            <Text>Slide 1</Text>
          </View>
          <View style={{backgroundColor: '#498', flex: 1}}>
            <Text>Slide 2</Text>
          </View>
          <View style={{backgroundColor: '#987', flex: 1}}>
            <Text>Slide 3</Text>
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
