import React, {Component} from 'react';
import {Image} from 'react-native';

export default class CBUnChecked extends Component {
  render() {
    return (
        <Image
        style={{width: 20, height: 20}}
        source={require('../assets/images/checkbox-unchecked.png')}
      />
    );
  }
}
