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
  CLOSE_POP_SHOW_KEY,
  OPEN_POP_SHOW_KEY,
} from './actionTypes';
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

export function requestAccessKeys() {
  return {
    type: REQUEST_ACCESS_KEYS,
  }
}

export function receiveAccessKeys(data) {
  return {
    type: RECEIVE_ACCESS_KEYS,
    payload: data
  }
}

export function fetchAccessKeys() {
  return (dispatch) => {
    dispatch(requestAccessKeys());
    return restApi.getAccessKeys()
    .then(data => {
      dispatch(receiveAccessKeys(data));
    });
  };
}

export function requestRemoveAccessKey() {
  return {
    type: REQUEST_REMOVE_ACCESS_KEY,
  }
}

export function receiveRemoveAccessKey(data) {
  return {
    type: RECEIVE_REMOVE_ACCESS_KEY,
    payload: data
  }
}

export function reomveAccessKey(name) {
  return (dispatch) => {
    dispatch(requestRemoveAccessKey());
    return restApi.removeAccessKey(name)
    .then(data => {
      dispatch(receiveRemoveAccessKey(data));
    });
  };
}

export function requestPatchAccessKey() {
  return {
    type: REQUEST_PATCH_ACCESS_KEY,
  }
}

export function receivePatchAccessKey(name, data) {
  return {
    type: RECEIVE_PATCH_ACCESS_KEY,
    payload: {friendlyName:name, ...data}
  }
}

export function patchAccessKey(name, friendlyName=null, ttl=0) {
  return (dispatch) => {
    dispatch(requestPatchAccessKey());
    return restApi.patchAccessKey(name, friendlyName, ttl)
    .then(data => {
      dispatch(receivePatchAccessKey(name, data));
    }).catch(function(e){
      console.log(e);
    });
  };
}

export function requestCreateAccessKey() {
  return {
    type: REQUEST_CREATE_ACCESS_KEY,
  }
}

export function receiveCreateAccessKey(data) {
  return {
    type: RECEIVE_CREATE_ACCESS_KEY,
    payload: data
  }
}

export function createAccessKey() {
  return (dispatch) => {
    dispatch(requestCreateAccessKey());
    return restApi.createAccessKey()
    .then(data => {
      dispatch(openPopShowKey(_.get(data, 'accessKey.name')));
      dispatch(receiveCreateAccessKey(data));
    });
  };
}

export function openPopShowKey(key) {
  return {
    type: OPEN_POP_SHOW_KEY,
    payload: key
  }
}

export function closePopShowKey() {
  return {
    type: CLOSE_POP_SHOW_KEY,
  }
}
