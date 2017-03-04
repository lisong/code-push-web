import _ from 'lodash';

import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  SHOW_POP_ADD_APP,
  CLOSE_POP_ADD_APP,
  POP_ADD_APP_INPUT,
  REQUEST_ADD_PRODUCTS,
  RECEIVE_ADD_PRODUCTS,
} from '../actions/actionTypes';

export function products(state = {}, action) {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return Object.assign({}, state, {isFetching: true});

    case RECEIVE_PRODUCTS:

      return Object.assign({}, state, {
        isFetching: false,
        rs: _.get(action, 'payload.apps')
      });

    default :
      return state;
  }
}

export function addProducts(state = {}, action) {
  let payload = action.payload;
  switch (action.type) {
    case SHOW_POP_ADD_APP:
      return {showModal: true};

    case CLOSE_POP_ADD_APP:
      return Object.assign({}, state, {showModal: false});

    case POP_ADD_APP_INPUT:
      var appName = _.get(payload, 'appName');
      var appType = _.get(payload, 'appType');
      if (appName !== undefined) {
        const REGEX = /^\w+$/;
        if (REGEX.test(appName)) {
          _.set(payload, 'isShowNameError', false);
        } else {
          _.set(payload, 'isShowNameError', true);
        }
      }
      if (appType !== undefined) {
        if (_.indexOf([1, 2], parseInt(appType)) !== -1 ) {
          _.set(payload, 'isShowAppTypeError', false);
        } else {
          _.set(payload, 'isShowAppTypeError', true);
        }
      }
      return Object.assign({}, state, payload);

    case REQUEST_ADD_PRODUCTS:
      return Object.assign({}, state, {isOnSubmiting: true});

    case RECEIVE_ADD_PRODUCTS:
      if (_.get(payload, 'status') == 'OK') {
        return {isOnSubmiting: false};
      } else {
        return Object.assign({}, state, {isOnSubmiting: false, errorTip: _.get(payload, 'errorMessage')});
      }

    default :
      return state;
  }
}
