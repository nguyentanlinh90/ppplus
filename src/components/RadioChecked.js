import React, {Component} from 'react';
import {Image} from 'react-native';

export default class RadioChecked extends Component {
  render() {
    return (
      <Image
        resizeMode="contain"
        source={require('../assets/images/radio-checked.png')}
        style={{width: 20, height: 20}}
      />
    );
  }
}
