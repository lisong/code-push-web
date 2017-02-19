
import React from 'react';
import Layout from '../../components/Layout';
import ChangePasswordContainer from '../../containers/ChangePasswordContainer';

const users = {

  path: '/users',

  async action() {
    return {
      title: '修改密码 － 个人设置',
      component: <Layout><ChangePasswordContainer /></Layout>,
    };
  },

};

const settings = {

  path: '/users/settings',

  async action() {
    return {
      title: '修改密码 － 个人设置',
      component: <Layout><ChangePasswordContainer /></Layout>,
    };
  },

};

export { users as default, settings };
