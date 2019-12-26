import * as types from '../../../api/types';
import {fetchDataSuccess, storeData, getUrl, getApiPath} from "../../../api/helpers";
import {callPostApi, callGetApi} from '../../../api/api';
import {SCREEN_LOGIN, HOME_SCREEN} from "../../../api/screen";


export const getBrands = (user) => async (dispatch) => {
    const path =  getApiPath('1.0.0', 'brand');
    const params = {token: user.token};
    const {json} = await callGetApi(getUrl(path), params);

    if(typeof (json) !== 'undefined'){
        if(json.success){
            await dispatch(fetchDataSuccess(types.FETCH_BRAND_SUCCESS, json.data));
            await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'fetch_brand_success'));
        }else{
            await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'fetch_brand_error'));
        }
    }else{
        await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'fetch_brand_error'));
    }
}