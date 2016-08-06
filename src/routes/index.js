import React from 'react';
import App from '../components/App';

// Child routes
import home from './home';
import login from './login';
import register from './register';
import content from './content';
import error from './error';

export default {

  path: '/',
  children: [
    home,
    login,
    register,
    content,
    error,
  ],

  async action({ next, render, context }) {
    const component = await next();
    if (component === undefined) return component;
    return render(
      <App context={context}>{component}</App>
    );
  },

};
