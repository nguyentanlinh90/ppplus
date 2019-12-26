import * as types from '../../../api/types';
import {fetchDataSuccess, storeData, getUrl, getApiPath} from "../../../api/helpers";
import {callPostApi, callGetApi} from '../../../api/api';
import {SCREEN_LOGIN} from "../../../api/screen";
import {AsyncStorage} from 'react-native';
import {getRevenue} from '../../home/actions/index';

export const doLogin = (phone, password) => async (dispatch) => {
    // const path =  getApiPath('1.0.0', 'login');
    // const params = {phone: phone, password: password, token:''};
    // const {json} = await callPostApi(getUrl(path), params);

    // if(typeof (json) !== 'undefined'){
    //     if(json.success){
    //         if(json.data.user){
    //             storeData('user', JSON.stringify(json.data.user));
    //             await dispatch(getRevenue(json.data.user));
    //             await dispatch(fetchDataSuccess(types.FETCH_USER_SUCCESS, json.data.user));
    //         }
    //         await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'login_success'));
    //     }else{
    //         await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'login_error'));
    //     }
    // }else{
    //     await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'login_error'));
    // }

    await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'login_success'));
}

export const doCreateAccount = (phone, code) => async (dispatch) => {
    await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'create_account_success'));
}

export const doSetPassword = (password) => async (dispatch) => {
    await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'set_password_success'));
}

export const doInputOTP = (otpCode) => async (dispatch) => {
    await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'input_otp_success'));
}

export const doInputPhoneNumber = (phoneNumber) => async (dispatch) => {
    await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'input_phone_number_success'));
}

export const fetchUser = (user) => async (dispatch) => {
    storeData('user', JSON.stringify(user));
    await dispatch(fetchDataSuccess(types.FETCH_USER_SUCCESS, user));
}

export const doLogout =(navigation)=>async(dispatch) =>{
    AsyncStorage.removeItem("user");
    AsyncStorage.removeItem("voucher");
    navigation.navigate(SCREEN_LOGIN)
}

export const fetchVoucher =(user)=> async(dispatch) =>{
    const path =  getApiPath('1.0.0', 'voucher');
    const params = {user_id: user.id, phone: user.phone, token: user.token};

    const {json} = await callPostApi(getUrl(path), params);

    if(typeof (json) !== 'undefined'){
        if(json.success){
            if(json.data){
                storeData('voucher', JSON.stringify(json.data));
                await dispatch(fetchDataSuccess(types.FETCH_VOUCHER_SUCCESS, json.data));
            }
            await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'fetch_voucher_success'));
        }else{
            await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'fetch_voucher_fail'));
        }
    }else{
        await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'fetch_voucher_fail'));
    }
}

export const exchangeVoucher =(user, phone, branch, type, amount, token)=> async(dispatch)=> {
    const path =  getApiPath('1.0.0', 'exchangeVoucher');
    const params = {user_id: user.id, phone: phone, total: amount, branch: branch, type: type, token: token};
    const {json} = await callPostApi(getUrl(path), params);

    if(typeof (json) !== 'undefined'){
        if(json.success){
            if(type == 'voucher'){
                await dispatch(fetchDataSuccess(types.FETCH_VOUCHER_SUCCESS, json.data));
                await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'fetch_exchange_voucher_success'));
            }else{
                await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'topup_success'));
            }
            await dispatch(getRevenue(user));
        }else{
            if(type == 'voucher'){
                await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'fetch_exchange_voucher_fail'));
            }else{
                await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'topup_fail'));
            }
        }
    }else{
        if(type == 'voucher'){
            await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'fetch_exchange_voucher_fail'));
        }else{
            await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'topup_fail'));
        }
    }
}

export const checkExchange =(user)=> async(dispatch)=> {
    const path =  getApiPath('1.0.0', 'checkExchange');
    const params = {user_id: user.id, phone: user.phone,  token: user.token};
    const {json} = await callPostApi(getUrl(path), params);

    if(typeof (json) !== 'undefined'){
        if(json.success){
            await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'check_exchange_success'));
        }else{
            await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'check_exchange_fail'));
        }
    }else{
        await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'check_exchange_fail'));
    }
}

export const changePassword =(currentPassword, newPassword, user)=>async(dispatch)=>{
    const path =  getApiPath('1.0.0', 'changePassword');
    const params = {password: currentPassword, new_password: newPassword, phone: user.phone, token: user.token};

    const {json} = await callPostApi(getUrl(path), params);

    if(typeof (json) !== 'undefined'){
        if(json.success) {
            await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'change_pass_success'));
        }else{
            await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, json.res_code));
        }
    }else{
        await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'change_pass_error'));
    }
}

export const updateAvatar =(user, image, fileName)=>async(dispatch)=>{
    const path =  getApiPath('1.0.0', 'updateAvatar');
    const params = {user_id: user.id, path: image, token: user.token, file_name: fileName};

    const {json} = await callPostApi(getUrl(path), params);

    if(typeof (json) !== 'undefined'){
        if(json.success) {
            storeData('user', JSON.stringify(json.data));
            await dispatch(fetchDataSuccess(types.FETCH_USER_SUCCESS, json.data));
            await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'fetch_user_success'));
        }
    }else{
        await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'fetch_user_fail'));
    }
}

export const fetchUserInfo =(user)=> async(dispatch)=>{
    const path =  getApiPath('1.0.0', 'userInfo');
    const params = {user_id: user.id, token: user.token};

    const {json} = await callPostApi(getUrl(path), params);

    if(typeof (json) !== 'undefined'){
        if(json.success){
            if(json.data){
                storeData('user', JSON.stringify(json.data));
                await dispatch(fetchDataSuccess(types.FETCH_USER_SUCCESS, json.data));
            }
        }
    }
}

export const addDevice =(device, deviceToken)=> async(dispatch)=>{
    const path =  getApiPath('1.0.0', 'addDevice');
    const params = {device_token: deviceToken, token: '', device: device};
    const {json} = await callPostApi(getUrl(path), params);

    console.log(json);
}

export const getSetting =()=> async(dispatch)=>{
    const path =  getApiPath('1.0.0', 'setting');
    const params = { token: '' };
    const {json} = await callGetApi(getUrl(path), params);

    console.log(json);

    if(typeof (json) !== 'undefined'){
        if(json.success) {
            await dispatch(fetchDataSuccess(types.FETCH_SETTING_SUCCESS, json.data));
        }
    }
}