import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import MsgStack from '../components/MsgStack';
import * as msgStackActions from '../actions/msgStackActions';

class MsgStackContainer extends Component {
  render() {
    const {msgStack, actions } = this.props;
    return (
      <div style={{position: 'fixed', top:80, right:20, minWidth:100,maxWidth:300 }}>
        <MsgStack
        items={_.get(msgStack, 'rs', [])}
        close={(id)=>{actions.closeMsg(id)}}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {'msgStack': _.get(state, 'msgStack', {})};
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(Object.assign({}, msgStackActions), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MsgStackContainer)
