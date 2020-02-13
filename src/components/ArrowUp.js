import React, {Component} from 'react';
import {Image} from 'react-native';

export default class ArrowUp extends Component {
  render() {
    return (
      <Image
        source={require('../assets/images/ic-arrow-up.png')}
      />
    );
  }
}
