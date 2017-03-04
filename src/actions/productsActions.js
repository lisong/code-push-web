import _ from 'lodash';

import * as types from './actionTypes';
import restApi from '../network/RestApi';
import {checkResponseAuth} from './authActions';

export function requestProducts() {
  return {
    type: types.REQUEST_PRODUCTS,
  }
}

export function receiveProducts(data) {
  return {
    type: types.RECEIVE_PRODUCTS,
    payload: data
  }
}

export function getProducts() {
  return (dispatch) => {
    dispatch(requestProducts());
    return restApi.getProducts()
    .then(data => {
      checkResponseAuth(dispatch, data);
      dispatch(receiveProducts(data));
    });
  };
}

export function showPopAddApp() {
  return {type: types.SHOW_POP_ADD_APP};
}

export function closePopAddApp() {
  return {type: types.CLOSE_POP_ADD_APP};
}

export function popAddAppInput(params) {
  return {
    type: types.POP_ADD_APP_INPUT,
    payload : params
  }
}

export function requestAddProducts() {
  return {
    type: types.REQUEST_ADD_PRODUCTS,
  }
}

export function receiveAddProducts(data) {
  return {
    type: types.RECEIVE_ADD_PRODUCTS,
    payload: data
  }
}

export function addProducts(appName) {
  return (dispatch) => {
    dispatch(requestAddProducts());
    return restApi.addProducts(appName)
    .then(data => {
      checkResponseAuth(dispatch, data);
      dispatch(receiveAddProducts(data));
      dispatch(getProducts());
    });
  };
}
