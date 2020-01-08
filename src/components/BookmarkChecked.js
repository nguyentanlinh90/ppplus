import React, {Component} from 'react';
import {Image} from 'react-native';

export default class BookmarkChecked extends Component {
  render() {
    return (
        <Image
        source={require('../assets/images/bookmark-checked.png')}
      />
    );
  }
}
