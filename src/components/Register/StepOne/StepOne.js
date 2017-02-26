import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import validator from 'validator';
import {
  ControlLabel,
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import Link from '../../Link';

class StepOne extends Component {
  static propTypes = {
    isChecking: PropTypes.bool,
    email: PropTypes.string,
    emailInputChange: PropTypes.func,
    submit: PropTypes.func,
    error: PropTypes.object,
  }

  static defaultProps = {
    isChecking: false,
    email: '',
    emailInputChange:(email)=>{},
    submit: ()=>{},
    error: {},
  }

  constructor() {
    super();
    this.setInputEmail = this.setInputEmail.bind(this);
  }

  setInputEmail(event) {
    this.props.emailInputChange(event.target.value);
  }
  render() {
    const self = this;
    var emailIsValidate = validator.isEmail(this.props.email);
    var disabled = true;
    if (!this.props.isChecking && emailIsValidate){
        disabled = false;
    }
    return (
      <Form style={{  width:350, marginLeft:"auto", marginRight: "auto" }}>
        <FormGroup controlId="formHorizontalEmail">
          <ControlLabel>邮箱地址</ControlLabel>
          <FormControl
            onChange={this.setInputEmail}
            value={this.props.email}
            type="email"
            placeholder="请输入邮箱地址"
            autoComplete="off"
            autoFocus
            />
        </FormGroup>
        <FormGroup style={{ paddingTop: 20 }}>
          <div style={{ color:'red' }} >
          {_.get(this.props, 'error.message')}
          </div>
        </FormGroup>
        <FormGroup>
          <Button
            style={{width: "100%"}}
            bsStyle="primary"
            onClick={()=>{
              if (disabled) {
                return;
              }
              self.props.submit();
            }}
            disabled={disabled}
          >
          下一步
          </Button>
        </FormGroup>
        <FormGroup style={{ paddingTop: 28, textAlign: 'center' }}>
          <Link to="/login">已有帐号</Link>
        </FormGroup>
      </Form>
    );
  }
}
export default StepOne;
