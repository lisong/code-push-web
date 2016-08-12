import * as types from '../actions/actionTypes';
import _ from 'lodash';
import moment from 'moment';

export function users(state = {}, action) {
  switch (action.type) {

    default:
      return state
  }
}

export function login(state = {}, action) {
  switch (action.type) {
    case types.LOGIN_CHANGE_ACCOUNT_INPUT:
      return Object.assign({}, state, {account: _.get(action, 'payload')});

    case types.LOGIN_CHANGE_PASSWORD_INPUT:
      return Object.assign({}, state, {password: _.get(action, 'payload')});

    case types.REQUEST_LOGIN:
      return Object.assign({}, state, {isFetching: true});

    case types.RECEIVE_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        password: '',
        error: null,
      });
    case types.RECEIVE_LOGIN_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: {..._.get(action, 'payload')}
      });
    default:
      return state
  }
}

export function password(state = {}, action) {
  switch (action.type) {
    case types.PASSWORD_CHANGE_OLD_INPUT:
      return Object.assign({}, state, {oldPassword:  _.get(action, 'payload')});

    case types.PASSWORD_CHANGE_NEW_INPUT:
      return Object.assign({}, state, {newPassword:  _.get(action, 'payload')});

    case types.PASSWORD_CHANGE_NEW_CONFIRM_INPUT:
      return Object.assign({}, state, {newPasswordConfirm:  _.get(action, 'payload')});

    default:
      return state
  }
}
