import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styleUser from '../styles/styles';
import {Dialog} from 'react-native-simple-dialogs';
export class PopupSupport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {visible, callSupport} = this.props;
    return (
      <Dialog
        visible={visible}
        onTouchOutside={() => this.setState({visible: false})}>
        <View>
          <Text style={styleUser.textTitleCallSp}>Gọi hỗ trợ</Text>
          <Text style={styleUser.txtDesCallSp}>
            Vui lòng cung cấp thông tin chính xác để lấy lại mật khẩu.
          </Text>
          <Text style={styleUser.textTitleCallSp}>1900 890 890</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => callSupport()}>
            <LinearGradient
              colors={['#F0532D', '#FEBE10']}
              useAngle={true}
              angle={-90}
              style={styleUser.buttonContinue}>
              <Text style={styleUser.buttonText}>Gọi Ngay</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={{alignItems:'center'}}>
          <Image
            resizeMode="stretch"
            source={require('../../../assets/images/bg-call-sp.png')}
            style={styleUser.imgCallSp}
          />
          </View>
          
        </View>
      </Dialog>
    );
  }
}
export default PopupSupport;
