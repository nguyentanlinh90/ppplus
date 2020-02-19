import * as types from '../../../api/types';
import {
  fetchDataSuccess,
  getApiPath,
  getUrl,
} from '../../../api/helpers';
import {callGetApi, callPostApi} from '../../../api/api';
export const changeMsgCode = code => async dispatch => {
  await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, code));
};

export const getJobs = () => async dispatch => {
  const path = 'jobs';
  const params = '';
  const {json} = await callGetApi(getUrl(path), params);
  const data = [
    {"id":1,"logoUrl":"http://via.placeholder.com/150x150","merchantName":"OPPO","rating":3.5,"trending":1,"jobTitle":"PB/PG ra mắt thương hiệu Oppo","ageMin":18,"ageMax":25,"gender":0,"location":"Quận 1, TP. Hồ Chí Minh","timeStart":"2020-01-01 00:00:00","timeEnd":"2020-01-31 00:00:00","amount":50,"jobDetails":[{"id":1,"job_id":1,"name_store":"CH1","address":"Ly chinh thang","weekDay":[1,3,5],"hourDay":[{"start_time":"7:00","end_time":"9:00"},{"start_time":"10:00","end_time":"12:00"}]},{"id":2,"job_id":1,"name_store":"Vincom","address":"Phan Van Tri, Go Vap","weekDay":[1,3,5],"hourDay":[{"start_time":"7:00","end_time":"9:00"},{"start_time":"10:00","end_time":"12:00"}]},{"id":3,"job_id":1,"name_store":"Sieu Thi Cho Lon","address":"An Duong Vuong, Quan 5","weekDay":[1,3,5],"hourDay":[{"start_time":"7:00","end_time":"9:00"},{"start_time":"10:00","end_time":"12:00"}]},{"id":10,"job_id":1,"name_store":"CH8","address":"An Duong Vuong, Quan 5","weekDay":[1,3,5],"hourDay":[{"start_time":"7:00","end_time":"9:00"},{"start_time":"10:00","end_time":"12:00"}]}]},
    {"id":2,"logoUrl":"http://via.placeholder.com/150x150","merchantName":"SAMSUNG","rating":4.5,"trending":2,"jobTitle":"PB/PG ra mắt thương hiệu Samsung","ageMin":20,"ageMax":40,"gender":1,"location":"Quận 3, TP. Hồ Chí Minh","timeStart":"2020-01-01 00:00:00","timeEnd":"2020-01-31 00:00:00","amount":100,"jobDetails":[{"id":4,"job_id":2,"name_store":"CH1","address":"Ly chinh thang","weekDay":[1,3,5],"hourDay":[{"start_time":"7:00","end_time":"9:00"},{"start_time":"10:00","end_time":"12:00"}]},{"id":5,"job_id":2,"name_store":"CH3","address":"Phan Van Tri, Go Vap","weekDay":[1,3,5],"hourDay":[{"start_time":"7:00","end_time":"9:00"},{"start_time":"10:00","end_time":"12:00"}]},{"id":6,"job_id":2,"name_store":"CH4","address":"An Duong Vuong, Quan 5","weekDay":[1,3,5],"hourDay":[{"start_time":"7:00","end_time":"9:00"},{"start_time":"10:00","end_time":"12:00"}]}]},
    {"id":3,"logoUrl":"http://via.placeholder.com/150x150","merchantName":"SAMSUNG","rating":4.5,"trending":2,"jobTitle":"PB/PG ra mắt thương hiệu Samsung","ageMin":20,"ageMax":40,"gender":1,"location":"Quận 3, TP. Hồ Chí Minh","timeStart":"2020-01-01 00:00:00","timeEnd":"2020-01-31 00:00:00","amount":100,"jobDetails":[{"id":7,"job_id":3,"name_store":"CH5","address":"Phan Van Tri, Go Vap","weekDay":[1,3,5],"hourDay":[{"start_time":"7:00","end_time":"9:00"},{"start_time":"10:00","end_time":"12:00"}]},{"id":8,"job_id":3,"name_store":"CH6","address":"An Duong Vuong, Quan 5","weekDay":[1,3,5],"hourDay":[{"start_time":"7:00","end_time":"9:00"},{"start_time":"10:00","end_time":"12:00"}]},{"id":9,"job_id":3,"name_store":"CH7","address":"Phan Van Tri, Go Vap","weekDay":[1,3,5],"hourDay":[{"start_time":"7:00","end_time":"9:00"},{"start_time":"10:00","end_time":"12:00"}]}]},
    {"id":4,"logoUrl":"http://via.placeholder.com/150x150","merchantName":"OPPO","rating":3.5,"trending":1,"jobTitle":"PB/PG ra mắt thương hiệu Oppo","ageMin":18,"ageMax":25,"gender":0,"location":"Quận 1, TP. Hồ Chí Minh","timeStart":"2020-01-01 00:00:00","timeEnd":"2020-01-31 00:00:00","amount":50,"jobDetails":[]},
    {"id":5,"logoUrl":"http://via.placeholder.com/150x150","merchantName":"SAMSUNG","rating":4.5,"trending":2,"jobTitle":"PB/PG ra mắt thương hiệu Samsung","ageMin":20,"ageMax":40,"gender":1,"location":"Quận 3, TP. Hồ Chí Minh","timeStart":"2020-01-01 00:00:00","timeEnd":"2020-01-31 00:00:00","amount":100,"jobDetails":[]},
    {"id":6,"logoUrl":"http://via.placeholder.com/150x150","merchantName":"SAMSUNG","rating":4.5,"trending":2,"jobTitle":"PB/PG ra mắt thương hiệu Samsung","ageMin":20,"ageMax":40,"gender":1,"location":"Quận 3, TP. Hồ Chí Minh","timeStart":"2020-01-01 00:00:00","timeEnd":"2020-01-31 00:00:00","amount":100,"jobDetails":[]},
    {"id":7,"logoUrl":"http://via.placeholder.com/150x150","merchantName":"OPPO","rating":3.5,"trending":1,"jobTitle":"PB/PG ra mắt thương hiệu Oppo","ageMin":18,"ageMax":25,"gender":0,"location":"Quận 1, TP. Hồ Chí Minh","timeStart":"2020-01-01 00:00:00","timeEnd":"2020-01-31 00:00:00","amount":50,"jobDetails":[]},
    {"id":8,"logoUrl":"http://via.placeholder.com/150x150","merchantName":"OPPO","rating":3.5,"trending":1,"jobTitle":"PB/PG ra mắt thương hiệu Oppo","ageMin":18,"ageMax":25,"gender":0,"location":"Quận 1, TP. Hồ Chí Minh","timeStart":"2020-01-01 00:00:00","timeEnd":"2020-01-31 00:00:00","amount":50,"jobDetails":[]}
  ];

  await dispatch(fetchDataSuccess(types.GET_JOBS_SUCCESS, data));
  await dispatch(
    fetchDataSuccess(types.CHANGE_MSG_CODE, types.GET_JOBS_SUCCESS),
  );
  // if (typeof json !== 'undefined') {
  //   await dispatch(fetchDataSuccess(types.FETCH_JOB_SUCCESS, data));
  //   await dispatch(
  //     fetchDataSuccess(types.CHANGE_MSG_CODE, 'fetch_job_success'),
  //   );
  // } else {
  //   await dispatch(fetchDataSuccess(types.CHANGE_MSG_CODE, 'fetch_job_error'));
  // }
};
