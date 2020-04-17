import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
export const colors = {
  main: '#ff4f58',
  black: '#000',
  white: '#fff',
  c_757575: '#757575',
  c_f0532d: '#f0523d',
  c_d8d8d8: '#d8d8d8',
  c_f1f1f1: '#f1f1f1',
  c_25a174 : '#25a174'
};
export const sizes = {
  s_0: 0,
  s_1: 1,
  s_2: 2,
  s_3: 3,
  s_4: 4,
  s_5: 5,
  s_8: 8,
  s_10: 10,
  s_12: 12,
  s_14: 14,
  s_15: 15,
  s_16: 16,
  s_17: 17,
  s_20: 20,
  s_22: 22,
  s_24: 24,
  s_25: 25,
  s_26: 26,
  s_30: 30,
  s_34: 34,
  s_40: 40,
  s_44: 44,
  s_48: 48,
  s_50: 50,
  s_59: 59,
  s_60: 60,
  s_70: 70,
  s_85: 85,
  s_94: 94,
  s_100: 100,
  s_140: 140,
  s_200: 200,
};
export default StyleSheet.create({
  defaultContainerDropdown: {
    paddingLeft: 10,
    paddingEnd: 20,
    height: 120,
    paddingTop: 20,
  },

  defaultTextContainerDropdown: {
    height: 100,
    marginTop: 30,
    marginLeft: 20,
    marginEnd: 20,
  },
  jobDetailViewHeader: {
    height: Platform.OS === 'ios' ? getStatusBarHeight() + 100 : 100,
  },
  jobDetailBoxButtonBack: {
    width: 60,
    height: 70,
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
