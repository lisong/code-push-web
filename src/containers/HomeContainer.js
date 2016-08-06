import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as usersActions from '../actions/usersActions';
import * as routesActions from '../actions/routesActions';
import Home from '../components/Home';
import Header from '../components/Header';

class HomeContainer extends Component {
  render() {
    const {html, actions } = this.props;
    return (
      <div>
        <Header/>
        <Home html={html}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {};
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
