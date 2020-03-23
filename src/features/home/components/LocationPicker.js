import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import styles from '../styles/styles';
import ArrowUpDown from '../../../components/ArrowUpDown';
import TagsView from '../components/TagsView';
import BgButton from '../../../components/BgButton';

export default class LocationPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      district: this.props.district,
      city: this.props.city,
    };
  }

  _selectCity = city => {
    this.setState({city: city});
  };
  _selectDistrict = district => {
    this.setState({district: district});
  };

  render() {
    const {
      handleClose,
      visible,
      cityList,
      districtList,
      city,
      district,
    } = this.props;

    return (
      <Modal
        // style={{position: 'absolute'}}
        backdropOpacity={0.4}
        backdropColor="#000"
        useNativeDriver={true}
        animationIn={'slideInUp'}
        animationInTiming={300}
        animationOut={'slideOutDown'}
        animationOutTiming={300}
        isVisible={visible}
        style={{margin: 15}}>
        <View style={{height: '100%', marginTop: 100}}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 6,
              alignItems: 'center',
              paddingBottom: 20,
            }}>
            <View style={styles.jobDetailIconBoxSelect}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-location.png')}
                style={{width: 24, height: 24}}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#757575',
                  marginLeft: 5,
                  flex: 1,
                }}>
                {this.state.district + ', ' + this.state.city}
              </Text>
              <ArrowUpDown />
            </View>
            <TagsView
              isCity={true}
              all={cityList}
              selected={[city]}
              isExclusive={true}
              selectCity={this._selectCity}
            />
            <View
              style={{
                width: '100%',
                height: 0.5,
                backgroundColor: '#d8d8d8',
                marginBottom: 5,
              }}
            />
            <TagsView
              isDistrict={true}
              all={districtList}
              selected={[district]}
              isExclusive={true}
              selectDistrict={this._selectDistrict}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleClose(this.state.city, this.state.district)}
              style={{
                height: 40,
                width: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <BgButton />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
