import {StyleSheet, Platform, Dimensions} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
const dimensions = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarStyle: {
    backgroundColor: '#fff',
    alignItems: 'center',
    height: 55,
    marginBottom:
      Platform.OS === 'ios' &&
      (dimensions.height === 812 ||
        dimensions.width === 812 ||
        dimensions.height === 896 ||
        dimensions.width === 896)
        ? 15
        : 0,
  },
  sceneStyle: {
    backgroundColor: '#fff',
    paddingBottom:
      Platform.OS === 'ios' &&
      (dimensions.height === 812 ||
        dimensions.width === 812 ||
        dimensions.height === 896 ||
        dimensions.width === 896)
        ? 15 + 55
        : 55,
  },

  imgNav: {
    width: 25,
    height: 25,
  },
  circleMenu: {
    width: 5,
    height: 5,
    borderRadius: 100 / 2,
    backgroundColor: '#F0532D',
    marginTop: 2,
  },
});