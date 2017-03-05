
import React from 'react';
import LayoutContainer from '../../containers/LayoutContainer';
import { getProducts, fetchDeployments} from '../../actions/productsActions';
import _ from 'lodash';

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
    var appName = _.get(params, 'appName');
    var deploymentName = _.get(params, 'deploymentName');
    const DeploymentContainer = await require.ensure([], require => require('../../containers/DeploymentContainer').default, 'deployment');
    return {
      title: `${deploymentName} ${appName}`,
      chunk: 'deployment',
      component: <LayoutContainer><DeploymentContainer appName={appName} deploymentName={deploymentName} /></LayoutContainer>,
    };
  },
};

const appDetails = {
  path: '/apps/:appName',

  async action({store, params}) {
    var appName = _.get(params, 'appName');
    if (process.env.BROWSER) {
      setTimeout(() => {
        store.dispatch(fetchDeployments(appName));
      }, 100);
    }
    const ProductContainer = await require.ensure([], require => require('../../containers/ProductContainer').default, 'product');
    return {
      title: `${appName} 详情`,
      chunk: 'product',
      component: <LayoutContainer><ProductContainer appName={appName} /></LayoutContainer>,
    };
  }
}

export {apps as default, deployments, appDetails}
