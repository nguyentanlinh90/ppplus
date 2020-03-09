import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from '../styles/styles';
import {
  IMAGE_DEGREE_FRONT,
  IMAGE_DEGREE_BEHIND,
} from '../../../utils/constants';
import CloseImage from '../../../components/CloseImage';
import {
  boxSelectStyle,
  txtInBoxSelectStyle,
  txtInputStyle,
  isEmpty,
} from '../../../utils/utils';
export default class ItemRelativeDegree extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      index,
      item,
      onChangeTextDegree,
      handleOpenImageDegree,
      handleCloseImageDegree,
    } = this.props;
    console.log('linhnt', item)

    return (
      <View style={{marginBottom: 20}}>
        <TextInput
          style={[txtInputStyle(item.degree_name), {marginBottom: 10}]}
          returnKeyType="done"
          value={item.degree_name}
          name="degree_name"
          placeholder="Nhập tên bằng cấp"
          onChangeText={text => onChangeTextDegree(index, text, 'degree_name')}
        />
        <View style={styles.boxID}>
          <View style={{flex: 1, marginEnd: 10}}>
            <Image
              resizeMode="stretch"
              source={
                item.degree_image_front
                  ? {uri: item.degree_image_front}
                  : require('../../../assets/images/bg-id-front.png')
              }
              style={styles.boxIDItemImage}
            />
            {item.degree_image_front ? (
              <TouchableOpacity
                style={styles.boxIDItemClose}
                onPress={() => handleCloseImageDegree(index, IMAGE_DEGREE_FRONT)}>
                <CloseImage />
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={{flex: 1}}>
            <Image
              resizeMode="stretch"
              source={
                item.degree_image_behind
                  ? {uri: item.degree_image_behind}
                  : require('../../../assets/images/bg-id-behind.png')
              }
              style={styles.boxIDItemImage}
            />
            {item.degree_image_behind ? (
              <TouchableOpacity
                style={styles.boxIDItemClose}
                onPress={() => handleCloseImageDegree(index, IMAGE_DEGREE_BEHIND)}>
                <CloseImage />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <View style={styles.viewButtonSelectID}>
          <TouchableOpacity
            style={[styles.buttonSelectID, {marginEnd: 10}]}
            onPress={() => handleOpenImageDegree(index, IMAGE_DEGREE_FRONT)}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-camera-white.png')}
              style={{width: 24, height: 24}}
            />
            <Text style={styles.txtSelectID}>Mặt trước</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSelectID}
            onPress={() => handleOpenImageDegree(index, IMAGE_DEGREE_BEHIND)}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-camera-white.png')}
              style={{width: 24, height: 24}}
            />
            <Text style={styles.txtSelectID}>Mặt sau</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
