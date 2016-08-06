import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.css';
import Header from '../Header';
import Footer from '../Footer';
import { Provider } from 'react-redux';
import _ from 'lodash';
import restApi from '../../network/RestApi';
import {fetchAuth} from '../../actions/authActions';

class App extends Component {

  static propTypes = {
    context: PropTypes.shape({
      store: PropTypes.object.isRequired,
      insertCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func,
    }).isRequired,
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setMeta: PropTypes.func.isRequired,
  };

  getChildContext() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
      setTitle: context.setTitle || emptyFunction,
      setMeta: context.setMeta || emptyFunction,
    };
  }

  componentDidMount() {
    var uuid = require('uuid');
    let aQQ_guid = localStorage.getItem('aQQ_guid');
    if (_.isEmpty(aQQ_guid) ||  aQQ_guid.length < 10) {
      aQQ_guid = uuid.v1();
      localStorage.setItem('aQQ_guid', aQQ_guid)
    }
    let sessid = sessionStorage.getItem('sessid');
    if (_.isEmpty(sessid) ||  sessid.length < 10) {
      sessid = uuid.v1();
      sessionStorage.setItem('sessid', sessid)
    }
    restApi.setUUID(sessid, aQQ_guid);
    this.props.context.store.dispatch(fetchAuth());
  }

  componentWillMount() {
    const { insertCss } = this.props.context;
    this.removeCss = insertCss(s);
  }

  componentWillUnmount() {
    this.removeCss();
  }

  render() {
    if (this.props.error) {
      return this.props.children;
    }

    const store = this.props.context.store;
    return (
      <Provider store={store}>
        <div>
          {this.props.children}
        </div>
      </Provider>
    );
  }

}

export default App;
