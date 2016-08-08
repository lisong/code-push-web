import _ from 'lodash';

import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS
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
