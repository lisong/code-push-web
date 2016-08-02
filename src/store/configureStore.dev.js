import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createLogger from './logger';
import DevTools from '../components/DevTools';
import { persistState } from 'redux-devtools';

export default function configureStore(initialState, helpersConfig) {
  const middleware = [thunk];

  let enhancer;
  middleware.push(createLogger());
  enhancer = compose(
    applyMiddleware(...middleware),
    DevTools.instrument(),
    persistState(
      window.location.href.match(
        /[?&]debug_session=([^&#]+)\b/
      )
    ),
  );
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}
