import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, SafeAreaView, ScrollView, Image, Text, RefreshControl} from 'react-native';
import styles from '../styles/styles';
import SpinnerComponent from '../../../components/Spinner';

class ScheduleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
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
            Bạn không có lịch làm việc nào
          </Text>
        </View>
      );
    }
  };

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.props.handleRenderLoading('message');
  //   }, 1000);
  // }

  componentWillUnmount() {
  }

  render() {
    const {props} = this.props;

    return (
      <SafeAreaView>
        <Text style={styles.title}>Lịch làm việc</Text>
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
export default connect(mapStateToProps, {})(ScheduleContainer);
