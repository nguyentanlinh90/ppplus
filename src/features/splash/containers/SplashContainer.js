import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Image} from 'react-native';
import styles from '../../../styles/styles';
import stylesSplash from '../../splash/styles/styles';
import LinearGradient from 'react-native-linear-gradient';
import {SCREEN_RETRO} from '../../../api/screen';
import {SCREEN_PROFILE} from '../../../api/screen';
import {SCREEN_HOME} from '../../../api/screen';
import {SCREEN_MAIN} from '../../../api/screen';
import {SCREEN_CREATE_ACCOUNT} from '../../../api/screen';
import {SCREEN_INFO} from '../../../api/screen';
import {SCREEN_CONFIRM_INFO} from '../../../api/screen';
class SplashContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      // this.props.navigation.dispatch({
      //   key: 'Home',
      //   type: 'ReplaceCurrentScreen',
      //   routeName: 'Home',
      //   params: {},
      // });
      // this.props.navigation.dispatch(SCREEN_PROFILE);
      this.props.navigation.dispatch({
        key: SCREEN_RETRO,
        type: 'ReplaceCurrentScreen',
        routeName: SCREEN_RETRO,
        params: {},
      });
    }, 5000);
  }
  render() {
    const {} = this.props;
    return (
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <Image
          style={{width:'100%', height:'100%'}}
          source={require('../../../assets/images/bg.png')}
        />
        <Image style={{position:'absolute'}}
          source={require('../../../assets/images/ic-splash.png')}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}

export default connect(mapStateToProps, {})(SplashContainer);
