import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from '../styles/styles';
import {IMAGE_1, IMAGE_2, IMAGE_3, IMAGE_4} from '../../../utils/constants';
import CloseImage from '../../../components/CloseImage';
export default class FormImageProfile extends Component {
  constructor(props) {
    super(props);
  }
  renderImagePlus = () => {
    return (
      <Image
        resizeMode="contain"
        source={require('../../../assets/images/ic-plus.png')}
      />
    );
  };

  _renderImageOpen = (url, type) => {
    return (
      <View style={styles.boxShowImage}>
        <Image
          resizeMode="stretch"
          source={{uri: url}}
          style={styles.imageLoad}
        />
        <TouchableOpacity
          style={styles.boxIDItemClose}
          onPress={() => this.props.handleCloseImage(type)}>
          <CloseImage />
        </TouchableOpacity>
      </View>
    );
  };

  _renderImageEmpty = type => {
    return (
      <View style={styles.boxAddImage}>
        <TouchableOpacity
          style={styles.boxButtonAdd}
          onPress={() => this.props.handleOpenImage(type)}>
          {this.renderImagePlus()}
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const {
      urlImage_1,
      urlImage_2,
      urlImage_3,
      urlImage_4,
      handleOpenImage,
      handleCloseImage,
    } = this.props;

    return (
      <View style={styles.containerAddImage}>
        {urlImage_1
          ? this._renderImageOpen(urlImage_1, IMAGE_1)
          : this._renderImageEmpty(IMAGE_1)}
        {urlImage_2
          ? this._renderImageOpen(urlImage_2, IMAGE_2)
          : this._renderImageEmpty(IMAGE_2)}
        {urlImage_3
          ? this._renderImageOpen(urlImage_3, IMAGE_3)
          : this._renderImageEmpty(IMAGE_3)}
        {urlImage_4
          ? this._renderImageOpen(urlImage_4, IMAGE_4)
          : this._renderImageEmpty(IMAGE_4)}
      </View>
    );
  }
}
