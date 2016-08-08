import {
  REQUEST_AUTH,
  RECEIVE_AUTH,
  SAVE_AUTH,
  DELETE_AUTH,
  REQUEST_ACCESS_KEYS,
  RECEIVE_ACCESS_KEYS,
  REQUEST_REMOVE_ACCESS_KEY,
  RECEIVE_REMOVE_ACCESS_KEY,
  REQUEST_PATCH_ACCESS_KEY,
  RECEIVE_PATCH_ACCESS_KEY,
  REQUEST_CREATE_ACCESS_KEY,
  RECEIVE_CREATE_ACCESS_KEY,
  OPEN_POP_SHOW_KEY,
  CLOSE_POP_SHOW_KEY,
} from '../actions/actionTypes';
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

export function accessKeys(state = {}, action) {
  switch (action.type) {
    case REQUEST_ACCESS_KEYS:
      return Object.assign({}, state, {isFetching: true});

    case RECEIVE_ACCESS_KEYS:
      return Object.assign({}, state, {
        isFetching: false,
        rs: _.get(action, 'payload.accessKeys')
      });

    case REQUEST_REMOVE_ACCESS_KEY:
      return Object.assign({}, state, {isRemoving: true});

    case RECEIVE_REMOVE_ACCESS_KEY:
      var friendlyName = _.get(action, 'payload.friendlyName');
      var data = Object.assign({}, state);
      _.remove(data.rs, function(row) {
        return _.get(row, 'friendlyName') == friendlyName;
      });
      _.set(data, 'isRemoving', false);
      return data;
    case REQUEST_PATCH_ACCESS_KEY:
      return state;

    case RECEIVE_PATCH_ACCESS_KEY:
      var friendlyName = _.get(action, 'payload.friendlyName');
      var data = Object.assign({}, state);
      var index = _.findIndex(data.rs, function(row) {
        return _.get(row, 'friendlyName') == friendlyName;
      });
      if (_.get(action, 'payload.accessKey')) {
        _.set(data, `rs.${index}`, _.get(action, 'payload.accessKey'));
      }
      return data;

    case REQUEST_CREATE_ACCESS_KEY:
      return Object.assign({}, state, {isCreating: true});

    case RECEIVE_CREATE_ACCESS_KEY:
      var data = Object.assign({}, state);
      if (_.get(action, 'payload.accessKey')) {
        data.rs.unshift(_.get(action, 'payload.accessKey'));
      }
      _.set(data, 'isCreating', false);
      return data;

    case OPEN_POP_SHOW_KEY:
      var isOpen = false;
      var token = '';
      if (_.get(action, 'payload')) {
        isOpen = true;
        token = _.get(action, 'payload');
      }
      return Object.assign({}, state, {showKey:{isOpen, token}});

    case CLOSE_POP_SHOW_KEY:
      return Object.assign({}, state, {showKey:{isOpen:false, token: ''}});
      
    default:
      return state
  }
}
