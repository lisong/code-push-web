import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as usersActions from '../actions/usersActions';
import * as routesActions from '../actions/routesActions';
import Register from '../components/Register';

class RegisterContainer extends Component {
  render() {
    const {login, actions } = this.props;
    return (
      <Register/>
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
)(RegisterContainer)
