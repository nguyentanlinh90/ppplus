import {combineReducers} from 'redux';
import user from '../features/user/reducers/index';
import main from '../features/main/reducers/index';
import search from '../features/search/reducers/index';
import job_detail from '../features/jobDetail/reducers/index';

const rootReducer = combineReducers({
  user,
  main,
  search,
  job_detail,
});
export default rootReducer;
