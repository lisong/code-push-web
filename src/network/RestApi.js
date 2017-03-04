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
    this.jsonDecode = this.jsonDecode.bind(this);
    this.setAuthToken = this.setAuthToken.bind(this);
    this.deleteAuthToken = this.deleteAuthToken.bind(this);
  }

  setUUID(sessid, aQQGuid) {
    this.uuid = sessid;
    this.aQQGuid = aQQGuid;
  }

  getProducts() {
    return this.get('/apps')
    .then(this.jsonDecode);
  }

  login(account, password) {
    return this.post('/auth/login', {account: account, password: password, minutes:43200})
    .then(this.jsonDecode);
  }

  getAccessKeys() {
    return this.get('/accessKeys')
    .then(this.jsonDecode);
  }

  addProducts(appName) {
    return this.post('/apps', {name:appName}, false)
    .then(data=>{
      if (data.httpCode == 200) {
        return {status:"OK", httpCode: data.httpCode, results: this.jsonDecode(data.text)};
      } else {
        return {status:"ERROR", httpCode: data.httpCode, errorCode: 0, errorMessage: data.text};
      }
    });
  }

  removeAccessKey(name) {
    return this.delete(`/accessKeys/${encodeURI(name)}`)
    .then(this.jsonDecode);
  }

  patchAccessKey(name, friendlyName=null, ttl=0) {
    return this.patch(`/accessKeys/${encodeURI(name)}`, {friendlyName, ttl})
    .then(this.jsonDecode);
  }

  createAccessKey() {
    var time = (new Date()).getTime();
    var friendlyName = `Login-${time}`;
    var ttl = 30*2*24*60*60*1000;
    var createdBy = friendlyName;
    var isSession = true;
    return this.post(`/accessKeys`, {friendlyName, ttl, createdBy, isSession})
    .then(this.jsonDecode);
  }

  checkEmailExists(email) {
    return this.get(`/users/exists?email=${encodeURI(email)}`)
    .then(this.jsonDecode);
  }

  sendRegisterCode(email) {
    return this.post(`/users/registerCode`, {email})
    .then(this.jsonDecode);
  }

  checkRegisterCodeExists(email, code) {
    let query = `email=${encodeURI(email)}&token=${encodeURI(code)}`;
    return this.get(`/users/registerCode/exists?${query}`)
    .then(this.jsonDecode);
  }

  register(email, password, token) {
    return this.post(`/users`, {email, password, token})
    .then(this.jsonDecode);
  }

  password(oldPassword, newPassword) {
    return this.patch(`/users/password`, {oldPassword, newPassword})
    .then(this.jsonDecode);
  }

  buildReadmeUrl() {
    return `${this.baseURI}/README.md`;
  }

  dealResponse(response) {
    var self = this;
    return response.text()
    .then(text=> {
      if (__DEV__) {
        console.log(self.headers);
        console.log(response.url);
        console.log(text);
      }
      return {httpCode: response.status, text: text};
    });
  }

  jsonDecode(response) {
    try{
      return JSON.parse(response.text)
    } catch (e) {
      return {status: 'ERROR', httpCode: response.httpCode, errorCode: 0, errorMessage: e.message, results: response.text}
    }
  }

  get(uri) {
    return fetch(this.baseURI + uri, {
      method: 'GET',
      headers: this.headers,
      timeout: TIMEOUT,
    })
    .then(this.dealResponse)
    .catch(function (e) {
      return {httpCode: 0, text: '网络错误，请重试!'}
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
      return {httpCode: 0, text: '网络错误，请重试!'}
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
      return {httpCode: 0, text: '网络错误，请重试!'}
    });
  }

  delete(uri, params={}, jsonDecode = true) {
    return fetch(this.baseURI + uri, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(params),
      timeout: TIMEOUT,
    })
    .then(this.dealResponse)
    .catch(function (e) {
      return {httpCode: 0, text: '网络错误，请重试!'}
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
