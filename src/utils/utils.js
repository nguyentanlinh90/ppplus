import {Alert, AsyncStorage} from 'react-native';
import {text_select} from '../utils/constants';
let isShowAlert = false;
export const dispatchScreen = (props, screen, params?) => {
  props.navigation.dispatch({
    key: screen,
    type: 'ReplaceCurrentScreen',
    routeName: screen,
    params: params,
  });
};

export const isEmpty = string => {
  return string == '';
};

export const isZero = string => {
  return string == 0;
};

export const convertPhone = text => {
  let newText = '';
  let numbers = '0123456789';

  for (let i = 0; i < text.length; i++) {
    if (numbers.indexOf(text[i]) > -1) {
      newText = newText + text[i];
    }
  }
  if (newText.length > 10) {
    newText = newText.substring(0, 10);
  }
  return newText;
};

export const showAlert = massage => {
  if (!isShowAlert) {
    isShowAlert = true;
    Alert.alert('Thông báo', massage, [{text: 'Đồng Ý', onPress: () => {}}], {
      cancelable: false,
    });
  } else {
    isShowAlert = false;
  }
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
    borderColor: isRed ? '#25A174' : '#d8d8d8',
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
    color: '#2B2B2B',
    paddingTop: 10,
    paddingBottom: 10,
  };
};

export const txtInputStyle = function(text) {
  return {
    flex: 1,
    height: 44,
    borderColor: text ? '#25A174' : '#D8D8D8',
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

export const checkIdInList = function(id, list) {
  for (var i = 0; i < list.length; i++) {
    return (id = list[i].id);
  }
};

export const arrayToString = function(array) {
  var text = '';
  for (let i = 0; i < array.length; i++) {
    if (text == '') {
      text = array[i] + '';
    } else {
      text = text + ',' + array[i];
    }
  }
  return text;
};

export const stringToArray = function(string) {
  return string.split(',');
};

export const getNamesFromIds = (ids, list) => {
  var names = '';
  for (var i = 0; i < ids.length; i++) {
    for (var j = 0; j < list.length; j++) {
      if (ids[i] == list[j].id) {
        if (names == '') {
          names = list[j].name;
        } else {
          names = names + '; ' + list[j].name;
        }
      }
    }
  }
  return names == '' ? text_select : names;
};

export const getDistrictsFromIds = (idProvince, ids, listDistrict) => {
  var names = '';
  for (var i = 0; i < ids.length; i++) {
    for (var j = 0; j < listDistrict[idProvince].length; j++) {
      if (ids[i] == listDistrict[idProvince][j].id) {
        if (names == '') {
          names = listDistrict[idProvince][j].name;
        } else {
          names = names + '; ' + listDistrict[idProvince][j].name;
        }
      }
    }
  }
  return names == '' ? 'Chọn Quận / Huyện' : names;
};

export const checkIdInIds = (id, ids) => {
  var exits = false;
  for (var i = 0; i < ids.length; i++) {
    if (id == ids[i]) {
      exits = true;
    }
  }
  return exits;
};

export const getNameFromId = (id, list) => {
  var name = text_select;
  for (var i = 0; i < list.length; i++) {
    if (id == list[i].id) {
      name = list[i].name;
      break;
    }
  }
  return name;
};

export const getNameDistrictFromId = (idProvince, idDistrict, listDistrict) => {
  var name = 'Chọn Quận / Huyện';

  for (var i = 0; i < listDistrict[idProvince].length; i++) {
    if (idDistrict == listDistrict[idProvince][i].id) {
      name = listDistrict[idProvince][i].name;
      break;
    }
  }

  return name;
};

export const getDistrictNameFromId = (id, list) => {
  var name = text_select;
  for (var i = 0; i < list.length; i++) {
    if (id == list[i].id) {
      name = list[i].prefix + ' ' + list[i].name;
      break;
    }
  }
  return name;
};

export const setGender = (employee_gender, gender_list) => {
  var text = '';
  for (var i = 0; i < employee_gender.length; i++) {
    if (isEmpty(text)) {
      text = gender_list[employee_gender[i]];
    } else {
      text = text + ' / ' + gender_list[employee_gender[i]];
    }
  }
  return text;
};

export const isEmptyObject = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const sortNumber = (a, b) => {
  return a - b;
};
