import {REQUEST_AUTH, RECEIVE_AUTH, SAVE_AUTH, DELETE_AUTH} from './actionTypes';
import {showLogin} from './routesActions.js'
import restApi from '../network/RestApi';
import _ from 'lodash';

function requestAuth() {
  return {
    type: REQUEST_AUTH,
  }
}

function receiveAuth(data) {
  return {
    type: RECEIVE_AUTH,
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
    type: SAVE_AUTH,
    payload: auth,
  }
}

export function deleteAuth() {
  return {
    type: DELETE_AUTH,
  }
}
