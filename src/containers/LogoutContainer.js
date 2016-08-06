import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as usersActions from '../actions/usersActions';
import * as routesActions from '../actions/routesActions';

class LogoutContainer extends Component {
  componentDidMount() {
    if (_.get(this.props, 'auth.isAuth')) {
      this.props.actions.logout();
    }
    this.props.actions.showHome();
  }
  render() {
    return null;
  }
}

function mapStateToProps(state, ownProps) {
  return {'auth': _.get(state, 'auth', {})};
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(Object.assign({}, usersActions, routesActions), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutContainer)
