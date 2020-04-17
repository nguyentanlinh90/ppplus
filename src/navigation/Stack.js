import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Splash from '../features/splash/containers/SplashContainer';
import Retro from '../features/retro/containers/RetroContainer';
import CreateAccount from '../features/user/containers/CreateAccountContainer';
import InputOTP from '../features/user/containers/InputOTPContainer';
import Login from '../features/user/containers/LoginContainer';
import UpdatePass from '../features/user/containers/UpdatePassContainer';
import Info from '../features/info/containers/InfoContainer';
import Main from '../features/main/containers/MainContainer';
import Search from '../features/search/containers/SearchContainer';
import FillProfile from '../features/profile/containers/FillProfileContainer';
import Program from '../features/program/containers/ProgramContainer';
import StartJob from '../features/activity/containers/StartJobContainer';
import Product from '../features/product/containers/ProductContainer';
import JobDetail from '../features/jobDetail/containers/JobDetailContainer';
import WebViewShow from '../features/schedule/containers/WebViewShow';

const Stack = createStackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: {
        header: null,
      },
    },
    Retro: {
      screen: Retro,
      navigationOptions: {
        header: null,
      },
    },
    CreateAccount: {
      screen: CreateAccount,
      navigationOptions: {
        header: null,
      },
    },
    InputOTP: {
      screen: InputOTP,
      navigationOptions: {
        header: null,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    UpdatePass: {
      screen: UpdatePass,
      navigationOptions: {
        header: null,
      },
    },
    Info: {
      screen: Info,
      navigationOptions: {
        header: null,
      },
    },
    Main: {
      screen: Main,
      navigationOptions: {
        header: null,
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        header: null,
      },
    },
    FillProfile: {
      screen: FillProfile,
      navigationOptions: {
        header: null,
      },
    },
    Program: {
      screen: Program,
      navigationOptions: {
        header: null,
      },
    },
    StartJob: {
      screen: StartJob,
      navigationOptions: {
        header: null,
      },
    },
    Product: {
      screen: Product,
      navigationOptions: {
        header: null,
      },
    },
    JobDetail: {
      screen: JobDetail,
      navigationOptions: {
        header: null,
      },
    },
    WebViewShow: {
      screen: WebViewShow,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

const prevGetState = Stack.router.getStateForAction;
Stack.router.getStateForAction = (action, state) => {
  if (state && action.type === 'ReplaceCurrentScreen') {
    const routes = state.routes.slice(0, state.routes.length - 1);
    routes.push(action);
    return {
      ...state,
      routes,
      index: routes.length - 1,
    };
  }
  return prevGetState(action, state);
};

export default (AppContainer = createAppContainer(Stack));
