import merge from 'lodash.merge';
import * as types from '../../../api/types';

const initialState = {
    // user: [],
    // vouchers: []
};

export default function entities(state = initialState, action) {
    if (action.entities) {
        return merge({}, state, action.entities);
    }
    switch (action.type) {
        // case types.FETCH_USER_SUCCESS:
        //     return {
        //         ...state,
        //         user: action.data
        //     };
        // case types.FETCH_VOUCHER_SUCCESS:
        //     return {
        //         ...state,
        //         vouchers: action.data
        //     };
        default:
            return state;
    }
}
