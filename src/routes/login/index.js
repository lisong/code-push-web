import React from 'react';
import Layout from '../../components/Layout';
import LogoutContainer from '../../containers/LogoutContainer';

const login = {

  path: '/login',

  async action() {
    const LoginContainer = await require.ensure([], require => require('../../containers/LoginContainer').default, 'login');
    return {
      title: '登录',
      chunk: 'login',
      component: <Layout><LoginContainer /></Layout>,
    };
  },
};

const logout = {

  path: '/logout',

  async action() {
    return {
      title: '退出',
      component: <Layout><LogoutContainer /></Layout>,
    };
  },
};

export { login as default, logout };
