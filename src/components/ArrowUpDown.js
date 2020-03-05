import React, {Component} from 'react';
import {Image} from 'react-native';

export default class ArrowUpDown extends Component {
  render() {
    return (
      <Image
        resizeMode="contain"
        source={require('../assets/images/ic-arrow-up-down.png')}
        style={{width: 20, height: 20}}
      />
    );
  }
}
