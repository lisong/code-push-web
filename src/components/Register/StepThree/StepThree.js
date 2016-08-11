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
    this.state = {field1: false, field2: false}
    this.setInputPassword = this.setInputPassword.bind(this);
    this.setInputPasswordConfirm = this.setInputPasswordConfirm.bind(this);
  }

  setInputPassword(event) {
    this.setState({field1: true});
    this.props.passwordInputChange(event.target.value);
  }

  setInputPasswordConfirm(event) {
    this.setState({field2: true});
    this.props.passwordConfirmInputChange(event.target.value);
  }

  render() {
    let self = this;
    let passwordTips = '';
    let passwordConfirmTips = '';
    if (this.state.field1 && this.props.password.length < 6) {
      passwordTips = '密码长度至少为6位'
    }
    if (this.state.field2 && !_.eq(this.props.passwordConfirm, this.props.password) ) {
      passwordConfirmTips = '确认密码和密码不一致'
    }
    let isValidate = false;
    if (this.props.password.length>=6
      && _.eq(this.props.passwordConfirm, this.props.password)) {
      isValidate = true;
    }
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
              onBlur={()=>this.setState({field1: true})}
              id="password"
              type="password"
              value={this.props.password}
              placeholder="请输入密码"
              autoFocus
            />
          </div>
          <div className={s.errorTip}>{passwordTips}</div>
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="passwordConfirm">
              确认密码:
            </label>
            <input
              className={s.input}
              onChange={this.setInputPasswordConfirm}
              onBlur={()=>this.setState({field2: true})}
              id="passwordConfirm"
              type="password"
              value={this.props.passwordConfirm}
              placeholder="请再次输入密码"
            />
          </div>
          <div className={s.errorTip}>{passwordConfirmTips}</div>
          <br/>
          <div className={s.errorTip2}>{_.get(this.props, 'error.message')}</div>
          <div className={s.formGroup}>
            <Button
              style={this.props.isFetching || !isValidate ? { backgroundColor:'grey' } : null }
              value="注册"
              onClick={()=>{
                if (self.props.isFetching || !isValidate) {
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
