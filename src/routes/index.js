import React from 'react';
import App from '../components/App';

// Child routes
import home from './home';
import login, {logout} from './login';
import register from './register';
import apps from './apps';
import accessKeys from './accessKeys';
import users, {settings as usersSettings} from './users';
import error from './error';

export default {

  path: '/',
  children: [
    home,
    apps,
    accessKeys,
    login,
    logout,
    register,
    error,
    users,
    usersSettings,
  ],

  async action({ next, render, context }) {
    const component = await next();
    if (component === undefined || component === true) return component;
    return render(
      <App context={context}>{component}</App>
    );
  },

};
