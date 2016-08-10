import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as usersActions from '../actions/usersActions';
import * as routesActions from '../actions/routesActions';
import Register from '../components/Register';
import Header from '../components/Header';
import Footer from '../components/Footer';

class RegisterContainer extends Component {
  render() {
    const {register, actions } = this.props;
    let email = _.get(register, 'email');
    let validateCode = _.get(register, 'validateCode');
    return (
      <div>
        <Header noNav={true}/>
        <Register
          step={_.get(register, 'step', 1)}
          //----
          email={email}
          emailInputChange={actions.registerChangeEmailInput}
          isSubmitStepOne={_.get(register, 'isCheckingEmail')}
          submitStepOne={()=>actions.registerCheckEmail(email)}
          //----
          error={_.get(register, 'error')}
          isSending={_.get(register, 'isSending')}
          lastSendTime={_.get(register, 'lastSendTime', 0)}
          sendValidateCode={()=>actions.registerSendValidateCode(email)}
          validateCode={validateCode}
          validateCodeInputChange={actions.registerChangeValidateCodeInput}
          isSubmitStepTwo={_.get(register, 'isSubmitStepTwo')}
          submitStepTwo={()=>actions.registerCheckCodeExists(email, validateCode)}
          //---
        />
        <Footer/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {'register': _.get(state, 'register', {})};
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(Object.assign({}, usersActions, routesActions), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainer)
