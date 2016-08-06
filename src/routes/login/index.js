import React from 'react';
import Login from './Login';
import Logout from './Logout';

var login = {

  path: '/login',

  action() {
    return <Login />;
  },

};

var logout = {

  path: '/logout',

  action() {
    return <Logout />;
  },
}

export {login as default, logout};
