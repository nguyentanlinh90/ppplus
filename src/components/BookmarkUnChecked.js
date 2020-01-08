import React, {Component} from 'react';
import {Image} from 'react-native';

export default class BookmarkUnChecked extends Component {
  render() {
    return (
        <Image
        source={require('../assets/images/bookmark-unchecked.png')}
      />
    );
  }
}
