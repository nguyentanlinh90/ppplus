import React, {Component} from 'react';
import {Image} from 'react-native';

export default class RadioUnChecked extends Component {
  render() {
    return (
        <Image
        style={{width: 20, height: 20}}
        source={require('../assets/images/radio-unchecked.png')}
      />
    );
  }
}
