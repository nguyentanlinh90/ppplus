import React, {Component} from 'react';
import {View, Text} from 'react-native';
export default class JobRequestItem extends Component {
  render() {
    const {title, content} = this.props;
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            height: 44,
            alignItems: 'center',
          }}>
          <Text style={{flex: 1, color: '#757575', fontSize: 16}}>{title}</Text>
          <Text style={{flex: 1, color: '#1C1C1C', fontSize: 16}}>
            {content}
          </Text>
        </View>
        <View style={{height: 0.3, backgroundColor: '#757575'}} />
      </View>
    );
  }
}
