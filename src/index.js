import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppContainer from './navigation/Stack';
import configureStore from './store/configureStore';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
