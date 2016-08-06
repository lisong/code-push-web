import * as types from './actionTypes';

export function setBackHistory(history="/") {
  return {
    type: types.SET_BACK_HISTORY,
    payload: history
  }
}

export function goBackHistory() {
  return {type: types.GO_BACK_HISTORY}
}
