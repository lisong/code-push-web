import React, {PropTypes, Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as usersActions from '../actions/usersActions';
import * as authActions from '../actions/authActions';
import * as routesActions from '../actions/routesActions';
import * as productsActions from '../actions/productsActions';
import PopAddApp from '../components/PopAddApp';

class PopAddAppContainer extends Component {
  static propTypes = {
    appName: PropTypes.string
  };

  static defaultProps = {
    appName: '',
  };

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
    const {addProducts, actions } = this.props;
    return (
      <PopAddApp
        {...addProducts}
        input={actions.popAddAppInput}
        close={actions.closePopAddApp}
        onSubmit={()=>{
          var appName = _.get(addProducts, 'appName');
          var appType = _.get(addProducts, 'appType');
          if (appType == 1) {
            appName = `${appName}-ios`;
          } else if (appType == 2) {
            appName = `${appName}-android`;
          }
          actions.addProducts(appName);
        }}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    'auth': _.get(state, 'auth', {}),
    'addProducts': _.get(state, 'addProducts', {})
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(Object.assign({}, usersActions, authActions, routesActions, productsActions), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopAddAppContainer)
