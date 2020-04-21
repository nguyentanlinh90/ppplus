import 'react-native-get-random-values';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import {EVENT_CODE_BACK} from '../../../utils/constants';
export default class WebViewShow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onMessage = event => {
    let eventCode = JSON.parse(event.nativeEvent.data).code_event;

    if (EVENT_CODE_BACK == eventCode) {
      this.props.navigation.state.params.onGoBack();
      this.props.navigation.goBack();
    }
  };

  render() {
    let uri = this.props.navigation.state.params.uri;
    let header = this.props.navigation.state.params.header;
    return (
      <SafeAreaView style={{flex: 1}}>
        <WebView
          scrollEnabled={true}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          useWebKit={true}
          mixedContentMode="always"
          bounces={false}
          source={{uri: uri, headers: header}}
          onMessage={this.onMessage}
        />
      </SafeAreaView>
    );
  }
}
