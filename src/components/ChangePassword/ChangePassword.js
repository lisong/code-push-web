
import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ChangePassword.css';
import _ from 'lodash';
import Link from '../Link';
import Button from '../Button';
import moment from 'moment';

class ChangePassword extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    oldPassword: PropTypes.string,
    oldPasswordInputChange: PropTypes.func,
    newPassword: PropTypes.string,
    newPasswordInputChange: PropTypes.func,
    newPasswordConfirm: PropTypes.string,
    newPasswordConfirmInputChange: PropTypes.func,
    submit: PropTypes.func,
    error: PropTypes.object,
  };

  static defaultProps = {
    isFetching: false,
    oldPassword: '',
    oldPasswordInputChange: (oldPassword)=>{},
    newPassword: '',
    newPasswordInputChange: (newPassword)=>{},
    newPasswordConfirm: '',
    newPasswordConfirmInputChange: (newPasswordConfirm)=>{},
    submit: ()=>{},
    error: {},
  };

  constructor(){
    super();
    this.state = {field1: false, field2: false, field3: false};
    this.setOldPassword = this.setOldPassword.bind(this);
    this.setNewPassword = this.setNewPassword.bind(this);
    this.setNewPasswordConfirm = this.setNewPasswordConfirm.bind(this);
  }

  setOldPassword(event) {
    this.props.oldPasswordInputChange(event.target.value);
  }

  setNewPassword(event) {
    this.props.newPasswordInputChange(event.target.value);
  }

  setNewPasswordConfirm(event) {
    this.props.newPasswordConfirmInputChange(event.target.value);
  }

  render() {
    let self = this;
    let isValidate = true;
    let oldPasswordTips = '';
    if (!this.props.oldPassword) {
      isValidate = false;
      oldPasswordTips = '请您输入旧密码';
    }
    let newPasswordTips = '';
    let newPasswordConfirmTips = '';
    if (this.props.newPassword.length < 6) {
      newPasswordTips = '请您输入6～22位字符或数字'
    }
    if (!_.eq(this.props.newPassword, this.props.newPasswordConfirm)) {
      isValidate = false;
      newPasswordConfirmTips = '两次输入的密码不一致'
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="oldPassword">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;旧密码:
            </label>
            <input
              className={s.input}
              onChange={this.setOldPassword}
              id="oldPassword"
              type="password"
              value={this.props.oldPassword}
              placeholder="请输入旧密码"
              autoFocus
              onBlur={()=>this.setState({field1: true})}
            />
          </div>
          {
            this.state.field1 ?
            <div className={s.errorTip}>{oldPasswordTips}</div>
            : null
          }
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="newPassword">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;新密码:
            </label>
            <input
              className={s.input}
              onChange={this.setNewPassword}
              id="newPassword"
              type="password"
              value={this.props.newPassword}
              placeholder="请您输入新的密码"
              onBlur={()=>this.setState({field2: true})}
            />
          </div>
          {
            this.state.field2 ?
            <div className={s.errorTip}>{newPasswordTips}</div>
            : null
          }
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="newPasswordConfirm">
              确认新密码:
            </label>
            <input
              className={s.input}
              onChange={this.setNewPasswordConfirm}
              id="newPasswordConfirm"
              type="password"
              value={this.props.newPasswordConfirm}
              placeholder="请您再次输入新的密码"
              onBlur={()=>this.setState({field3: true})}
            />
          </div>
          {
            this.state.field3 ?
            <div className={s.errorTip}>{newPasswordConfirmTips}</div>
            : null
          }
          <br/>
          <div className={s.errorTip}>{_.get(this.props, 'error.message')}</div>
          <div className={s.formGroup}>
            <Button
              style={
                this.props.isFetching || !isValidate ?
                { width:'71%', marginLeft: '27%', backgroundColor:'grey' }
                : { width:'71%', marginLeft: '27%' }
              }
              value="确认"
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
export default withStyles(s)(ChangePassword);
