import { combineReducers } from 'redux';
import register from '../features/user/reducers/index';
import home from '../features/home/reducers/index';

const rootReducer = combineReducers({
    register,
    home
})
export default rootReducer;