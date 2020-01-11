import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Text, Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from '../home/containers/HomeContainer';
import Message from '../message/containers/MessageContainer';
import Notification from '../notification/containers/NotificationContainer';
import Profile from '../profile/containers/ProfileContainer';
import styles from '../../styles/styles';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
    };
  }

  componentDidMount(){
    console.log('linhnt main componentDidMount')
  }
  
  componentWillUnmount(){
    console.log('linhnt  main componentWillUnmount')
  }
  render() {
    return (
      <TabNavigator style={styles.container} tabBarStyle={styles.tabNavigator}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          renderIcon={() => (
            <Image
              resizeMode="contain"
              source={require('../../assets/images/ic-home-unselect.png')}
              style={styles.imgNav}
            />
          )}
          renderSelectedIcon={() => (
            <View style={{alignItems: 'center'}}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/ic-home-select.png')}
                style={styles.imgNav}
              />
              <View style={styles.circleMenu} />
            </View>
          )}
          onPress={() => this.setState({selectedTab: 'home'})}>
          <Home props={this.props} />
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab === 'message'}
          renderIcon={() => (
            <Image
              resizeMode="contain"
              source={require('../../assets/images/ic-message-unselect.png')}
              style={styles.imgNav}
            />
          )}
          renderSelectedIcon={() => (
            <View style={{alignItems: 'center'}}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/ic-message-select.png')}
                style={styles.imgNav}
              />
              <View style={styles.circleMenu} />
            </View>
          )}
          onPress={() => this.setState({selectedTab: 'message'})}>
          <Message props={this.props} />
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab === 'notification'}
          renderIcon={() => (
            <Image
              resizeMode="contain"
              source={require('../../assets/images/ic-noti-unselect.png')}
              style={styles.imgNav}
            />
          )}
          renderSelectedIcon={() => (
            <View style={{alignItems: 'center'}}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/ic-noti-select.png')}
                style={styles.imgNav}
              />
              <View style={styles.circleMenu} />
            </View>
          )}
          onPress={() => this.setState({selectedTab: 'notification'})}>
          <Notification props={this.props} />
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          renderIcon={() => (
            <Image
              resizeMode="contain"
              source={require('../../assets/images/ic-profile-unselect.png')}
              style={styles.imgNav}
            />
          )}
          renderSelectedIcon={() => (
            <View style={{alignItems: 'center'}}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/ic-profile-select.png')}
                style={styles.imgNav}
              />
              <View style={styles.circleMenu} />
            </View>
          )}
          onPress={() => this.setState({selectedTab: 'profile'})}>
          <Profile props={this.props} />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}
export default connect(mapStateToProps, {})(MainContainer);
