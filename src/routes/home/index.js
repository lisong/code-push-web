/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';
import restApi from '../../network/RestApi';
import HomeContainer from '../../containers/HomeContainer';

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
    return {
      title: 'CodePushServer',
      component: <Layout><HomeContainer html={data} /></Layout>,
    };
  },

};
