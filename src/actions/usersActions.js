import * as types from './actionTypes';
import restApi from '../network/RestApi';
import {saveAuth, deleteAuth} from './authActions';
import _ from 'lodash';

export function logout() {
  return (dispatch) => {
    dispatch(deleteAuth());
    return dispatch({type: types.USER_LOGOUT});
  }
}

export function loginChangeAccountInput(account) {
  return {
    type: types.LOGIN_CHANGE_ACCOUNT_INPUT,
    payload: account
  };
}

export function loginChangePasswordInput(password) {
  return {
    type: types.LOGIN_CHANGE_PASSWORD_INPUT,
    payload: password
  };
}

function requestLogin() {
  return {
    type: types.REQUEST_LOGIN,
  }
}

function receiveLogin(data) {
  return {
    type: types.RECEIVE_LOGIN,
    payload: data,
  }
}

function receiveLoginError(error) {
  return {
    type: types.RECEIVE_LOGIN_ERROR,
    payload: error,
  }
}

export function fetchLogin(account, password) {
  return (dispatch) => {
    dispatch(requestLogin());
    return restApi.login(account, password)
    .then(data => {
      var auth = _.get(data, 'results.tokens');
      if (!_.isEmpty(auth)) {
        dispatch(saveAuth(auth));
        dispatch(receiveLogin(data));
      } else {
        dispatch(receiveLoginError({errorMessage:_.get(data, 'errorMessage')}));
      }
    });
  };
}
