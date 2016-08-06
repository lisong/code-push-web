import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Header from '../components/Header';

class HeaderContainer extends Component {
  render() {
    const {auth, actions } = this.props;
    return (
      <Header
        isAuth={_.get(auth, 'isAuth')}
        />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {'auth': _.get(state, 'auth', {})};
}

export default connect(
  mapStateToProps
)(HeaderContainer)
