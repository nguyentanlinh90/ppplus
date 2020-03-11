import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

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
