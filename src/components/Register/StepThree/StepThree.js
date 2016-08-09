import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StepThree.css';
import Button from '../../Button';

class StepThree extends Component {
  static propTypes = {
    isChecking: PropTypes.bool,
    password: PropTypes.string,
    passwordConfirm: PropTypes.string,
  }

  static defaultProps = {
    isChecking: false,
    password: '',
    passwordConfirm: '',
  }

  constructor() {
    super();
    this.setInputEmail = this.setInputEmail.bind(this);
  }

  setInputEmail() {

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
              onChange={this.setInputEmail}
              id="password"
              type="text"
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
              onChange={this.setInputEmail}
              id="passwordConfirm"
              type="text"
              value={this.props.passwordConfirm}
              placeholder="请再次输入密码"
              autoFocus
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
                console.log('111');
              }}/>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(StepThree);
