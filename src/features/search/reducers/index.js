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
    case types.SEARCH_JOBS_SUCCESS:
    case types.SEARCH_JOBS_DETAIL_SUCCESS:
      return {
        ...state,
        data: action.data,
      };

    default:
      return state;
  }
}
