import * as types from './actionTypes';
import restApi from '../network/RestApi';
import _ from 'lodash';

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

export function registerChangePasswordInput(password) {
  return {
    type: types.REGISTER_CHANGE_PASSWORD_INPUT,
    payload: password
  };
}

export function registerChangePasswordConfirmInput(passwordConfirm) {
  return {
    type: types.REGISTER_CHANGE_PASSWORD_CONFIRM_INPUT,
    payload: passwordConfirm
  };
}

function requestRegister() {
  return {
    type: types.REQUEST_REGISTER,
  }
}

function receiveRegister(data) {
  return {
    type: types.RECEIVE_REGISTER,
    payload: data,
  }
}

function receiveRegisterError(error) {
  return {
    type: types.RECEIVE_REGISTER_ERROR,
    payload: error,
  }
}

export function register(email, password, validateCode) {
  return (dispatch) => {
    dispatch(requestRegister());
    return restApi.register(email, password, validateCode)
    .then(data => {
      if (_.get(data, 'status') == "OK") {
        dispatch(receiveRegister(data));
      } else {
        var message = _.get(data, 'message');
        dispatch(receiveRegisterError({message: message}));
      }
    });
  };
}

export function registerClean() {
  return {type: types.RECEIVE_REGISTER_CLEAN}
}
