import React from 'react';
import Layout from '../../components/Layout';
import AccessKeysContainer from '../../containers/AccessKeysContainer';
import { fetchAccessKeys } from '../../actions/authActions';

export default {

  path: '/accessKeys',

  async action({ store }) {
    if (process.env.BROWSER) {
      setTimeout(() => {
        store.dispatch(fetchAccessKeys());
      }, 100);
    }
    return {
      title: '我的密钥',
      component: <Layout><AccessKeysContainer /></Layout>,
    };
  },

};
