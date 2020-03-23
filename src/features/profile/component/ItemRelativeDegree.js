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
          <View
            style={{
              flex: 1,
              marginEnd: 10,
              backgroundColor: '#f1f1f1',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {item.degree_image_front ? (
              <View style={{width: '100%', height: '100%'}}>
                <Image
                  resizeMode="stretch"
                  source={{uri: item.degree_image_front}}
                  style={styles.boxIDItemImage}
                />
                <TouchableOpacity
                  style={styles.boxIDItemClose}
                  onPress={() =>
                    handleCloseImageDegree(index, IMAGE_DEGREE_FRONT)
                  }>
                  <CloseImage />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  handleOpenImageDegree(index, IMAGE_DEGREE_FRONT)
                }>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/ic-plus.png')}
                  style={{width: 45, height: 45}}
                />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#f1f1f1',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {item.degree_image_behind ? (
              <View style={{width: '100%', height: '100%'}}>
                <Image
                  resizeMode="stretch"
                  source={{uri: item.degree_image_behind}}
                  style={styles.boxIDItemImage}
                />
                <TouchableOpacity
                  style={styles.boxIDItemClose}
                  onPress={() =>
                    handleCloseImageDegree(index, IMAGE_DEGREE_BEHIND)
                  }>
                  <CloseImage />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  handleOpenImageDegree(index, IMAGE_DEGREE_BEHIND)
                }>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/ic-plus.png')}
                  style={{width: 45, height: 45}}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}
