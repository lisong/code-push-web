let instance = null;
import _buffer from 'buffer';
import _ from 'lodash';
import { common } from '../config';
import fetch from '../core/fetch';

const TIMEOUT = 10000;

class RestApi {
  constructor() {
    if (instance) return instance;
    instance = this;
    if (__DEV__ === true) {
      this.baseURI = _.get(common, 'api.devURL', 'http://localhost:3000');
    } else {
      this.baseURI = _.get(common, 'api.URL', 'http://localhost:3000');
    }
    this.headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
    this.dealResponse = this.dealResponse.bind(this);
    this.setAuthToken = this.setAuthToken.bind(this);
    this.deleteAuthToken = this.deleteAuthToken.bind(this);
  }

  setUUID(sessid, aQQ_guid) {
    this.uuid = sessid;
    this.aQQ_guid = aQQ_guid;
  }

  login(account, password) {
    return this.post('/auth/login', {account: account, password: password, minutes:43200});
  }

  dealResponse(response) {
    var self = this;
    return response.text().then(text=> {
      try {
        if (__DEV__) {
          console.log(self.headers);
          console.log(response.url);
          console.log(text);
        }
        return JSON.parse(text);
      } catch (e) {
        if (__DEV__) {
          console.error(text);
        }
        throw e;
      }
    }).catch(e=> {
      return {status: 'ERROR', errorCode: 0, errorMessage: '网络错误，请重试!'}
    });
  }

  get(uri) {
    return fetch(this.baseURI + uri, {
      method: 'GET',
      headers: this.headers,
      timeout: TIMEOUT,
    })
    .then(this.dealResponse)
    .catch(function (e) {
      return {status: 'ERROR', errorCode: 0, errorMessage: '网络错误，请重试!'}
    });
  }

  post(uri, params = {}) {
    return fetch(this.baseURI + uri, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(params),
      timeout: TIMEOUT,
    })
    .then(this.dealResponse)
    .catch(function (e) {
      return {status: 'ERROR', errorCode: 0, errorMessage: '网络错误，请重试!'}
    });
  }

  patch(uri, params = {}) {
    return fetch(this.baseURI + uri, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(params),
      timeout: TIMEOUT,
    })
    .then(this.dealResponse)
    .catch(function (e) {
      return {status: 'ERROR', errorCode: 0, errorMessage: '网络错误，请重试!'}
    });
  }

  delete(uri) {
    return fetch(this.baseURI + uri, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(params),
      timeout: TIMEOUT,
    })
    .then(this.dealResponse)
    .catch(function (e) {
      return {status: 'ERROR', errorCode: 0, errorMessage: '网络错误，请重试!'}
    });
  }

  isAuth() {
    return _.isEmpty(this.headers.Authorization) ? false : true;
  }

  getHeaders() {
    return this.headers;
  }

  deleteAuthToken() {
    delete this.headers.Authorization;
  }

  setAuthToken(creds) {
    if (typeof creds === 'string') {
      var index = creds.indexOf(':');
      if (index !== -1) {
        creds = [creds.substr(0, index), creds.substr(index + 1)];
      }
    }

    if (!Array.isArray(creds)) creds = [].slice.call(arguments);

    switch (creds.length) {
      case 0:
        creds = ['', ''];
        break;
      case 1:
        creds.push('');
        break;
      case 2:
        break;
      default:
        throw new Error('auth option can only have two keys `[user, pass]`');
    }

    if (typeof creds[0] !== 'string') throw new Error('auth option `user` must be a string');

    if (typeof creds[1] !== 'string') throw new Error('auth option `pass` must be a string');

    if (!creds[0] && !creds[1]) delete this.headers.Authorization; else this.headers.Authorization = 'Basic ' + new _buffer.Buffer(creds.join(':')).toString('base64');

    return this;
  }
}

export default new RestApi;
