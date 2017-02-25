
import React from 'react';
import LayoutContainer from '../../containers/LayoutContainer';
import { getProducts } from '../../actions/productsActions';

const apps = {

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

const deployments = {
  path: '/apps/:appName/:deploymentName',

  async action({ store, params }) {
    if (process.env.BROWSER) {
      // setTimeout(() => {
      //   store.dispatch(getProducts());
      // }, 100);
    }
    const DeploymentContainer = await require.ensure([], require => require('../../containers/DeploymentContainer').default, 'deployment');
    return {
      title: '应用管理',
      chunk: 'deployment',
      component: <LayoutContainer><DeploymentContainer /></LayoutContainer>,
    };
  },
};

export {apps as default, deployments}
