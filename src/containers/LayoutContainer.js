import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import MsgStackContainer from './MsgStackContainer';

class LayoutContainer extends Component {
  render() {
    const {auth, actions } = this.props;
    return (
      <Layout>
        <Header
          isAuth={_.get(auth, 'isAuth')}
          />
        {this.props.children}
        <Footer/>
        <MsgStackContainer/>
      </Layout>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {'auth': _.get(state, 'auth', {})};
}

export default connect(
  mapStateToProps
)(LayoutContainer)
