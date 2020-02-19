import merge from 'lodash.merge';
import * as types from '../../../api/types';

const initialState = {
    msg_code: '',
    jobs:[]
};

export default function entities(state = initialState, action) {
    if (action.entities) {
        return merge({}, state, action.entities);
    }
    switch (action.type) {
        case types.CHANGE_MSG_CODE:
            return {
                ...state,
                msg_code: action.data
            };
        case types.GET_JOBS_SUCCESS:
            return {
                ...state,
                jobs: action.data
            };
        
        default:
            return state;
    }
}
