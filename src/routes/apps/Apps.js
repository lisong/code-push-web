import React, { PropTypes } from 'react';
import ProductListContainer from '../../containers/ProductListContainer';
const title = 'App list';

function Apps(props, context) {
  context.setTitle(title);
  return (
    <ProductListContainer/>
  );
}

Apps.contextTypes = { setTitle: PropTypes.func.isRequired };

export default Apps;
