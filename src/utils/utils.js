export const dispatchScreen = (props, screen, params?) => {
  props.navigation.dispatch({
    key: screen,
    type: 'ReplaceCurrentScreen',
    routeName: screen,
    params: params,
  });
};
