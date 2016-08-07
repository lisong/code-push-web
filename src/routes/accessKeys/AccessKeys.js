import React, { PropTypes } from 'react';
import AccessKeysContainer from '../../containers/AccessKeysContainer';
const title = 'AccessKeys';

function AccessKeys(props, context) {
  context.setTitle(title);
  return (
    <AccessKeysContainer/>
  );
}

AccessKeys.contextTypes = { setTitle: PropTypes.func.isRequired };

export default AccessKeys;
