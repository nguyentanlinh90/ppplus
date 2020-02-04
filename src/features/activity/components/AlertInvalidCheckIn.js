import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
import BgButton from '../../../components/BgButton';

export default class AlertInvalidCheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {visible, closeAlertCheckIn, checkInAgain} = this.props;

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
          <TouchableOpacity
            style={{width: '100%', alignItems: 'flex-end'}}
            onPress={() => {
              closeAlertCheckIn();
            }}>
            <Image
              source={require('../../../assets/images/ic-close-1.png')}
              style={{
                width: 24,
                height: 24,
                justifyContent: 'flex-end',
              }}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginTop:10}}>
            Check in không hợp lệ
          </Text>
          <Text style={{fontSize: 16, marginTop: 10, color: '#1c1c1c'}}>
            Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub
            roof party..
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              checkInAgain();
            }}
            style={{
              height: 44,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
              marginBottom: 15,
            }}>
            <BgButton />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              Kiểm Tra Lại
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
