
import React from 'react';
import App from '../../components/App';
import ErrorPage from './ErrorPage';

export default {

  path: '/error',

  action({ render, context, error }) {
    return render(
      <App context={context} error={error}>
        <ErrorPage error={error} />
      </App>,
      error.status || 500
    );
  },

};
