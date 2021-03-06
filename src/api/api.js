import camelize from 'camelize';
import axios from 'axios';

export const callGetApi = (url, token) =>
  axios
    .get(url, {
      // params: data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      responseType: 'json',
      timeout: 600000,
    })
    .then(
      response =>
        response.status == 200
          ? response.data
          : Promise.reject(response.statusText),
      error => Promise.reject(error),
    )
    .then(
      json => ({
        json: json,
      }),
      error => ({
        error,
      }),
    )
    .catch(error => alert('fetch error:', error));

export const callPostApi = (url, data, token) =>
  axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      responseType: 'json',
      timeout: 600000,
    })
    .then(
      response =>
        response.status == 200
          ? response.data
          : Promise.reject(response.statusText),
      error => Promise.reject(error),
    )
    .then(
      json => ({
        json: json,
      }),
      error => ({
        error,
      }),
    )
    .catch(error => alert('Response error:', error));

export const callPutApi = (url, data, token) =>
  axios
    .put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      responseType: 'json',
      timeout: 600000,
    })
    .then(
      response =>
        response.status == 200
          ? response.data
          : Promise.reject(response.statusText),
      error => Promise.reject(error),
    )
    .then(
      json => ({
        json: json,
      }),
      error => ({
        error,
      }),
    )
    .catch(error => alert('Response error:', error));
//using debug call api
export const fetchApiPost = (url, data) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: data.token,
    },
    body: JSON.stringify(data),
  })
    .then(response => console.log(response))
    .then(responseData => {
      console.log(
        'POST Response',
        'Response Body -> ' + JSON.stringify(responseData),
      );
    })
    .catch(error => {
      console.error(error);
    })
    .done();
};
