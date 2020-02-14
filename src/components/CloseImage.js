import React, {Component} from 'react';
import {Image} from 'react-native';

export default class CloseImage extends Component {
  render() {
    return (
      <Image
        source={require('../assets/images/ic-close.png')}
      />
    );
  }
}
