import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StepOne.css';
import Button from '../../Button';
import validator from 'validator';

class StepOne extends Component {
  static propTypes = {
    isChecking: PropTypes.bool,
    email: PropTypes.string,
    emailInputChange: PropTypes.func,
    submit: PropTypes.func,
    error: PropTypes.object,
  }

  static defaultProps = {
    isChecking: false,
    email: '',
    emailInputChange:(email)=>{},
    submit: ()=>{},
    error: {},
  }

  constructor() {
    super();
    this.setInputEmail = this.setInputEmail.bind(this);
  }

  setInputEmail(event) {
    this.props.emailInputChange(event.target.value);
  }

  render() {
    let self = this;
    var emailIsValidate = validator.isEmail(this.props.email);
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="email">
              邮箱地址:
            </label>
            <input
              className={s.input}
              onChange={this.setInputEmail}
              id="email"
              type="text"
              value={this.props.email}
              placeholder="请输入邮箱地址"
              autoComplete="off"
              autoFocus
            />
          </div>
          <div className={s.errorTip}>{_.get(this.props, 'error.message')}</div>
          <div className={s.formGroup}>
            <Button
              style={this.props.isChecking || !emailIsValidate ? { backgroundColor:'grey' } : null }
              value="下一步"
              onClick={()=>{
                if (self.props.isChecking || !emailIsValidate) {
                  return;
                }
                self.props.submit();
              }}/>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(StepOne);
