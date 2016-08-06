import * as types from './actionTypes';
import restApi from '../network/RestApi';
import _ from 'lodash';

function requestAuth() {
  return {
    type: types.REQUEST_AUTH,
  }
}

function receiveAuth(data) {
  return {
    type: types.RECEIVE_AUTH,
    payload: data,
  }
}

export function fetchAuth(isLogin = false) {
  return (dispatch) => {
    dispatch(requestAuth());
    let auth = sessionStorage.getItem('auth');
    if (!_.isEmpty(auth)) {
      dispatch(receiveAuth(auth))
    } else {
      dispatch(receiveAuth(null))
      if (isLogin) {
        dispatch(showLogin());
      }
    }
  };
}

export function saveAuth(auth) {
  return {
    type: types.SAVE_AUTH,
    payload: auth,
  }
}

export function deleteAuth() {
  return {
    type: types.DELETE_AUTH,
  }
}
