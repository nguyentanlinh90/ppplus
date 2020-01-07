import merge from 'lodash.merge';
import * as types from '../../../api/types';

const initialState = {
    user: {},
};

export default function entities(state = initialState, action) {
    if (action.entities) {
        return merge({}, state, action.entities);
    }
    switch (action.type) {
        case types.FETCH_USER_SUCCESS:
            return {
                ...state,
                user: action.data
            };

        default:
            return state;
    }
}
