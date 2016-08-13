import * as types from './actionTypes';
import restApi from '../network/RestApi';
import {saveAuth, deleteAuth} from './authActions';
import {showLogin} from './routesActions';
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

export function passwordChangeOldInput(oldPassword) {
  return {
    type: types.PASSWORD_CHANGE_OLD_INPUT,
    payload: oldPassword
  }
}

export function passwordChangeNewInput(newPassword) {
  return {
    type: types.PASSWORD_CHANGE_NEW_INPUT,
    payload: newPassword
  }
}

export function passwordChangeNewConfirmInput(newPasswordConfirm) {
  return {
    type: types.PASSWORD_CHANGE_NEW_CONFIRM_INPUT,
    payload: newPasswordConfirm
  }
}

function requestModifyPassword() {
  return {
    type: types.REQUEST_MODIFY_PASSWORD,
  }
}

function receiveModifyPassword(data) {
  return {
    type: types.RECEIVE_MODIFY_PASSWORD,
    payload: data,
  }
}

function receiveModifyPasswordError(error) {
  return {
    type: types.RECEIVE_MODIFY_PASSWORD_ERROR,
    payload: error,
  }
}

export function modifyPassword(oldPassword, newPassword) {
  return (dispatch) => {
    dispatch(requestModifyPassword());
    return restApi.password(oldPassword, newPassword)
    .then(data => {
      if (_.get(data, 'status') == "OK") {
        dispatch(deleteAuth());
        dispatch(receiveModifyPassword(data));
        dispatch(showLogin());
      } else {
        dispatch(receiveModifyPasswordError({message: _.get(data, 'message')}));
      }
    });
  };
}
