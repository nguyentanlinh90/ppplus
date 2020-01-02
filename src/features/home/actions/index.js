import * as types from '../../../api/types';
import {
  fetchDataSuccess,
  getApiPath,
  getUrl,
  storeData,
} from '../../../api/helpers';
import {callGetApi, callPostApi} from '../../../api/api';

export const changeMsgCode = code => async dispatch => {
  await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, code));
};

export const getJobs = () => async dispatch => {
  const path = 'jobs';
  const params = '';
  const {json} = await callGetApi(getUrl(path), params);
  if (typeof json !== 'undefined') {
    await dispatch(fetchDataSuccess(types.FETCH_JOB_SUCCESS, json.data));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, 'fetch_job_success'),
    );
  } else {
    await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'fetch_job_error'));
  }
};
