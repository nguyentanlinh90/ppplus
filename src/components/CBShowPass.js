import React, {Component} from 'react';
import {Image} from 'react-native';

export default class CBShowPass extends Component {
  render() {
    return (
      <Image
        resizeMode="contain"
        source={require('../assets/images/ic-pass-show.png')}
        style={{width: 24, height: 24}}
      />
    );
  }
}
