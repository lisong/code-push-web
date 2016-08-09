import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StepTwo.css';
import Button from '../../Button';
import Countdown from '../../Countdown';

class StepTwo extends Component {
  static propTypes = {
    isChecking: PropTypes.bool,
    validateCode: PropTypes.string,
  }

  static defaultProps = {
    isChecking: false,
    validateCode: '',
  }

  constructor() {
    super();
    this.setInputValidateCode = this.setInputValidateCode.bind(this);
  }

  setInputValidateCode() {

  }

  render() {
    let self = this;
    let countDownView = (
      <Countdown
        leftTime={0}
        renderFunc={({second})=>{
          return <span className={s.countDown}>{second}</span>
        }}
        renderRetryFunc={(times)=>{
          let sendText = '发送邮件';
          if (times > 0) {
            sendText = '重新发送';
          }
          return <span className={s.sendBtn}>{sendText}</span>
        }}
      />
    )
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.warning}>
            请您登录邮箱，查看验证码
          </div>
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="validateCode">
              验证码:
            </label>
            <input
              className={s.input}
              onChange={this.setInputValidateCode}
              id="validateCode"
              type="text"
              value={this.props.validateCode}
              placeholder="请输入接收到的验证码"
              autoComplete="off"
              autoFocus
            />
            {countDownView}
          </div>
          <div className={s.formGroup}>
            <Button
              style={this.props.isChecking ? { backgroundColor:'grey' } : null }
              value="下一步"
              onClick={()=>{
                if (self.props.isChecking) {
                  return;
                }
              }}/>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(StepTwo);
