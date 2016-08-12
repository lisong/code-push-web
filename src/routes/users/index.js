
import React from 'react';
import ChangePassword from './ChangePassword';

var users =  {

  path: '/users',

  async action({context, query}) {
    return <ChangePassword/>;
  },

};

var settings =  {

  path: '/users/settings',

  async action({context, query}) {
    return <ChangePassword/>;
  },

};

export {users as default, settings};
