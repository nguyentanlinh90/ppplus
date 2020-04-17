import 'react-native-get-random-values';
import React, {Component} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
export default class WebViewShow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  //   this.webView.isFileUploadSupported().then(res => {
  //     if (res === true) {
  //       // file upload is supported
  //     } else {
  //       // file upload is not supported
  //     }
  //   });
  }
  onMessage=(m)=> {
    //Prints out data that was passed.
    console.log('linhnt data');
    alert('linhsss')
  }

  render() {
    // const params = 'platform='+Platform.OS;
    let uri = this.props.navigation.state.params.uri;
    let header = this.props.navigation.state.params.header;
    // const injectedJS = `if (!window.location.search) {
    //   var link = document.getElementById('progress-bar');
    //   link.href = './site/index.html?${params}';
    //   link.click();
    // }`;
    return (
      <SafeAreaView style={{flex: 1}}>
        <WebView
        // injectedJavaScript={injectedJS}
          // ref={ref => (this.webview = ref)}
          source={{uri: uri, headers: header}}
          javaScriptEnabled={true}
          originWhitelist={['*']}
          allowFileAccess={true}
          startInLoadingState={true}
          useWebKit={true}
          onMessage={this.onMessage}
          goBack = {()=>{console.log('linhnt goback')}}
          
        />
      </SafeAreaView>
    );
  }
}
