import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';
import NavStep from './NavStep';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepDone from './StepDone';

class Register extends Component {
  static propTypes = {
    step: PropTypes.number,
    //-----
    email: PropTypes.string,
    emailInputChange: PropTypes.func,
    isSubmitStepOne: PropTypes.bool,
    submitStepOne: PropTypes.func,
    //-----
    validateCode: PropTypes.string,
    isSending: PropTypes.bool,
    lastSendTime: PropTypes.number,
    sendValidateCode: PropTypes.func,
    validateCodeInputChange: PropTypes.func,
    isSubmitStepTwo: PropTypes.bool,
    submitStepTwo: PropTypes.func,
    //-----
    isSubmitStepThree: PropTypes.bool,
    submitStepThree: PropTypes.func,
  };

  static defaultProps = {
    step: 1,
    email: '',
    emailInputChange: (email)=>{},
    isSubmitStepOne: false,
    submitStepOne: ()=>{},
    validateCode: '',
    isSending: false,
    lastSendTime: 0,
    sendValidateCode: ()=>{},
    validateCodeInputChange: (validateCode)=>{},
    isSubmitStepTwo: false,
    submitStepTwo: ()=>{},
    isSubmitStepThree: false,
    submitStepThree: ()=>{},
  };

  render() {
    var stepView = null;
    let step = this.props.step;
    if (step == 1) {
      stepView = (
        <StepOne
          isChecking={this.props.isSubmitStepOne}
          email={this.props.email}
          emailInputChange={this.props.emailInputChange}
          submit={this.props.submitStepOne}
          error={this.props.error}
        />
      );
    } else if (step == 2) {
      stepView = (
        <StepTwo
          isChecking={this.props.isSubmitStepTwo}
          validateCode={this.props.validateCode}
          validateCodeInputChange={this.props.validateCodeInputChange}
          isSending={this.props.isSending}
          lastSendTime={this.props.lastSendTime}
          sendValidateCode={this.props.sendValidateCode}
          submit={this.props.submitStepTwo}
          error={this.props.error}
        />
      );
    } else if (step == 3) {
      stepView = (
        <StepThree
          submit={this.props.submitStepThree}
        />
      );
    } else if (step == 4) {
      stepView = <StepDone/>;
    }
    return (
      <div className={s.root}>
        <div className={s.container}>
          <NavStep step={step}/>
          {stepView}
        </div>
      </div>
    );
  }
}
export default withStyles(s)(Register);
