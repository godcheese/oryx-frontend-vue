import axios from 'axios'
import {getAccessToken} from '../common/token.js'
import {basicNotification} from '../common/index.js'

const request = axios.create({
  baseURL: process.env.BACKEND_URL,
  timeout: process.env.AXIOS.REQUEST_TIMEOUT,
});

request.interceptors.request.use( (config) => {

    // 请求带上 accessToken
  let accessToken = getAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken
    }

    if(config.method.toLowerCase() === 'post') {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8';
      const data = config.data;
      let formData = new FormData();
      for(let i in data) {
        if(data.hasOwnProperty(i)) {
          data[i] = data[i] === undefined || data[i] === null  ? '' : data[i];
          formData.append(i, data[i])
        }
      }
      config.data = formData
    }

    if(config.method.toLowerCase() === 'get') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
      const data = config.data;
      let temp = {};
      let url = config.url;
      if(url) {
        if (url.indexOf('?') !== -1) {
          let arr = url.split('?');
          config.url = arr[0];
          if (arr[1].indexOf('&') !== -1) {
            let arr2 = arr[1].split('&');
            for (let i in arr2) {
              let arr3 = arr2[i].split('=');
              temp[arr3[0]] = arr3[1]
            }
          }
        }
      }
      temp = Object.assign(temp, data);
      let params = '';
      for(let i in temp) {
        if(temp.hasOwnProperty(i)) {
         temp[i] = temp[i] === undefined ? '' : temp[i];
          params = params + '&' + i + '=' + temp[i]
        }
      }
      params = params.indexOf('&') === 0 ? params.substring(1, params.length) : params;
      config.url = params !== '' ? config.url + '?' + params : config.url
    }
    return config
  },
  (error) => {
    console.log(error);
    Promise.reject(error)
  }
);

// response 拦截器
request.interceptors.response.use(
  (response) => {
    const code = response.status;
    if (code < 200 || code > 300) {
      return Promise.reject(response)
    } else {
      return response.data
    }
  },
  (error) => {
    if (error && error.response) {
      error.data = error.response.data;
      error.status = error.response.status;
      error.statusText = error.response.statusText;

      if(error.data) {
        error.message = error.data.message || error.data.error_description;
        switch (error.message) {
          case 'User is disabled':
            error.message = '登录失败，帐号未启用！';
            break;
          case 'Bad credentials':
            error.message = '登录失败，帐号或密码错误！'
        }



      } else {
        switch (error.response.status) {
          case 400:
            error.message = '400 Bad Request';
            break;
          case 401:
            error.message = '401 Unauthorized';
            break;
          case 403:
            error.message = '403 Forbidden';
            break;
          case 404:
            error.message = '404 Not Found';
            break;
          case 408:
            error.message = '408 Request Timeout';
            break;
          case 500:
            error.message = '500 Internal Server Error';
            break;
          case 501:
            error.message = '501 Not Implemented';
            break;
          case 502:
            error.message = '502 Bad Gateway';
            break;
          case 503:
            error.message = '503 Service Unavailable';
            break;
          case 504:
            error.message = '504 Gateway Timeout';
            break;
          case 505:
            error.message = '505 HTTP Version Not Supported';
            break;
          default:
            error.message = `服务器请求失败(${error.response.status})!`
        }
      }
    } else{
      error.message = '服务器请求失败!'
    }

    basicNotification.error({message: error.message});
    return Promise.reject(error)
  }
);

export default request
