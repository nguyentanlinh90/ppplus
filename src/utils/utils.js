import {Alert, AsyncStorage} from 'react-native';
import {text_select} from '../utils/constants';

export const dispatchScreen = (props, screen, params?) => {
  props.navigation.dispatch({
    key: screen,
    type: 'ReplaceCurrentScreen',
    routeName: screen,
    params: params,
  });
};

export const showAlert = massage => {
  Alert.alert(
    'Thông báo',
    massage,
    [{text: 'Đồng Ý', onPress: () => console.log('Ok Pressed')}],
    {cancelable: true},
  );
};

export const setStoreData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value.toString());
  } catch (error) {
    console.log(error.message);
  }
};

export const boxSelectStyle = function(isRed) {
  return {
    flex: 1,
    borderColor: isRed ? '#F0532D' : '#d8d8d8',
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 10,
    paddingEnd: 10,
  };
};

export const txtInBoxSelectStyle = function(text) {
  return {
    flex: 1,
    fontSize: 16,
    color: text == text_select ? '#D8D8D8' : '#2B2B2B',
    paddingTop: 10,
    paddingBottom: 10,
  };
};

export const txtInputStyle = function(text) {
  return {
    flex: 1,
    height: 44,
    borderColor: text ? '#F0532D' : '#D8D8D8',
    borderWidth: 1,
    borderRadius: 6,
    paddingStart: 10,
    paddingEnd: 10,
    color: '#2B2B2B',
    fontSize: 16,
  };
};

export const handleCheck = function(val, list) {
  return list.some(item => val === item);
};

export const arrayToString = function(array) {
  var text = '';
  for (let i = 0; i < array.length; i++) {
    if (text == '') {
      text = array[i];
    } else {
      text = text + ',' + array[i];
    }
  }
  return text;
};
