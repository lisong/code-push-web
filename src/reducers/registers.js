import * as types from '../actions/actionTypes';
import _ from 'lodash';
import moment from 'moment';

export function register(state = {}, action) {
  switch (action.type) {
    case types.REGISTER_CHANGE_EMAIL_INPUT:
      return Object.assign({}, state, {email: _.get(action, 'payload'), error:null});

    case types.REQUEST_REGISTER_CHECK_EMAIL:
      return Object.assign({}, state, {isCheckingEmail: true});

    case types.RECEIVE_REGISTER_CHECK_EMAIL:
      return Object.assign({}, state, {isCheckingEmail: false, step: 2, error:null});

    case types.RECEIVE_REGISTER_CHECK_EMAIL_ERROR:
      return Object.assign({}, state, {isCheckingEmail: false, error: action.payload});

    case types.REGISTER_CHANGE_VALIDATE_CODE_INPUT:
      return Object.assign({}, state, {validateCode: _.get(action, 'payload'), error:null});

    case types.REQUEST_REGISTER_SEND_VALIDATE_CODE:
      return Object.assign({}, state, {isSending: true});

    case types.RECEIVE_REGISTER_SEND_VALIDATE_CODE:
      var lastSendTime = parseInt(moment().format('X'));
      return Object.assign({}, state, {
        isSending: false,
        lastSendTime: lastSendTime,
        validateCode:'',
        error: null
      });

    case types.RECEIVE_REGISTER_SEND_VALIDATE_CODE_ERROR:
      return Object.assign({}, state, {isSending: false, error: _.get(action, 'payload')});

    case types.REQUEST_REGISTER_CHECK_CODE_EXISTS:
      return Object.assign({}, state, {isSubmitStepTwo: true, error: null});

    case types.RECEIVE_REGISTER_CHECK_CODE_EXISTS:
      return Object.assign({}, state, {isSubmitStepTwo: false, step: 3, error:null});

    case types.RECEIVE_REGISTER_CHECK_CODE_EXISTS_ERROR:
      return Object.assign({}, state, {isSubmitStepTwo: false, error: _.get(action, 'payload')});

    case types.REGISTER_CHANGE_PASSWORD_INPUT:
      return Object.assign({}, state, {password: _.get(action, 'payload'), error:null});

    case types.REGISTER_CHANGE_PASSWORD_CONFIRM_INPUT:
      return Object.assign({}, state, {passwordConfirm: _.get(action, 'payload'), error:null});

    case types.REQUEST_REGISTER:
      return Object.assign({}, state, {isSubmitStepThree: true, error: null});

    case types.RECEIVE_REGISTER:
      return Object.assign({}, state, {
        isSubmitStepThree: false,
        step: 4,
        password: '',
        passwordConfirm: '',
        error: null
      });

    case types.RECEIVE_REGISTER_ERROR:
      return Object.assign({}, state, {isSubmitStepThree: false, error: _.get(action, 'payload')});

    case types.RECEIVE_REGISTER_CLEAN:
      return {};

    default:
      return state;
  }
}
