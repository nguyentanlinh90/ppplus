import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import RadioForm from 'react-native-simple-radio-button';
import styles from '../styles/styles';
export default class PopupSelect extends Component {
  render() {
    const {title, isVisible, data, listData, onConfirm} = this.props;
    let dataSelect = data;
    return (
      <Modal
        backdropOpacity={0.4}
        backdropColor="#000"
        useNativeDriver={true}
        animationIn={'slideInUp'}
        animationInTiming={300}
        animationOut={'slideOutDown'}
        animationOutTiming={300}
        isVisible={isVisible}
        style={{margin: 15}}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 20,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16}}>{title}</Text>
          <RadioForm
            style={{marginBottom: 20, marginTop: 20}}
            radio_props={listData}
            initial={dataSelect}
            buttonColor={'#F0532D'}
            selectedButtonColor={'#F0532D'}
            labelStyle={{fontSize: 18, marginBottom: 20}}
            onPress={value => {
              dataSelect = value;
            }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={{backgroundColor: '#F0532D', borderRadius: 30}}
            onPress={() => {
              onConfirm(dataSelect);
            }}>
            <Text style={styles.btSelectGender}>Đồng ý</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
