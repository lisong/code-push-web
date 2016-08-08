
import React from 'react';
import Apps from './Apps';
import { getProducts } from '../../actions/productsActions';

export default {

  path: '/apps',

  async action({context, query}) {
    if (process.env.BROWSER) {
      setTimeout(()=>{
        context.store.dispatch(getProducts());
      }, 100);
    }
    return <Apps/>;
  },

};
