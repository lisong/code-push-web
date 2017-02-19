import React from 'react';
import LayoutContainer from '../../containers/LayoutContainer';
import { fetchAccessKeys } from '../../actions/authActions';

export default {

  path: '/accessKeys',

  async action({ store }) {
    if (process.env.BROWSER) {
      setTimeout(() => {
        store.dispatch(fetchAccessKeys());
      }, 100);
    }
    const AccessKeysContainer = await require.ensure([], require => require('../../containers/AccessKeysContainer').default, 'accessKeys');
    return {
      title: '我的密钥',
      chunk: 'accessKeys',
      component: <LayoutContainer><AccessKeysContainer /></LayoutContainer>,
    };
  },

};
