import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Card} from 'react-native-shadow-cards';

export default class ButtonSeeMore extends Component {
  render() {
    const {isSeeMore, handlePress} = this.props;
    return (
      <TouchableOpacity onPress={() => handlePress()}>
        <Card
          style={{
            width: '100%',
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          elevation={1}
          opacity={0.5}>
          <Text style={{color: '#ababab', fontSize: 14, fontWeight: '600'}}>
            {isSeeMore ? 'Thu Gọn' : 'Xem thêm'}
          </Text>
        </Card>
      </TouchableOpacity>
    );
  }
}
