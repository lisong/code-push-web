
import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';
import restApi from '../../network/RestApi';

export default {

  path: '/',

  async action() {
    const resp = await fetch(restApi.buildReadmeUrl(), {
      method: 'get',
      timeout: 5000,
      headers: {
        Accept: 'text/html',
        'Content-Type': 'text/html',
      },
    });
    if (resp.status !== 200) throw new Error(resp.statusText);
    const data = await resp.text();
    return <Home html={data}/>;
  },

};
