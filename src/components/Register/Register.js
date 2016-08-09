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
  render() {
    var stepView = <StepOne/>;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <NavStep step={1}/>
          {stepView}
        </div>
      </div>
    );
  }
}
export default withStyles(s)(Register);
