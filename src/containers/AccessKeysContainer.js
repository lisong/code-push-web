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
    const {accessKeys, actions } = this.props;
    return (
      <div>
        <HeaderContainer/>
        <AccessKeys
          isFetching={_.get(accessKeys, 'isFetching')}
          rs={_.get(accessKeys, 'rs')}
          removeKey={actions.reomveAccessKey}
          patchKey={actions.patchAccessKey}
          isCreating={_.get(accessKeys, 'isCreating')}
          createKey={actions.createAccessKey}
          isShowKey={_.get(accessKeys, 'showKey.isOpen')}
          close={actions.closePopShowKey}
          token={_.get(accessKeys, 'showKey.token')}
        />
        <Footer/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {'accessKeys': _.get(state, 'accessKeys', {})};
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
