
import React from 'react';
import LayoutContainer from '../../containers/LayoutContainer';

const users = {

  path: '/users',

  async action() {
    const ChangePasswordContainer = await require.ensure([], require => require('../../containers/ChangePasswordContainer').default, 'changePassword');
    return {
      title: '修改密码 － 个人设置',
      chunk: 'changePassword',
      component: <LayoutContainer><ChangePasswordContainer /></LayoutContainer>,
    };
  },

};

const settings = {

  path: '/users/settings',

  async action() {
    const ChangePasswordContainer = await require.ensure([], require => require('../../containers/ChangePasswordContainer').default, 'changePassword');
    return {
      title: '修改密码 － 个人设置',
      chunk: 'changePassword',
      component: <LayoutContainer><ChangePasswordContainer /></LayoutContainer>,
    };
  },

};

export { users as default, settings };
