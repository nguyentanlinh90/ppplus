import React, {Component} from 'react';
import {Image} from 'react-native';

export default class CBUnChecked extends Component {
  render() {
    return (
      <Image
        resizeMode="contain"
        source={require('../assets/images/checkbox-unchecked.png')}
        style={{width: 20, height: 20}}
      />
    );
  }
}
