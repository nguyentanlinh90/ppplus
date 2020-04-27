import merge from 'lodash.merge';
import * as types from '../../../api/types';

const initialState = {
  msg_code: '',
  message: '',
  data: {},
};

export default function entities(state = initialState, action) {
  if (action.entities) {
    return merge({}, state, action.entities);
  }
  switch (action.type) {
    case types.CHANGE_MSG_CODE:
      return {
        ...state,
        msg_code: action.data,
      };
    case types.MESSAGE_HEADER:
      return {
        ...state,
        message: action.data,
      };
    case types.GET_TASKS_SUCCESS:
    case types.GET_JOBS_SUCCESS:
    case types.LOGOUT_SUCCESS:
    case types.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        data: action.data,
      };

    default:
      return state;
  }
}
