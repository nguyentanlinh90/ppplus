import merge from 'lodash.merge';
import * as types from '../../../api/types';

const initialState = {
    msg_code: '',
    revenue:[],
    setting:[]
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
        case types.FETCH_REVENUE_SUCCESS:
            return {
                ...state,
                revenue: action.data
            };
        case types.FETCH_SETTING_SUCCESS:
            return {
                ...state,
                setting: action.data
            };
        default:
            return state;
    }
}
