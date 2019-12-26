import * as types from '../../../api/types';
import {fetchDataSuccess, getApiPath, getUrl, storeData} from "../../../api/helpers";
import {callGetApi, callPostApi} from '../../../api/api';

export const changeMsgCode = (code) => async (dispatch) => {
    await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, code));
}

export const getRevenue =(user)=> async(dispatch)=>{
    const path =  getApiPath('1.0.0', 'revenue');
    const params = {user_id: user.id, token: user.token};
    const {json} = await callPostApi(getUrl(path), params);

    if(typeof (json) !== 'undefined'){
        if(json.success){
            await dispatch(fetchDataSuccess(types.FETCH_REVENUE_SUCCESS, json.data));
            await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'fetch_revenue_success'));
        }else{
            await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'fetch_revenue_fail'));
        }
    }else{
        await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'fetch_revenue_fail'));
    }
}