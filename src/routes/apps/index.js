
import React from 'react';
import LayoutContainer from '../../containers/LayoutContainer';
import { getProducts } from '../../actions/productsActions';

export default {

  path: '/apps',

  async action({ store }) {
    if (process.env.BROWSER) {
      setTimeout(() => {
        store.dispatch(getProducts());
      }, 100);
    }
    const ProductListContainer = await require.ensure([], require => require('../../containers/ProductListContainer').default, 'apps');
    return {
      title: '应用管理',
      chunk: 'apps',
      component: <LayoutContainer><ProductListContainer /></LayoutContainer>,
    };
  },

};
