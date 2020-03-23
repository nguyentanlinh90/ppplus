import React, {Component} from 'react';
import {View} from 'react-native';

import styles from '../styles/styles';

export default class CategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation} = this.props;
    return <View style={{flex: 1}}></View>;
  }
}
