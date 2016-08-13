import React, {PropTypes, Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as usersActions from '../actions/usersActions';
import * as authActions from '../actions/authActions';
import * as routesActions from '../actions/routesActions';
import ChangePassword from '../components/ChangePassword';
import HeaderContainer from './HeaderContainer';
import Footer from '../components/Footer';

class ChangePasswordContainer extends Component {
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
    const {password, actions} = this.props;
    let oldPassword = _.get(password, 'oldPassword');
    let newPassword = _.get(password, 'newPassword');
    return (
      <div>
        <HeaderContainer/>
        <ChangePassword
          isFetching={_.get(password, 'isFetching')}
          oldPassword={oldPassword}
          oldPasswordInputChange={actions.passwordChangeOldInput}
          newPassword={newPassword}
          newPasswordInputChange={actions.passwordChangeNewInput}
          newPasswordConfirm={_.get(password, 'newPasswordConfirm')}
          newPasswordConfirmInputChange={actions.passwordChangeNewConfirmInput}
          submit={()=>actions.modifyPassword(oldPassword, newPassword)}
          error={_.get(password, 'error')}
        />
        <Footer/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {password: _.get(state, 'password')};
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(Object.assign({}, usersActions, authActions, routesActions), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordContainer)
