import React from 'react';
import Layout from '../../components/Layout';

export default {

  path: '/register',

  async action({store}) {

    if (process.env.BROWSER) {

    }

    const RegisterContainer = await require.ensure([], require => require('../../containers/RegisterContainer').default, 'register');
    return {
      title: '注册',
      chunk: 'register',
      component: <Layout><RegisterContainer /></Layout>,
    };
  },

};
