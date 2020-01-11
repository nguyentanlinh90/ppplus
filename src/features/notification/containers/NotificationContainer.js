import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, SafeAreaView, Image, Text, RefreshControl} from 'react-native';
import styles from '../../../styles/styles';
import SpinnerComponent from '../../../components/Spinner';
import {ScrollView} from 'react-native-gesture-handler';

class NotificationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      messages: [],
    };
    console.log('linhnt constructor');
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this._fetchData();
  };
  _fetchData = () => {
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 3000);
  };

  _checkData = () => {
    if (this.state.messages.length > 0) {
      return (
        <View>
          <Text> Data</Text>
        </View>
      );
    } else {
      return (
        <View style={{alignItems: 'center', marginTop: 40}}>
          <Image
            resizeMode="contain"
            style={{height: 160}}
            source={require('../../../assets/images/ic-no-notification.png')}
          />
          <Text
            style={{
              fontSize: 16,
              color: '#1c1c1c',
              marginTop: 20,
            }}>
            Bạn không có thông báo nào
          </Text>
        </View>
      );
    }
  };

  componentDidMount() {
    console.log('linhnt componentDidMount');
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 3000);
  }

  componentWillUnmount() {
    console.log('linhnt componentWillUnmount');
  }

  render() {
    console.log('linhnt render');

    const {props} = this.props;
    return (
      <SafeAreaView>
        <SpinnerComponent visible={this.state.isLoading} />
        <Text
          style={{
            fontSize: 24,
            color: '#1c1c1c',
            fontWeight: 'bold',
            padding: 16,
          }}>
          Thông báo
        </Text>
        <View style={{height: 5, backgroundColor: '#e3e3e3'}} />
        {this.state.isLoading ? null : (
          <ScrollView
            style={{height: '100%'}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }>
            {this._checkData()}
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}
export default connect(mapStateToProps, {})(NotificationContainer);
