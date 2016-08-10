import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StepTwo.css';
import Button from '../../Button';
import Countdown from '../../Countdown';

class StepTwo extends Component {
  static propTypes = {
    isChecking: PropTypes.bool,
    validateCode: PropTypes.string,
    validateCodeInputChange: PropTypes.func,
    isSending: PropTypes.bool,
    lastSendTime: PropTypes.number,
    sendValidateCode: PropTypes.func,
    submit: PropTypes.func,
    error: PropTypes.object,
  }

  static defaultProps = {
    isChecking: false,
    validateCode: '',
    validateCodeInputChange: (code)=>{},
    isSending: false,
    lastSendTime: 0,
    sendValidateCode: ()=>{},
    submit: ()=>{},
    error: {},
  }

  componentDidMount() {
    if (60 - (parseInt(moment().format('X')) - this.props.lastSendTime) <= 0){
      this.props.sendValidateCode();
    }
  }

  constructor() {
    super();
    this.setInputValidateCode = this.setInputValidateCode.bind(this);
  }

  setInputValidateCode(event) {
    this.props.validateCodeInputChange(event.target.value);
  }

  render() {
    let self = this;
    let leftTime = 60 - (parseInt(moment().format('X')) - this.props.lastSendTime);
    let isValidate = this.props.validateCode ? true : false;
    let countDownView = (
      <Countdown
        leftTime={leftTime<0 ? 0 : leftTime}
        renderFunc={({second})=>{
          return <span className={s.countDown}>{second}</span>
        }}
        renderRetryFunc={(times)=>{
          let sendText = '发送邮件';
          if (times > 0) {
            sendText = '重新发送';
          }
          if (self.props.isSending) {
            sendText = '发送中';
          }
          return (
            <span
              className={s.sendBtn}
              onClick={()=>{
                if (!self.props.isSending) {
                  self.props.sendValidateCode();
                }
              }}
              >
            {sendText}
            </span>
          )
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
              style={this.props.isChecking || !isValidate ? { backgroundColor:'grey' } : null }
              value="下一步"
              onClick={()=>{
                if (self.props.isChecking || !isValidate) {
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
export default withStyles(s)(StepTwo);
