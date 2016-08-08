import _ from 'lodash';

import * as types from './actionTypes';
import restApi from '../network/RestApi';

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
      dispatch(receiveProducts(data));
    });
  };
}
