import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Text, Image, SafeAreaView} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import DropdownAlert from 'react-native-dropdownalert';
import TabNavigator from 'react-native-tab-navigator';
import Home from '../../home/containers/HomeContainer';
import Message from '../../message/containers/MessageContainer';
import Notification from '../../notification/containers/NotificationContainer';
import Profile from '../../profile/containers/ProfileContainer';
import SpinnerComponent from '../../../components/Spinner';

import styles from '../styles/styles';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnecting: false,
      selectedTab: 'home',
      isLoading: false,
      messages: [],
    };
    this._handleConnectivityChange = this._handleConnectivityChange.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  _reloadTab = tab => {};

  _hideLoading = () => {
    this.setState({isLoading: false});
  };
  _showLoading = () => {
    this.setState({isLoading: true});
  };

  _loadData = tab => {
    this._showLoading();
    setTimeout(() => {
      this._hideLoading();
      if (tab == 'message') {
        this.setState({messages: []});
      }
    }, 1000);
  };

  _openTab = tabName => {
    if (this.state.selectedTab != tabName)
      this.setState({selectedTab: tabName});
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
  }

  _handleConnectivityChange = () => {
    NetInfo.isConnected.fetch().done(isConnected => {
      this.setState({isConnecting: isConnected});
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <SpinnerComponent visible={this.state.isLoading} />

        <TabNavigator
          style={styles.container}
          tabBarStyle={styles.tabBarStyle}
          sceneStyle={styles.sceneStyle}>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            renderIcon={() => (
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-home-unselect.png')}
                style={styles.imgNav}
              />
            )}
            renderSelectedIcon={() => (
              <View style={styles.viewSelect}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/ic-home-select.png')}
                  style={styles.imgNav}
                />
                <View style={styles.circleMenu} />
              </View>
            )}
            onPress={() => {
              this._openTab('home');
            }}>
            <Home props={this.props} />
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'message'}
            renderIcon={() => (
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-message-unselect.png')}
                style={styles.imgNav}
              />
            )}
            renderSelectedIcon={() => (
              <View style={styles.viewSelect}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/ic-message-select.png')}
                  style={styles.imgNav}
                />
                <View style={styles.circleMenu} />
              </View>
            )}
            onPress={() => {
              this._openTab('message');
              return;
              this._loadData('message');
            }}>
            <Message messages={this.state.messages} props={this.props} />
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'notification'}
            renderIcon={() => (
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-noti-unselect.png')}
                style={styles.imgNav}
              />
            )}
            renderSelectedIcon={() => (
              <View style={styles.viewSelect}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/ic-noti-select.png')}
                  style={styles.imgNav}
                />
                <View style={styles.circleMenu} />
              </View>
            )}
            onPress={() => {
              this._openTab('notification');
              return;
              this._loadData();
            }}>
            <Notification props={this.props} />
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'profile'}
            renderIcon={() => (
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-profile-unselect.png')}
                style={styles.imgNav}
              />
            )}
            renderSelectedIcon={() => (
              <View style={styles.viewSelect}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/ic-profile-select.png')}
                  style={styles.imgNav}
                />
                <View style={styles.circleMenu} />
              </View>
            )}
            onPress={() => this._openTab('profile')}>
            <Profile props={this.props} />
          </TabNavigator.Item>
        </TabNavigator>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}
export default connect(mapStateToProps, {})(MainContainer);
