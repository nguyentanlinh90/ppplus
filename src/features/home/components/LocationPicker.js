import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import styleHome from '../styles/styles';
import ArrowInBox from '../../../components/ArrowInBox';
import TagsView from '../components/TagsView';
import LinearGradient from 'react-native-linear-gradient';

export default class LocationPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {handleClose, visible, city, district} = this.props;

    const citySelected = ['Hồ Chí Minh'];

    const districtSelected = ['Quận 3'];

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
        isVisible={visible}>
        <View style={{height: '100%'}}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 6,
              alignItems: 'center',
              paddingBottom: 20,
            }}>
            <View style={styleHome.jobDetailIconBoxSelect}>
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
                Test Test
              </Text>
              <ArrowInBox />
            </View>
            <TagsView all={city} selected={citySelected} isExclusive={true} />
            <View
              style={{
                width: '100%',
                height: 0.1,
                backgroundColor: '#757575',
                marginBottom: 10,
              }}
            />
            <TagsView
              all={district}
              selected={districtSelected}
              isExclusive={true}
            />
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleClose()}>
              <LinearGradient
                colors={['#F0532D', '#FEBE10']}
                useAngle={true}
                angle={-90}
                style={{
                  borderRadius: 5,
                  borderColor: '#b4b8c7',
                  borderStyle: 'solid',
                  height: 40,
                  width: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}>
                  OK
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
