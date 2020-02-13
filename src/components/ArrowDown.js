import React, {Component} from 'react';
import {Image} from 'react-native';

export default class ArrowDown extends Component {
  render() {
    return (
      <Image
        resizeMode="contain"
        source={require('../assets/images/ic-arrow-down.png')}
      />
    );
  }
}
