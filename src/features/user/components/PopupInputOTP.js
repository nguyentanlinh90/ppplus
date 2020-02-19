import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/styles';
import Modal from 'react-native-modal';
export default class PopupInputOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {visible, phone, conFirm} = this.props;
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
          <Text style={styles.textTitleCallSp}>Gọi hỗ trợ</Text>
          <Text style={styles.txtDesCallSp}>
            Một mã xác nhận đã được gửi đến số điện thoại {phone}. Vui lòng nhập
            mã xác nhận để thay đổi mật khẩu
          </Text>
          <Text style={styles.textTitleCallSp}>1900 890 890</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => conFirm()}>
            <LinearGradient
              colors={['#F0532D', '#FEBE10']}
              useAngle={true}
              angle={-90}
              style={styles.buttonContinue}>
              <Text style={styles.buttonText}>Xác nhận</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Image
              resizeMode="stretch"
              source={require('../../../assets/images/bg-call-sp.png')}
              style={styles.imgCallSp}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
