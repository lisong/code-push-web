import React, { PropTypes } from 'react';
import ProductListContainer from '../../containers/ProductListContainer';
const title = '应用管理';

function Apps(props, context) {
  context.setTitle(title);
  return (
    <ProductListContainer/>
  );
}

Apps.contextTypes = { setTitle: PropTypes.func.isRequired };

export default Apps;
