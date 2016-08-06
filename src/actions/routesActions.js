import {SET_BACK_HISTORY, GO_BACK_HISTORY, SHOW_HOME, SHOW_LOGIN} from './actionTypes';

export function setBackHistory(history="/") {
  return {
    type: SET_BACK_HISTORY,
    payload: history
  };
}

export function goBackHistory() {
  return {type: GO_BACK_HISTORY};
}

export function showHome() {
  return {type: SHOW_HOME};
}

export function showLogin() {
  return {type: SHOW_LOGIN};
}
