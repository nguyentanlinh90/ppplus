import React, {Component} from 'react';
import {Image} from 'react-native';

export default class ArrowInBox extends Component {
  render() {
    const {styles} = this.props;
    return (
      <Image
        resizeMode="contain"
        source={require('../assets/images/ic-picker.png')}
      />
    );
  }
}
