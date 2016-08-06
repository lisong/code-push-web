import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';

class Login extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    account: PropTypes.string,
    password: PropTypes.string,
    accountInputChange: PropTypes.func,
    passwordInputChange: PropTypes.func,
    submit: PropTypes.func,
  };
  static defaultProps = {
    isFetching: false,
    account: '',
    accountInputChange: (account)=>{},
    password: '',
    passwordInputChange: (password)=>{},
    submit: (account, password)=>{},
  };
  constructor() {
    super();
    this.setInputAccount = this.setInputAccount.bind(this);
    this.setInputPassword = this.setInputPassword.bind(this);
    this.submit = this.submit.bind(this);
  }
  submit() {
    if (this.props.isFetching) {
      return;
    }
    this.props.submit();
  }
  setInputAccount(event) {
    this.props.accountInputChange(event.target.value);
  }
  setInputPassword(event) {
    this.props.passwordInputChange(event.target.value);
  }
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>登录</h1>
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="usernameOrEmail">
              请输入用户名/邮箱地址:
            </label>
            <input
              className={s.input}
              onChange={this.setInputAccount}
              id="usernameOrEmail"
              type="text"
              value={this.props.account}
              autoFocus
            />
          </div>
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="password">
              请输入登录密码:
            </label>
            <input
              className={s.input}
              onChange={this.setInputPassword}
              id="password"
              type="password"
              value={this.props.password}
            />
          </div>
          <div className={s.formGroup}>
            <button
              className={s.button}
              style={this.props.isFetching ? { backgroundColor:'grey' } : null }
              onClick={this.submit}
              >
              登录
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(Login);
