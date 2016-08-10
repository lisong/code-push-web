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

export function registerChangeEmailInput(email) {
  return {
    type: types.REGISTER_CHANGE_EMAIL_INPUT,
    payload: email
  };
}

function requestRegisterCheckEmail() {
  return {
    type: types.REQUEST_REGISTER_CHECK_EMAIL,
  }
}

function receiveRegisterCheckEmail(data) {
  return {
    type: types.RECEIVE_REGISTER_CHECK_EMAIL,
    payload: data,
  }
}

function receiveRegisterCheckEmailError(error) {
  return {
    type: types.RECEIVE_REGISTER_CHECK_EMAIL_ERROR,
    payload: error,
  }
}

export function registerCheckEmail(email) {
  return (dispatch) => {
    dispatch(requestRegisterCheckEmail());
    return restApi.checkEmailExists(email)
    .then(data => {
      if (_.get(data,'status') == "OK" && _.get(data, 'exists') == false) {
        dispatch(receiveRegisterCheckEmail(data));
      } else {
        var message = `${email} 已经注册了，请更换其他邮箱注册`
        if (_.get(data,'status') != "OK") {
          message = _.get(data, 'message');
        }
        dispatch(receiveRegisterCheckEmailError({message: message}));
      }
    });
  };
}

export function registerChangeValidateCodeInput(validateCode) {
  return {
    type: types.REGISTER_CHANGE_VALIDATE_CODE_INPUT,
    payload: validateCode
  };
}

function requestRegisterSendValidateCode() {
  return {
    type: types.REQUEST_REGISTER_SEND_VALIDATE_CODE,
  }
}

function receiveRegisterSendValidateCode(data) {
  return {
    type: types.RECEIVE_REGISTER_SEND_VALIDATE_CODE,
    payload: data,
  }
}

function receiveRegisterSendValidateCodeError(error) {
  return {
    type: types.RECEIVE_REGISTER_SEND_VALIDATE_CODE_ERROR,
    payload: error,
  }
}

export function registerSendValidateCode(email) {
  return (dispatch) => {
    dispatch(requestRegisterSendValidateCode());
    return restApi.sendRegisterCode(email)
    .then(data => {
      if (_.get(data, 'status') == "OK") {
        dispatch(receiveRegisterSendValidateCode(data));
      } else {
        var message = _.get(data, 'message');
        dispatch(receiveRegisterSendValidateCodeError({message: message}));
      }
    });
  };
}

function requestRegisterCheckCodeExists() {
  return {
    type: types.REQUEST_REGISTER_CHECK_CODE_EXISTS,
  }
}

function receiveRegisterCheckCodeExists(data) {
  return {
    type: types.RECEIVE_REGISTER_CHECK_CODE_EXISTS,
    payload: data,
  }
}

function receiveRegisterCheckCodeExistsError(error) {
  return {
    type: types.RECEIVE_REGISTER_CHECK_CODE_EXISTS_ERROR,
    payload: error,
  }
}

export function registerCheckCodeExists(email, validateCode) {
  return (dispatch) => {
    dispatch(requestRegisterCheckCodeExists());
    return restApi.checkRegisterCodeExists(email, validateCode)
    .then(data => {
      if (_.get(data, 'status') == "OK") {
        dispatch(receiveRegisterCheckCodeExists(data));
      } else {
        var message = _.get(data, 'message');
        dispatch(receiveRegisterCheckCodeExistsError({message: message}));
      }
    });
  };
}
