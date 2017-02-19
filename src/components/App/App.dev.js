/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Children, PropTypes } from 'react';
import { Provider } from 'react-redux';
import _ from 'lodash';
import uuid from 'uuid';
import DevTools from '../DevTools';
import restApi from '../../network/RestApi';
import { fetchAuth } from '../../actions/authActions';

const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
  }).isRequired,
};

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */
class App extends React.PureComponent {

  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = ContextType;

  getChildContext() {
    return this.props.context;
  }

  componentDidMount() {
    let aQQGuid = localStorage.getItem('aQQ_guid');
    if (_.isEmpty(aQQGuid) || aQQGuid.length < 10) {
      aQQGuid = uuid.v1();
      localStorage.setItem('aQQ_guid', aQQGuid);
    }
    let sessid = sessionStorage.getItem('sessid');
    if (_.isEmpty(sessid) || sessid.length < 10) {
      sessid = uuid.v1();
      sessionStorage.setItem('sessid', sessid);
    }
    restApi.setUUID(sessid, aQQGuid);
    this.props.context.store.dispatch(fetchAuth());
  }

  render() {
    const store = this.props.context.store;
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    return (
      <Provider store={store}>
        <div>
          {Children.only(this.props.children)}
          <DevTools />
        </div>
      </Provider>
    );
  }

}

export default App;
