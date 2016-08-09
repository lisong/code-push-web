import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StepOne.css';
import Button from '../../Button';

class StepOne extends Component {
  static propTypes = {
    isChecking: PropTypes.bool,
    email: PropTypes.string,
  }

  static defaultProps = {
    isChecking: false,
    email: '',
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
              autoFocus
            />
          </div>
          <br/>
          <div className={s.formGroup}>
            <Button
              style={this.props.isChecking ? { backgroundColor:'grey' } : null }
              value="下一步"
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
export default withStyles(s)(StepOne);
