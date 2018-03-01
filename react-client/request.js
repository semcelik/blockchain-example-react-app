/* eslint-disable */
import 'whatwg-fetch';
import apisauce from 'apisauce';
import { call, put } from 'redux-saga/effects';
//todo: refactor et
const create = () => {
  const api = apisauce.create({
                                baseURL: 'http://localhost:8080/',
                                'X-Device-Type': 'NORMAL',
                                'Cache-Control': 'no-cache',
                              });

  const get = (url, parameters = {}) => executeRequest(() => api.get(url, parameters));
  const post = (url, object = {}) => executeRequest(() => api.post(url, object));
  const put = (url, object = {}) => executeRequest(() => api.put(url, object));
  const remove = (url, parameters = {}) => executeRequest(() => api.delete(url, parameters));

  const executeRequest = (req) => new Promise((resolve) => {
    resolve(req().then((res) => {
      return { ...res };
    }));
  });

  return {
    get, post, put, remove,
  };
};

const apiCall = create();

export function* doGetRequest(url, params) {
  return yield call(doRequest, apiCall.get, url, params);
}

export function* doPostRequest(url, params) {
  return yield call(doRequest, apiCall.post, url, params);
}

export function* doPutRequest(url, params) {
  return yield call(doRequest, apiCall.put, url, params);
}

export function* doDeleteRequest(url, params) {
  return yield call(doRequest, apiCall.remove, url, params);
}

function* doRequest(method, url, params) {
  const res = yield call(method, url, params);
  return res;
}
