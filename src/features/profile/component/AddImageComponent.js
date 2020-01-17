import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from '../styles/styles';

export class AddImageComponent extends Component {
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
  renderImageClose = () => {
    return (
      <Image
        resizeMode="contain"
        source={require('../../../assets/images/ic-close.png')}
      />
    );
  };
  render() {
    const {
      showButtonAdd_1,
      showButtonAdd_2,
      showButtonAdd_3,
      showButtonAdd_4,
      urlImage_1,
      urlImage_2,
      urlImage_3,
      urlImage_4,
      handleOpenImage,
      handleCloseImage,
    } = this.props;

    return (
      <View style={styles.containerAddImage}>
        {!showButtonAdd_1 ? (
          <View style={styles.boxShowImage}>
            <Image
              resizeMode="stretch"
              source={{uri: urlImage_1}}
              style={styles.imageLoad}
            />
            <View style={styles.boxClose}>
              <TouchableOpacity
                style={styles.boxButtonAdd}
                activeOpacity={0.8}
                onPress={() => handleCloseImage(1)}>
                {this.renderImageClose()}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.boxAddImage}>
            <TouchableOpacity
              style={styles.boxButtonAdd}
              activeOpacity={0.8}
              onPress={() => handleOpenImage(1)}>
              {this.renderImagePlus()}
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.boxAddImage}>
          {!showButtonAdd_2 ? (
            <View style={styles.boxShowImage}>
              <Image
                resizeMode="stretch"
                source={{uri: urlImage_2}}
                style={styles.imageLoad}
              />
              <View style={styles.boxClose}>
                <TouchableOpacity
                  style={styles.boxButtonAdd}
                  activeOpacity={0.8}
                  onPress={() => handleCloseImage(2)}>
                  {this.renderImageClose()}
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.boxAddImage}>
              <TouchableOpacity
                style={styles.boxButtonAdd}
                activeOpacity={0.8}
                onPress={() => handleOpenImage(2)}>
                {this.renderImagePlus()}
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.boxAddImage}>
          {!showButtonAdd_3 ? (
            <View style={styles.boxShowImage}>
              <Image
                resizeMode="stretch"
                source={{uri: urlImage_3}}
                style={styles.imageLoad}
              />
              <View style={styles.boxClose}>
                <TouchableOpacity
                  style={styles.boxButtonAdd}
                  activeOpacity={0.8}
                  onPress={() => handleCloseImage(3)}>
                  {this.renderImageClose()}
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.boxAddImage}>
              <TouchableOpacity
                style={styles.boxButtonAdd}
                activeOpacity={0.8}
                onPress={() => handleOpenImage(3)}>
                {this.renderImagePlus()}
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.boxAddImage}>
          {!showButtonAdd_4 ? (
            <View style={styles.boxShowImage}>
              <Image
                resizeMode="stretch"
                source={{uri: urlImage_4}}
                style={styles.imageLoad}
              />
              <View style={styles.boxClose}>
                <TouchableOpacity
                  style={styles.boxButtonAdd}
                  activeOpacity={0.8}
                  onPress={() => handleCloseImage(4)}>
                  {this.renderImageClose()}
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.boxAddImage}>
              <TouchableOpacity
                style={styles.boxButtonAdd}
                activeOpacity={0.8}
                onPress={() => handleOpenImage(4)}>
                {this.renderImagePlus()}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}
export default AddImageComponent;
