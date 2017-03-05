import {
  MSG_STACK_SHOW_MSG,
  MSG_STACK_CLOSE_MSG,
} from './actionTypes';
import _ from 'lodash';

export function addShowMsg(text, type="info", showTime=10) {
  return {
    type: MSG_STACK_SHOW_MSG,
    payload: {text,type,showTime},
  }
}

export function closeMsg(id) {
  return {
    type: MSG_STACK_CLOSE_MSG,
    payload: id,
  }
}
