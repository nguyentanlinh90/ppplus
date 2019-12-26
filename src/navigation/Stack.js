import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Splash from '../features/splash/containers/SplashContainer';
import Login from '../features/user/containers/LoginContainer';
import OTP from '../features/user/containers/OTPContainer';
import Home from '../features/home/containers/HomeContainer';
import Reward from '../features/reward/containers/RewardContainer';
import Income from '../features/income/containers/IncomeContainer';
import Voucher from '../features/user/containers/VoucherContainer';
import Redemption from '../features/user/containers/RedemptionContainer';
import Topup from '../features/user/containers/TopupContainer';
import TopupStatus from '../features/user/containers/TopupStatusContainer';
import History from '../features/user/containers/HistoryContainer';
import Password from '../features/user/containers/PasswordContainer';
import Mechanism from '../features/home/containers/MechanismContainer';
import Retro1 from '../features/retro/containers/RetroContainer1';
import CreateAccount from '../features/user/containers/CreateAccountContainer';
import SetPassword from '../features/user/containers/SetPasswordContainer';
import InputOTP from '../features/user/containers/InputOTPContainer';
import InputPhoneNumber from '../features/user/containers/InputPhoneNumberContainer';
import Message from '../features/message/containers/MesageContainer';
import Notification from '../features/notification/containers/NotificationContainer';
import Profile from '../features/profile/containers/ProfileContainer';
import FillProfile from '../features/profile/containers/FillProfileContainer';

const Stack = createStackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: {
        header: null,
      },
    },
    Retro1: {
      screen: Retro1,
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
    OTP: {
      screen: OTP,
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

    Reward: {
      screen: Reward,
      navigationOptions: {
        header: null,
      },
    },

    Income: {
      screen: Income,
      navigationOptions: {
        header: null,
      },
    },

    Voucher: {
      screen: Voucher,
      navigationOptions: {
        header: null,
      },
    },
    Redemption: {
      screen: Redemption,
      navigationOptions: {
        header: null,
      },
    },
    Topup: {
      screen: Topup,
      navigationOptions: {
        header: null,
      },
    },
    TopupStatus: {
      screen: TopupStatus,
      navigationOptions: {
        header: null,
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        header: null,
      },
    },
    Password: {
      screen: Password,
      navigationOptions: {
        header: null,
      },
    },
    Mechanism: {
      screen: Mechanism,
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
