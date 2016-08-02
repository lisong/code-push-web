import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as usersActions from '../actions/usersActions';
import Login from '../components/Login';

class LoginContainer extends Component {

  render() {
    const {login, auth, actions } = this.props;
    return (
      <Login
        {...login}
        login={actions.fetchLogin}
        setInputText={actions.loginInput}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {'login': _.get(state, 'login', {}), 'auth': _.get(state, 'auth', {})};
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(Object.assign({}, usersActions), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)
