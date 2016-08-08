import { combineReducers } from 'redux';
import {users, login} from './users';
import {auth, accessKeys} from './auth';
import {routes} from './routes';
import {products} from './products';

const appReducer = combineReducers({
  users,
  login,
  auth,
  accessKeys,
  routes,
  products,
});

const rootReducer = (state, action) => {
  return appReducer(state, action)
};

export default rootReducer
