import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/styles';
import Modal from 'react-native-modal';
export class PopupSupport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {visible, callSupport} = this.props;
    return (
      <Modal
        backdropOpacity={0.4}
        backdropColor="#000"
        useNativeDriver={true}
        animationIn={'slideInUp'}
        animationInTiming={300}
        animationOut={'slideOutDown'}
        animationOutTiming={300}
        isVisible={this.state.showGenderSelect}
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
            Vui lòng cung cấp thông tin chính xác để lấy lại mật khẩu.
          </Text>
          <Text style={styles.textTitleCallSp}>1900 890 890</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => callSupport()}>
            <LinearGradient
              colors={['#F0532D', '#FEBE10']}
              useAngle={true}
              angle={-90}
              style={styles.buttonContinue}>
              <Text style={styles.buttonText}>Gọi Ngay</Text>
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
export default PopupSupport;
