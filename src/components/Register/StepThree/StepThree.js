import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StepThree.css';
import Button from '../../Button';

class StepThree extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    password: PropTypes.string,
    passwordInputChange: PropTypes.func,
    passwordConfirm: PropTypes.string,
    passwordConfirmInputChange: PropTypes.func,
    submit: PropTypes.func,
    error: PropTypes.object,
  }

  static defaultProps = {
    isFetching: false,
    password: '',
    passwordInputChange: (password)=>{},
    passwordConfirm: '',
    passwordConfirmInputChange: (passwordConfirm)=>{},
    submit: ()=>{},
    error: {},
  }

  constructor() {
    super();
    this.setInputPassword = this.setInputPassword.bind(this);
    this.setInputPasswordConfirm = this.setInputPasswordConfirm.bind(this);
  }

  setInputPassword(event) {
    this.props.passwordInputChange(event.target.value);
  }

  setInputPasswordConfirm(event) {
    this.props.passwordConfirmInputChange(event.target.value);
  }

  render() {
    let self = this;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="password">
              密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:
            </label>
            <input
              className={s.input}
              onChange={this.setInputPassword}
              id="password"
              type="password"
              value={this.props.password}
              placeholder="请输入密码"
              autoFocus
            />
          </div>
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="passwordConfirm">
              确认密码:
            </label>
            <input
              className={s.input}
              onChange={this.setInputPasswordConfirm}
              id="passwordConfirm"
              type="password"
              value={this.props.passwordConfirm}
              placeholder="请再次输入密码"
            />
          </div>
          <br/>
          <div className={s.formGroup}>
            <Button
              style={this.props.isChecking ? { backgroundColor:'grey' } : null }
              value="注册"
              onClick={()=>{
                if (self.props.isChecking) {
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
export default withStyles(s)(StepThree);
