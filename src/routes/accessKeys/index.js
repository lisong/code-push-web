import React from 'react';
import AccessKeys from './AccessKeys';
import { fetchAccessKeys } from '../../actions/authActions';

export default {

  path: '/accessKeys',

  async action({context, query}) {
    if (process.env.BROWSER) {
      setTimeout(()=>{
        context.store.dispatch(fetchAccessKeys());
      }, 100);
    }
    return <AccessKeys/>;
  },

};
