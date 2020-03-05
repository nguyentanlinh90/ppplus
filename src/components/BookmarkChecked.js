import React, {Component} from 'react';
import {Image} from 'react-native';

export default class BookmarkChecked extends Component {
  render() {
    return (
      <Image
        resizeMode="contain"
        source={require('../assets/images/bookmark-checked.png')}
        style={{width: 24, height: 24}}
      />
    );
  }
}
