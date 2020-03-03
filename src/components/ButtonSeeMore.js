import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

export default class ButtonSeeMore extends Component {
  render() {
    const {isSeeMore, handlePress} = this.props;
    return (
      <TouchableOpacity onPress={() => handlePress()}>
        <View
          style={{
            borderColor: '#fa6400',
            height: 44,
            borderWidth: 1,
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            marginStart: 20,
            marginEnd: 20,
          }}>
          <Text style={{color: '#fa6400', fontSize: 16, fontWeight: 'bold'}}>
            {isSeeMore ? 'Thu Gọn' : 'Xem thêm'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
