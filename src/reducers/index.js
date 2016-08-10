import { combineReducers } from 'redux';
import {USER_LOGOUT} from '../actions/actionTypes';
import _ from 'lodash';
import {users, login, register} from './users';
import {auth, accessKeys} from './auth';
import {routes} from './routes';
import {products} from './products';

const appReducer = combineReducers({
  users,
  login,
  register,
  auth,
  accessKeys,
  routes,
  products,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    let data = Object.assign({}, state);
    _.set(data, 'auth', {});
    _.set(data, 'users', {});
    _.set(data, 'products', {});
    _.set(data, 'accessKeys', {});
    return appReducer(data, action)
  }
  return appReducer(state, action)
};

export default rootReducer
