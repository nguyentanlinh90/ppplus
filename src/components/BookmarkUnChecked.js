import React, {Component} from 'react';
import {Image} from 'react-native';

export default class BookmarkUnChecked extends Component {
  render() {
    return (
      <Image
        resizeMode="contain"
        source={require('../assets/images/bookmark-unchecked.png')}
        style={{width: 24, height: 24}}
      />
    );
  }
}
