import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from '../styles/styles';
import {IMAGE_1, IMAGE_2, IMAGE_3, IMAGE_4} from '../../../utils/constants';
import CloseImage from '../../../components/CloseImage';
import {isEmpty} from '../../../utils/utils';
export default class FormImageProfile extends Component {
  constructor(props) {
    super(props);
  }
  renderImagePlus = () => {
    return (
      <Image
        resizeMode="contain"
        source={require('../../../assets/images/ic-plus.png')}
        style={{width: 24, height: 24}}
      />
    );
  };

  _onError(error) {
    this.setState({image: require('../../../assets/images/broken-image.png')});
  }
  _renderImageOpen = (url, type) => {
    return (
      <View style={styles.boxShowImage}>
        <Image
          resizeMode="stretch"
          source={{uri: url}}
          // onError={this._onError.bind(this)}
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
    const {sub_avatar_list} = this.props;

    return (
      <View style={styles.containerAddImage}>
        {!isEmpty(sub_avatar_list.sub_avatar_1)
          ? this._renderImageOpen(sub_avatar_list.sub_avatar_1, IMAGE_1)
          : this._renderImageEmpty(IMAGE_1)}
        {!isEmpty(sub_avatar_list.sub_avatar_2)
          ? this._renderImageOpen(sub_avatar_list.sub_avatar_2, IMAGE_2)
          : this._renderImageEmpty(IMAGE_2)}
        {!isEmpty(sub_avatar_list.sub_avatar_3)
          ? this._renderImageOpen(sub_avatar_list.sub_avatar_3, IMAGE_3)
          : this._renderImageEmpty(IMAGE_3)}
        {!isEmpty(sub_avatar_list.sub_avatar_4)
          ? this._renderImageOpen(sub_avatar_list.sub_avatar_4, IMAGE_4)
          : this._renderImageEmpty(IMAGE_4)}
      </View>
    );
  }
}
