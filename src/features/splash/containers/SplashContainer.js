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
        key: SCREEN_MAIN,
        type: 'ReplaceCurrentScreen',
        routeName: SCREEN_MAIN,
        params: {},
      });
    }, 1000);
  }
  render() {
    const {} = this.props;
    return (
      <View >
        <Image
          style={{width:'100%', height:'100%'}}
          source={require('../../../assets/images/bg.png')}
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
