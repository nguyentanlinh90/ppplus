import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Splash from '../features/splash/containers/SplashContainer';
import Login from '../features/user/containers/LoginContainer';
import Home from '../features/home/containers/HomeContainer';
import Retro from '../features/retro/containers/RetroContainer';
import CreateAccount from '../features/user/containers/CreateAccountContainer';
import SetPassword from '../features/user/containers/SetPasswordContainer';
import InputOTP from '../features/user/containers/InputOTPContainer';
import InputPhoneNumber from '../features/user/containers/InputPhoneNumberContainer';
import Message from '../features/message/containers/MessageContainer';
import Notification from '../features/notification/containers/NotificationContainer';
import Profile from '../features/profile/containers/ProfileContainer';
import FillProfile from '../features/profile/containers/FillProfileContainer';
import Main from '../features/main/MainContainer';
import Info from '../features/info/containers/InfoContainer';
import ConfirmInfo from '../features/info/containers/ConfirmInfoContainer';

const Stack = createStackNavigator(
  {
    Splash: {
      screen: Splash,
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
    SetPassword: {
      screen: SetPassword,
      navigationOptions: {
        header: null,
      },
    },
    Message: {
      screen: Message,
      navigationOptions: {
        header: null,
      },
    },
    Notification: {
      screen: Notification,
      navigationOptions: {
        header: null,
      },
    },
    Profile: {
      screen: Profile,
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
    InputOTP: {
      screen: InputOTP,
      navigationOptions: {
        header: null,
      },
    },
    InputPhoneNumber: {
      screen: InputPhoneNumber,
      navigationOptions: {
        header: null,
      },
    },
    Home: {
      screen: Home,
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
    Info: {
      screen: Info,
      navigationOptions: {
        header: null,
      },
    },
    ConfirmInfo: {
      screen: ConfirmInfo,
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

export default AppContainer = createAppContainer(Stack);
