import React, {Component} from 'react';
import {Image} from 'react-native';

export default class CloseImage extends Component {
  render() {
    return (
      <Image
        resizeMode="contain"
        source={require('../assets/images/ic-close.png')}
        style={{width: 24, height: 24}}
      />
    );
  }
}
