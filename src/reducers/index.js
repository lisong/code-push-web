import { combineReducers } from 'redux';
import {users, login} from './users';
import {auth} from './auth';
import {routes} from './routes';

const appReducer = combineReducers({
  users,
  login,
  auth,
  routes,
});

const rootReducer = (state, action) => {
  return appReducer(state, action)
};

export default rootReducer
