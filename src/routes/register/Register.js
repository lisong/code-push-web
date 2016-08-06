import React, { PropTypes } from 'react';
import RegisterContainer from '../../containers/RegisterContainer';
const title = '注册';

function Register(props, context) {
  context.setTitle(title);
  return (
    <RegisterContainer/>
  );
}

Register.contextTypes = { setTitle: PropTypes.func.isRequired };

export default Register;
