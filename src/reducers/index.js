import { combineReducers } from 'redux';
import user from '../features/user/reducers/index';
import home from '../features/home/reducers/index';

const rootReducer = combineReducers({
    user,
    home
})
export default rootReducer;