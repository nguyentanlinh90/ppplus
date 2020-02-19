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
  const {json} = await callPostApi(getUrl(path), params);
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

  const {json} = await callPostApi(getUrl(path), params);
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

export const doResendOTP = (phone, otp_code) => async dispatch => {
  const path = 'user/resend/otp';
  const params = {
    phone: phone,
  };

  const {json} = await callPostApi(getUrl(path), params);
  if (
    typeof json !== types.UNDEFINED &&
    json.result_code == types.RESULT_CODE_SUCCESS
  ) {
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.RESEND_OTP_SUCCESS),
    );
  } else {
    await dispatch(fetchDataSuccess(types.MESSAGE_HEADER, json.message));
    await dispatch(
      fetchDataSuccess(types.CHANGE_MSG_CODE, types.RESEND_OTP_FAIL),
    );
  }
};

export const doLogin = (phone, password) => async dispatch => {
  const path = 'user/login';
  const params = {
    phone: phone,
    password: password,
  };

  const {json} = await callPostApi(getUrl(path), params);
  console.log('linhnt json', json)
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

export const doSetPasswordAccount = params => async dispatch => {
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
