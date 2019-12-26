import { combineReducers } from 'redux';
import home from '../features/home/reducers/index';
import splash from '../features/splash/reducers/index';
import user from '../features/user/reducers/index';
import reward from '../features/reward/reducers/index';

const rootReducer = combineReducers({
    home,
    splash,
    user,
    reward
})
export default rootReducer;