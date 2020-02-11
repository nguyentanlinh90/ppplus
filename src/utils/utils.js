import {Alert} from 'react-native';
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
