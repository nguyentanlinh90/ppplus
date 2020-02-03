import React, {Component} from 'react';
import {Image} from 'react-native';

export default class BgButton extends Component {
  render() {
    return (
      <Image
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 6,
          position: 'absolute',
        }}
        source={require('../assets/images/bg-button.png')}
      />
    );
  }
}
