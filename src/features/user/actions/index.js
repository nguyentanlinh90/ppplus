import { callGetApi, callPostApi, callPutApi } from '../../../api/api';
import { fetchDataSuccess, getApiPath } from '../../../api/helpers';
import * as types from '../../../api/types';
import { setStoreData } from '../../../utils/utils';
import { ACCESS_TOKEN, V_1_0_0 } from '../../../utils/constants';

export const doCreateAccount = (
  phone,
  reference_code,
  password,
  password_confirm,
) => async dispatch => {
  const path = getApiPath(V_1_0_0, 'register');

  const params = {
    phone: phone,
    reference_code: reference_code,
    password: password,
    password_confirm: password_confirm,
  };
  const { json } = await callPostApi(path, params, '');
  if (
    typeof json !== types.UNDEFINED &&
    json.result_code == types.RESULT_CODE_SUCCESS
  ) {
    await dispatch(fetchDataSuccess(types.REGISTER_USER_SUCCESS, json.data));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.REGISTER_USER_SUCCESS),
    );
  } else {
    await dispatch(fetchDataSuccess(types.MESSAGE_HEADER, json.message));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.REGISTER_USER_FAIL),
    );
  }
};

export const doProcessOTP = (phone, otp_code) => async dispatch => {
  const path = getApiPath(V_1_0_0, 'process_otp');
  const params = {
    phone: phone,
    otp_code: otp_code,
  };

  const { json } = await callPostApi(path, params, '');
  if (
    typeof json !== types.UNDEFINED &&
    json.result_code == types.RESULT_CODE_SUCCESS
  ) {
    await dispatch(fetchDataSuccess(types.PROCESS_OTP_SUCCESS, json.data));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.PROCESS_OTP_SUCCESS),
    );
  } else {
    await dispatch(fetchDataSuccess(types.MESSAGE_HEADER, json.message));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.PROCESS_OTP_FAIL),
    );
  }
};

export const doSendOTP = (phone, type) => async dispatch => {
  const path = getApiPath(V_1_0_0, 'send_otp');
  const params = {
    phone: phone,
    type: type,
  };

  const { json } = await callPostApi(path, params, '');
  if (
    typeof json !== types.UNDEFINED &&
    json.result_code == types.RESULT_CODE_SUCCESS
  ) {
    await dispatch(fetchDataSuccess(types.PROCESS_OTP_SUCCESS, json.data));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.SEND_OTP_SUCCESS),
    );
  } else {
    await dispatch(fetchDataSuccess(types.MESSAGE_HEADER, json.message));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.SEND_OTP_FAIL),
    );
  }
};

export const doLogin = (phone, password) => async dispatch => {
  const path = getApiPath(V_1_0_0, 'login');
  const params = {
    phone: phone,
    password: password,
  };
  const { json } = await callPostApi(path, params, '');
  if (
    typeof json !== types.UNDEFINED &&
    json.result_code == types.RESULT_CODE_SUCCESS
  ) {
    setStoreData(ACCESS_TOKEN, 'Bearer ' + json.access_token);
    console.log('linhnt login token ', 'Bearer ' + json.access_token);
    await dispatch(fetchDataSuccess(types.LOGIN_SUCCESS, json.data));
    await dispatch(fetchDataSuccess(types.MESSAGE_HEADER, json.access_token));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.LOGIN_SUCCESS),
    );
  } else {
    await dispatch(fetchDataSuccess(types.MESSAGE_HEADER, json.message));
    await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, types.LOGIN_FAIL));
  }
};

export const doLogout = token => async dispatch => {
  const path = getApiPath(V_1_0_0, 'logout');

  const { json } = await callPostApi(path, {}, token);
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

export const doUpdateUserInfo = (params, access_token) => async dispatch => {
  const path = getApiPath(V_1_0_0, 'user_info_update');
  const { json } = await callPostApi(path, params, access_token);
  if (
    typeof json !== types.UNDEFINED &&
    json.result_code == types.RESULT_CODE_SUCCESS
  ) {
    await dispatch(fetchDataSuccess(types.UPDATE_USER_INFO_SUCCESS, json.data));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.UPDATE_USER_INFO_SUCCESS),
    );
  } else {
    await dispatch(fetchDataSuccess(types.MESSAGE_HEADER, json.message));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.UPDATE_USER_INFO_FAIL),
    );
  }
};

export const getUserInfo = (type, token) => async dispatch => {
  const path = getApiPath(V_1_0_0, 'get_user_info') + type;

  const { json } = await callGetApi(path, token);
  if (
    typeof json !== types.UNDEFINED &&
    json.result_code == types.RESULT_CODE_SUCCESS
  ) {
    if (type == 'full_detail') {
      await dispatch(fetchDataSuccess(types.GET_USER_INFO_SUCCESS, json.data));
      await dispatch(
        fetchDataSuccess(types.CHANGE_MSG_CODE, types.GET_USER_INFO_SUCCESS),
      );
    } else {
      await dispatch(
        fetchDataSuccess(types.GET_USER_BASIC_INFO_SUCCESS, json.data),
      );
      await dispatch(
        fetchDataSuccess(
          types.CHANGE_MSG_CODE,
          types.GET_USER_BASIC_INFO_SUCCESS,
        ),
      );
    }
  } else {
    if (type == 'full_detail') {
      await dispatch(
        fetchDataSuccess(types.CHANGE_MSG_CODE, types.GET_USER_INFO_FAIL),
      );
    } else {
      await dispatch(
        fetchDataSuccess(types.CHANGE_MSG_CODE, types.GET_USER_BASIC_INFO_FAIL),
      );
    }
    // await dispatch(fetchDataSuccess(types.MESSAGE_HEADER, json.message));
  }
};
