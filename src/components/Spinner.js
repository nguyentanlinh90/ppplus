import React, {Component} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
export default class SpinnerComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {visible} = this.props;
    return (
      <Spinner
        visible={visible}
        color={'white'}
        size={'large'}
        textStyle={{color: '#fff'}}
      />
    );
  }
}
