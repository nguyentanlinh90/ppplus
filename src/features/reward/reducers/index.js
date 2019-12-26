import merge from 'lodash.merge';
import * as types from '../../../api/types';

const initialState = {
    brands: []
};

export default function entities(state = initialState, action) {
    if (action.entities) {
        return merge({}, state, action.entities);
    }
    switch (action.type) {
        case types.FETCH_BRAND_SUCCESS:
            return {
                ...state,
                brands: action.data
            };
        default:
            return state;
    }
}
