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
      <Form style={{ height:600, paddingLeft: 20, paddingRight:20 }} horizontal>
        <br/>
        <FormGroup>
          <Col smOffset={2}>
            <h1>请登录</h1>
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            邮箱地址
          </Col>
          <Col sm={4}>
            <FormControl
            onChange={this.setInputAccount}
            value={this.props.account}
            type="email"
            placeholder="请输入邮箱地址"
            autoFocus
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            登录密码
          </Col>
          <Col sm={4}>
            <FormControl
            onChange={this.setInputPassword}
            value={this.props.password}
            type="password"
            placeholder="请输入登录密码"
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={4} style={{ color:'red' }} >
          {_.get(this.props, 'error.errorMessage')}
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={2}>
            <Button
              onClick={this.submit}
              disabled={this.props.isFetching}
            >
              登录
            </Button>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={4}>
            <span style={{ marginRight:"20px" }}>还没有账号?</span>
            <Link to="/register">立即注册</Link>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
export default Login;
