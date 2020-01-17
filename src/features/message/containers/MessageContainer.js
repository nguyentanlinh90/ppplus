import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, SafeAreaView, Image, Text, RefreshControl} from 'react-native';
import styles from '../styles/styles';
import SpinnerComponent from '../../../components/Spinner';
import {ScrollView} from 'react-native-gesture-handler';

class MessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
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
    }, 1000);
  };

  _checkData = () => {
    if (this.props.messages.length > 0) {
      return (
        <View>
          <Text> Data</Text>
        </View>
      );
    } else {
      return (
        <View style={{alignItems: 'center', marginTop: 40}}>
          <Image source={require('../../../assets/images/ic-no-message.png')} />
          <Text
            style={{
              fontSize: 16,
              color: '#1c1c1c',
              marginTop: 20,
            }}>
            Bạn không có tin nhắn
          </Text>
        </View>
      );
    }
  };

  // componentDidMount() {
  //   console.log('linhnt componentDidMount');
  //   setTimeout(() => {
  //     this.props.handleRenderLoading('message');
  //   }, 1000);
  // }

  componentWillUnmount() {
    console.log('linhnt componentWillUnmount');
  }

  render() {
    const {props} = this.props;

    

    console.log('linhnt render');
    return (
      <SafeAreaView>
        <Text style={styles.title}>Tin nhắn</Text>
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
export default connect(mapStateToProps, {})(MessageContainer);
