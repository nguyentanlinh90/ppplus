import React, {Component} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {Text} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
export default class SpinnerComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {visible} = this.props;
    return (
      <Spinner
        visible={visible}
        customIndicator={<BarIndicator color="white" count={5} />}
      />
    );
  }
}
