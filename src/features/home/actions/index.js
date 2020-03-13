import * as types from '../../../api/types';
import {fetchDataSuccess, getApiPath} from '../../../api/helpers';
import {callGetApi} from '../../../api/api';
import {V_1_0_0} from '../../../utils/constants';

export const getJobs = (token, params ) => async dispatch => {
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

export const getJobDetail = (token, id) => async dispatch => {
  const path = getApiPath(V_1_0_0, 'get_job_detail') + id;
  const {json} = await callGetApi(path, token);
  if (
    typeof json !== types.UNDEFINED &&
    json.result_code == types.RESULT_CODE_SUCCESS
  ) {
    await dispatch(fetchDataSuccess(types.GET_JOBS_DETAIL_SUCCESS, json.data));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.GET_JOBS_DETAIL_SUCCESS),
    );
  } else {
    await dispatch(fetchDataSuccess(types.MESSAGE_HEADER, json.message));

    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.GET_JOBS_DETAIL_FAIL),
    );
  }
};
