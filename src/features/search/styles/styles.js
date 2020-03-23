import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export default StyleSheet.create({
  boxSearch: {
    flexDirection: 'row',
    flex: 1,
    height: 40,
    backgroundColor: '#d8d8d8',
    marginStart: 16,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  viewFilter: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxImgHeader: {
    height: Platform.OS === 'ios' ? getStatusBarHeight() + 70 : 70,
    width: '100%',
    justifyContent: 'center',
  },
  viewSearch: {
    height: 45,
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
  },
  viewButtonBack: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewInput: {
    flex: 1,
    backgroundColor: '#fff',
    marginEnd: 10,
    borderRadius: 8,
    justifyContent: 'center',
    paddingStart: 10,
    paddingEnd: 10,
  },
  viewButtonFilter: {
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginEnd: 15,
  },
});
