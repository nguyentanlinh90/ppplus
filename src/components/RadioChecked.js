import React, {Component} from 'react';
import {Image} from 'react-native';

export default class RadioChecked extends Component {
  render() {
    return (
        <Image
        style={{width: 20, height: 20}}
        source={require('../assets/images/radio-checked.png')}
      />
    );
  }
}
