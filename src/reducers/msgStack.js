import {
  MSG_STACK_SHOW_MSG,
  MSG_STACK_CLOSE_MSG,
} from '../actions/actionTypes';
import _ from 'lodash';
import restApi from '../network/RestApi';
import uuid from 'uuid';

export function msgStack(state = {rs:[]}, action) {
  let payload = action.payload;
  switch (action.type) {
    case MSG_STACK_SHOW_MSG:
      var id = uuid.v4();
      var data = Object.assign({}, state);
      var msg = {
        id,
        type: _.get(payload, 'type'),
        text: _.get(payload, 'text'),
        showTime: parseInt(_.get(payload, 'showTime')),
        time: parseInt((new Date()).getTime()/1000)
      };
      var rs = _.get(data, 'rs', []);
      rs.unshift(msg);
      _.set(data, 'rs', rs);
      return data;

    case MSG_STACK_CLOSE_MSG:
      var id = payload;
      var data = Object.assign({}, state);
      _.remove(_.get(data, 'rs', []), (item)=>{
        return _.get(item, 'id') === id;
      });
      return data;

    default:
      return state
  }
}
