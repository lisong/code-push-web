import React, { PropTypes } from 'react';
import LogoutContainer from '../../containers/LogoutContainer';
const title = '退出';

function Logout(props, context) {
  context.setTitle(title);
  return (
    <LogoutContainer/>
  );
}

Logout.contextTypes = { setTitle: PropTypes.func.isRequired };

export default Logout;
