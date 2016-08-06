import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as usersActions from '../actions/usersActions';
import * as routesActions from '../actions/routesActions';
import Home from '../components/Home';
import Header from '../components/Header';

class HomeContainer extends Component {
  componentWillReceiveProps(newProps) {
    if (_.get(this.props, 'auth.isAuth') != _.get(newProps, 'auth.isAuth')
    && _.get(newProps, 'auth.isAuth')) {
      this.props.actions.goBackHistory();
    }
  }

  render() {
    const {login, auth, actions } = this.props;
    return (
      <div>
        <Header/>
        <Home/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {'login': _.get(state, 'login', {}), 'auth': _.get(state, 'auth', {})};
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(Object.assign({}, usersActions, routesActions), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
