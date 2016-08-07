import React, {PropTypes, Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as usersActions from '../actions/usersActions';
import * as authActions from '../actions/authActions';
import * as routesActions from '../actions/routesActions';
import AccessKeys from '../components/AccessKeys';
import HeaderContainer from './HeaderContainer';
import Footer from '../components/Footer';

class AccessKeysContainer extends Component {
  componentDidMount() {
    if (!_.get(this.props, 'auth.isAuth')) {
      let path = location.pathname;
      if (!_.isEmpty(location.search)) {
        path += `?${location.search}`
      }
      this.props.actions.setBackHistory(path);
      this.props.actions.fetchAuth(true);
    }
  }
  render() {
    const {html, actions } = this.props;
    return (
      <div>
        <HeaderContainer/>
        <AccessKeys/>
        <Footer/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {'auth': _.get(state, 'auth', {})};
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(Object.assign({}, usersActions, authActions, routesActions), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccessKeysContainer)
