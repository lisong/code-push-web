import React, { PropTypes } from 'react';
import LoginContainer from '../../containers/LoginContainer';
const title = '登录';

function Login(props, context) {
  context.setTitle(title);
  return (
    <LoginContainer/>
  );
}

Login.contextTypes = { setTitle: PropTypes.func.isRequired };

export default Login;
