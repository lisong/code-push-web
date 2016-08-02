import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState, helpersConfig) {
  const middleware = [thunk];

  let enhancer;
  enhancer = applyMiddleware(...middleware);
  const store = createStore(rootReducer, initialState, enhancer);
  return store;
}
