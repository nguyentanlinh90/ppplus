import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import styles from '../../../styles/styles';
import stylesSplash from '../../splash/styles/styles';
import LinearGradient from 'react-native-linear-gradient';
import {SCREEN_RETRO_1} from '../../../api/screen';
import {SCREEN_PROFILE} from '../../../api/screen';
import {SCREEN_HOME} from '../../../api/screen';
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
        key: SCREEN_HOME,
        type: 'ReplaceCurrentScreen',
        routeName: SCREEN_HOME,
        params: {},
      });
    }, 1000);
  }
  render() {
    const {} = this.props;
    return (
      <LinearGradient colors={['#FEBE10', '#F0532D']} style={styles.container}>
        <View style={stylesSplash.image}>
          <Text>SplashContainer</Text>
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

export default connect(mapStateToProps, {})(SplashContainer);
