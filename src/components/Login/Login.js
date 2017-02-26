import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import {
  Col,
  ControlLabel,
  Form,
  FormGroup,
  FormControl,
  Checkbox,
  Button,
  Panel,
} from 'react-bootstrap';
import Link from '../Link';

class Login extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    account: PropTypes.string,
    password: PropTypes.string,
    accountInputChange: PropTypes.func,
    passwordInputChange: PropTypes.func,
    submit: PropTypes.func,
    error: PropTypes.object
  };
  static defaultProps = {
    isFetching: false,
    account: '',
    accountInputChange: (account)=>{},
    password: '',
    passwordInputChange: (password)=>{},
    submit: (account, password)=>{},
    error: {}
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
      <div style={{height:650, paddingLeft: 20, paddingRight:20 }}>
        <Panel header="登录" style={{  width:350, marginLeft:"auto", marginRight: "auto" }}>
          <Form>
            <FormGroup controlId="formHorizontalEmail">
              <ControlLabel>邮箱地址</ControlLabel>
              <FormControl
                onChange={this.setInputAccount}
                value={this.props.account}
                type="email"
                placeholder="请输入邮箱地址"
                autoFocus
                />
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
              <ControlLabel>密码</ControlLabel>
              <FormControl
                onChange={this.setInputPassword}
                value={this.props.password}
                type="password"
                placeholder="请输入登录密码"
              />
            </FormGroup>
            <FormGroup style={{ paddingTop: 20 }}>
              <div style={{ color:'red' }} >
              {_.get(this.props, 'error.errorMessage')}
              </div>
            </FormGroup>
            <FormGroup>
              <Button
                style={{width: "100%"}}
                bsStyle="primary"
                onClick={this.submit}
                disabled={this.props.isFetching}
              >
              {this.props.isFetching ? '登录中...' : '登录'}
              </Button>
            </FormGroup>
            <FormGroup style={{ paddingTop: 28 }}>
              <span style={{ marginRight: 20 }}>还没有账号?</span>
              <Link to="/register">立即注册</Link>
            </FormGroup>
          </Form>
        </Panel>
      </div>
    );
  }
}
export default Login;
