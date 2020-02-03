import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import BgButton from '../../../components/BgButton';

export default class AlertJob extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      visible,
      name,
      timeStart,
      timeEnd,
      jobTitle,
      jobAddress,
      closeAlertJob,
      openStartJob,
    } = this.props;

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
              closeAlertJob();
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
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Chào, {name}</Text>
          <Text style={{fontSize: 16, marginTop: 10, color: '#1c1c1c'}}>
            Bạn có ca làm việc vào lúc
          </Text>
          <View style={{backgroundColor: '#FEF0ED', marginTop: 8}}>
            <Text
              style={{
                fontSize: 16,
                color: '#F0532D',
                fontWeight: 'bold',
                paddingStart: 12,
                paddingBottom: 7,
                paddingEnd: 12,
                paddingTop: 7,
              }}>
              {timeStart} ~ {timeEnd}
            </Text>
          </View>
          <View style={{marginTop: 16, flexDirection: 'row'}}>
            <Image
              source={require('../../../assets/images/ic-alert-title.png')}
            />
            <Text style={{color: '#757575', fontSize: 16, marginStart: 5}}>
              {jobTitle}
            </Text>
          </View>
          <View style={{marginTop: 8, flexDirection: 'row'}}>
            <Image
              source={require('../../../assets/images/ic-alert-location.png')}
            />
            <Text
              style={{
                color: '#757575',
                fontSize: 16,
                marginStart: 5,
                textAlign: 'center',
              }}>
              {jobAddress}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              openStartJob();
            }}
            style={{
              height: 44,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
              marginBottom: 30,
            }}>
            <BgButton />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              Vào Ca
            </Text>
          </TouchableOpacity>
          <Image
            source={require('../../../assets/images/bg-alert-job.png')}
            style={{marginBottom: 16}}
          />
        </View>
      </Modal>
    );
  }
}
