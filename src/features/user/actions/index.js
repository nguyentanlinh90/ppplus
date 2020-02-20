import {callGetApi, callPostApi, callPutApi} from '../../../api/api';
import {fetchDataSuccess, getApiPath, getUrl} from '../../../api/helpers';
import * as types from '../../../api/types';

export const doCreateAccount = (
  phone,
  reference_code,
  password,
  password_confirm,
) => async dispatch => {
  const path = 'user/register';
  const params = {
    phone: phone,
    reference_code: reference_code,
    password: password,
    password_confirm: password_confirm,
  };
  const {json} = await callPostApi(getUrl(path), params, '');
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
  const path = 'user/process/otp';
  const params = {
    phone: phone,
    otp_code: otp_code,
  };

  const {json} = await callPostApi(getUrl(path), params, '');
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
  const path = 'user/send/otp';
  const params = {
    phone: phone,
    type: type,
  };

  const {json} = await callPostApi(getUrl(path), params, '');
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
  const path = 'user/login';
  const params = {
    phone: phone,
    password: password,
  };

  const {json} = await callPostApi(getUrl(path), params, '');
  if (
    typeof json !== types.UNDEFINED &&
    json.result_code == types.RESULT_CODE_SUCCESS
  ) {
    await dispatch(fetchDataSuccess(types.LOGIN_SUCCESS, json.data));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.LOGIN_SUCCESS),
    );
  } else {
    await dispatch(fetchDataSuccess(types.MESSAGE_HEADER, json.message));
    await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, types.LOGIN_FAIL));
  }
};

export const doUpdateUserInfo = (params, access_token) => async dispatch => {
  const path = 'user/info';
  const {json} = await callPostApi(getUrl(path), params, access_token);
  console.log(
    'linhnt',
    json,
    typeof json !== types.UNDEFINED,
    json.result_code,
  );

  if (
    typeof json !== types.UNDEFINED &&
    json.result_code == types.RESULT_CODE_SUCCESS
  ) {
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
