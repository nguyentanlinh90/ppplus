import React, {Component} from 'react';
import {Image} from 'react-native';

export default class CBHidePass extends Component {
  render() {
    return (
      <Image
        resizeMode="contain"
        source={require('../assets/images/ic-pass-hide.png')}
        style={{width: 24, height: 24}}
      />
    );
  }
}
