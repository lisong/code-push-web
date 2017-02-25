import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as usersActions from '../actions/usersActions';
import * as routesActions from '../actions/routesActions';
import Login from '../components/Login';
import Header from '../components/Header';
import Footer from '../components/Footer';

class LoginContainer extends Component {
  componentWillReceiveProps(newProps) {
    if (_.get(this.props, 'auth.isAuth') != _.get(newProps, 'auth.isAuth')
    && _.get(newProps, 'auth.isAuth')) {
      this.props.actions.goBackHistory();
    }
  }

  componentDidMount() {
    if (_.get(this.props, 'auth.isAuth')) {
      this.props.actions.goBackHistory();
    }
  }

  render() {
    const {login, actions } = this.props;
    return (
      <div>
        <Header/>
        <Login
          isFetching={_.get(login, 'isFetching')}
          account={_.get(login, 'account')}
          password={_.get(login, 'password')}
          accountInputChange={actions.loginChangeAccountInput}
          passwordInputChange={actions.loginChangePasswordInput}
          submit={()=>actions.fetchLogin(
            _.get(login, 'account'),
            _.get(login, 'password')
          )}
          error={_.get(login, 'error')}
        />
        <Footer/>
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
)(LoginContainer)
