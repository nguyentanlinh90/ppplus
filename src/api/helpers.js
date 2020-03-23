import * as apiVersion from './version';
import {API_HOSTNAME} from './constants';
import * as types from './types';

export const changeMsgCode = code => async dispatch => {
  await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, code));
};

export const fetchDataSuccess = (type, data) => ({type: type, data});

export const getApiPath = (version, apiName) => {
  return API_HOSTNAME + apiVersion.version[version][apiName].path;
};

