import {SET_BACK_HISTORY, GO_BACK_HISTORY} from '../actions/actionTypes';
import _ from 'lodash';
import history from '../core/history';

export function routes(state = {}, action) {
  switch (action.type) {
    case GO_BACK_HISTORY:
      var historyUri = _.get(state, 'history', '/');
      history.replace(historyUri);
      return Object.assign({}, state, {history: '/'})

    case SET_BACK_HISTORY:
      return Object.assign({}, state, {history: _.get(action, 'payload')});

    default:
      return state
  }
}
