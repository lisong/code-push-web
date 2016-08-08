import _ from 'lodash';
import {
  SET_BACK_HISTORY,
  GO_BACK_HISTORY,
  SHOW_HOME,
  SHOW_LOGIN
} from '../actions/actionTypes';
import history from '../core/history';

export function routes(state = {}, action) {
  switch (action.type) {
    case GO_BACK_HISTORY:
      var historyUri = _.get(state, 'history', '/');
      history.replace(historyUri);
      return Object.assign({}, state, {history: '/'})

    case SET_BACK_HISTORY:
      return Object.assign({}, state, {history: _.get(action, 'payload')});

    case SHOW_HOME:
      history.replace('/');
      return state;

    case SHOW_LOGIN:
      history.replace('/login');
      return state;

    default:
      return state
  }
}
