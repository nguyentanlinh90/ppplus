import { combineReducers } from 'redux';
import home from '../features/home/reducers/index';
import splash from '../features/splash/reducers/index';
import user from '../features/user/reducers/index';

const rootReducer = combineReducers({
    home,
    splash,
    user,
})
export default rootReducer;