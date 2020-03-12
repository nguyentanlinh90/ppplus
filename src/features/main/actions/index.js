import * as types from '../../../api/types';
import {fetchDataSuccess, getApiPath} from '../../../api/helpers';
import {callPostApi} from '../../../api/api';
import {V_1_0_0} from '../../../utils/constants';

export const applyJob = (token, params) => async dispatch => {
  const path = getApiPath(V_1_0_0, 'apply_job');
  const {json} = await callPostApi(path, params, token);
  if (
    typeof json !== types.UNDEFINED &&
    json.result_code == types.RESULT_CODE_SUCCESS
  ) {
    await dispatch(fetchDataSuccess(types.APPLY_JOBS_SUCCESS, json.data));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.APPLY_JOBS_SUCCESS),
    );
  } else {
    await dispatch(fetchDataSuccess(types.MESSAGE_HEADER, json.message));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.APPLY_JOBS_FAIL),
    );
  }
};
