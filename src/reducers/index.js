import {combineReducers} from 'redux';
import user from '../features/user/reducers/index';
import home from '../features/home/reducers/index';
import search from '../features/search/reducers/index';

const rootReducer = combineReducers({
  user,
  home,
  search,
});
export default rootReducer;
