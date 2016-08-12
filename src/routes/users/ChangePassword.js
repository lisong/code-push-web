import React, { PropTypes } from 'react';
import ChangePasswordContainer from '../../containers/ChangePasswordContainer';
const title = '修改密码 － 个人设置';

function ChangePassword(props, context) {
  context.setTitle(title);
  return (
    <ChangePasswordContainer/>
  );
}

ChangePassword.contextTypes = { setTitle: PropTypes.func.isRequired };

export default ChangePassword;
