import {callGetApi, callPostApi, callPutApi} from '../../../api/api';
import {
  fetchDataSuccess,
  getApiPath,
  getUrl,
} from '../../../api/helpers';
import * as types from '../../../api/types';

export const doCreateAccount = (phone, referral_code) => async dispatch => {
  const path = 'create_account';
  const params = {
    phone: phone,
    referral_code: referral_code,
    password: '',
    token: '',
  };
  const {json} = await callPostApi(getUrl(path), params);

  await dispatch(
    fetchDataSuccess(types.CHANGE_MSG_CODE, 'create_account_success'),
  );

  if (typeof json !== 'undefined') {
    await dispatch(fetchDataSuccess(types.FETCH_USER_SUCCESS, json.data));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, 'create_account_success'),
    );
    
  } else {
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, 'create_account_error'),
    );
  }
};

export const doLogin = (phone, password) => async dispatch => {
  const path = 'login';
  const params = {
    phone: phone,
    password: password,
    token: '',
  };

  await dispatch(
    fetchDataSuccess(types.CHANGE_MSG_CODE, 'login_success'),
  );

};


export const doSetPasswordAccount = (params) => async dispatch => {
  const path = 'update_account';
 
  const {json} = await callPutApi(getUrl(path), params);

  await dispatch(
    fetchDataSuccess(types.CHANGE_MSG_CODE, 'set_password_account_success'),
  );

  if (typeof json !== 'undefined') {
    await dispatch(fetchDataSuccess(types.FETCH_USER_SUCCESS, json.data));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, 'set_password_account_success'),
    );
  } else {
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, 'set_password_account_error'),
    );
  }
};
