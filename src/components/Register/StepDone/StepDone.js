import React from 'react';
import {
  ControlLabel,
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import Link from '../../Link';


function StepDone() {
  return (
    <Form style={{  maxWidth:350, marginLeft:"auto", marginRight: "auto" }}>
      <FormGroup style={{ textAlign:'center' }}>
        <div>
          <span>恭喜！您已经注册成功，快去</span>
          <Link to="/login">登录</Link>
          <span>吧</span>
        </div>
      </FormGroup>
    </Form>
  );
}
export default StepDone;
