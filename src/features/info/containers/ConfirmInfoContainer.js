import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../../styles/styles';
import stylesInfo from '../styles/styles';
import {SCREEN_HOME} from '../../../api/screen';

class ConfirmInfoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _openHomeScreen = () => {
    this.props.navigation.dispatch({
      key: SCREEN_HOME,
      type: 'ReplaceCurrentScreen',
      routeName: SCREEN_HOME,
      params: {},
    });
  };

  render() {
    const {} = this.props;
    return (
      <LinearGradient
        colors={['#FEBE10', '#F0532D']}
        style={[styles.container, {justifyContent: 'center'}]}>
        <View
          style={{
            height: 300,
            backgroundColor: '#fff',
            marginStart: 20,
            marginEnd: 20,
            borderRadius: 10,
            paddingStart: 20,
            paddingBottom: 30,
            paddingEnd: 20,
            paddingTop: 30,
          }}>
          <Text style={{color: '#000', fontSize: 18, textAlign: 'center'}}>
            Hãy đảm bảo các thông tin bạn cung cấp chính xác. Chúng tôi sẽ kiểm
            tra và không chịu trách nhiệm nếu bạn cung cấp thông tin sai lệch.
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this._openHomeScreen()}>
            <LinearGradient
              colors={['#F0532D', '#FEBE10']}
              useAngle={true}
              angle={-90}
              style={stylesInfo.buttonDone}>
              <Text style={stylesInfo.txtDone}>Xác nhận</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.navigation.goBack()}>
            <Text
              style={{
                marginTop: 20,
                color: '#F0532D',
                fontSize: 16,
                textAlign: 'center',
              }}>
              Kiểm tra lại
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}

export default connect(mapStateToProps, {})(ConfirmInfoContainer);
