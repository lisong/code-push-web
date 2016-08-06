import {REQUEST_AUTH, RECEIVE_AUTH, SAVE_AUTH, DELETE_AUTH } from '../actions/actionTypes';
import _ from 'lodash';
import moment from 'moment';
import restApi from '../network/RestApi';

export function auth(state = {}, action) {
  switch (action.type) {
    case REQUEST_AUTH:
      return Object.assign({}, state, {isFetching: true});

    case RECEIVE_AUTH:
      var isAuth = false;
      var auth = _.get(action, 'payload');
      if (!_.isEmpty(auth)) {
        isAuth = true;
        restApi.setAuthToken(['auth', auth]);
      }
      return Object.assign({}, state, {
        token: auth,
        isFetching: false,
        isAuth: isAuth
      });

    case SAVE_AUTH:
      var auth = _.get(action, 'payload');
      restApi.setAuthToken(['auth', auth])
      sessionStorage.setItem('auth', auth);
      return Object.assign({}, state, {token: auth, isAuth:true});

    case DELETE_AUTH:
      restApi.deleteAuthToken();
      sessionStorage.removeItem('auth');
      return Object.assign({}, state, {token: null, isAuth:false});

    default:
      return state
  }
}
