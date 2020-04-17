import * as types from '../../../api/types';
import {fetchDataSuccess, getApiPath} from '../../../api/helpers';
import {callGetApi, callPostApi} from '../../../api/api';
import {V_1_0_0} from '../../../utils/constants';

export const getJobs = (token, params) => async dispatch => {
  const path = getApiPath(V_1_0_0, 'get_jobs') + params;
  const {json} = await callGetApi(path, token);
  if (
    typeof json !== types.UNDEFINED &&
    json.result_code == types.RESULT_CODE_SUCCESS
  ) {
    await dispatch(fetchDataSuccess(types.GET_JOBS_SUCCESS, json.data));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.GET_JOBS_SUCCESS),
    );
  } else {
    await dispatch(fetchDataSuccess(types.MESSAGE_HEADER, json.message));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.GET_JOBS_FAIL),
    );
  }
};

export const getTasks = (token, page) => async dispatch => {
  const path = getApiPath(V_1_0_0, 'get_tasks') + page;
  const {json} = await callGetApi(path, token);
  if (
    typeof json !== types.UNDEFINED &&
    json.result_code == types.RESULT_CODE_SUCCESS
  ) {
    await dispatch(fetchDataSuccess(types.GET_TASKS_SUCCESS, json.data));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.GET_TASKS_SUCCESS),
    );
  } else {
    await dispatch(fetchDataSuccess(types.MESSAGE_HEADER, json.message));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.GET_TASKS_FAIL),
    );
  }
};

export const doLogout = token => async dispatch => {
  const path = getApiPath(V_1_0_0, 'logout');
  const {json} = await callPostApi(path, {}, token);
  if (
    typeof json !== types.UNDEFINED &&
    json.result_code == types.RESULT_CODE_SUCCESS
  ) {
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.LOGOUT_SUCCESS),
    );
  } else {
    await dispatch(fetchDataSuccess(types.MESSAGE_HEADER, json.message));
    await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, types.LOGOUT_FAIL));
  }
};
