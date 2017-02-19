import React from 'react';
import Layout from '../../components/Layout';
import LoginContainer from '../../containers/LoginContainer';
import LogoutContainer from '../../containers/LogoutContainer';

const login = {

  path: '/login',

  action() {
    return {
      title: '登录',
      component: <Layout><LoginContainer /></Layout>,
    };
  },
};

const logout = {

  path: '/logout',

  action() {
    return {
      title: '退出',
      component: <Layout><LogoutContainer /></Layout>,
    };
  },
};

export { login as default, logout };
