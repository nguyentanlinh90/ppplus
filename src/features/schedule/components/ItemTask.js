import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import BgButton from '../../../components/BgButton';
import {colors, sizes} from '../../../styles/styles';

export default class ItemTask extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {item} = this.props;

    return (
      <TouchableOpacity
        style={{paddingStart: sizes.s_22, paddingEnd: sizes.s_15}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: colors.c_727373,
                marginStart: sizes.s_3,
                fontSize: sizes.s_14,
              }}>
              Tiến độ
            </Text>
          </View>
          <View style={{flex: 4, backgroundColor: '#098'}}>
            <Text>Title</Text>
          </View>
        </View>
        <TouchableOpacity style={{height: sizes.s_40}}>
          <Text>sadsadsa</Text>
          <BgButton />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}
