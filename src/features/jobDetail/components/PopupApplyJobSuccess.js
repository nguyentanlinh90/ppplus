import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import BgButton from '../../../components/BgButton';

export default class PopupApplyJobSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {visible, joinTraining, close} = this.props;

    return (
      <Modal
        backdropOpacity={0.4}
        backdropColor="#000"
        useNativeDriver={true}
        animationIn={'slideInUp'}
        animationInTiming={300}
        animationOut={'slideOutDown'}
        animationOutTiming={300}
        isVisible={visible}
        style={{margin: 15}}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 20,
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/images/ic-close-1.png')}
            style={{
              width: 150,
              height: 150,
              marginTop: 30,
            }}
          />

          <Text
            style={{
              fontSize: 16,
              color: '#1c1c1c',
              margin: 30,
              textAlign: 'center',
            }}>
            Vui lòng tham gia khoá đào tạo để tiếp tục
          </Text>

          <TouchableOpacity
            style={{
              width: '100%',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              joinTraining();
            }}>
            <BgButton />
            <Text style={{color: '#FFF', fontSize: 16, fontWeight: 'bold'}}>
              Tham gia đào tạo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => {
              close();
            }}>
            <Text
              style={{
                color: '#ABABAB',
                fontSize: 16,
                fontWeight: 'bold',
                paddingStart: 30,
                paddingEnd: 30,
              }}>
              Đóng
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
