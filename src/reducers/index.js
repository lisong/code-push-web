import { combineReducers } from 'redux';
import {USER_LOGOUT} from '../actions/actionTypes';
import _ from 'lodash';
import {users, login, password} from './users';
import {register} from './registers';
import {auth, accessKeys} from './auth';
import {routes} from './routes';
import {products, addProducts} from './products';
import {msgStack} from './msgStack';

const appReducer = combineReducers({
  users,
  password,
  login,
  register,
  auth,
  accessKeys,
  routes,
  products,
  addProducts,
  msgStack,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    let data = Object.assign({}, state);
    _.set(data, 'auth', {});
    _.set(data, 'users', {});
    _.set(data, 'password', {});
    _.set(data, 'products', {});
    _.set(data, 'accessKeys', {});
    return appReducer(data, action)
  }
  return appReducer(state, action)
};

export default rootReducer
