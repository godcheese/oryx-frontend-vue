import axios from 'axios'
import {getToken} from '../common/token.js'
import {basicNotification} from '../common/index.js'
import { Modal } from 'ant-design-vue'
import router from '../router/index.js'
import store from '../store/index.js'

const request = axios.create({
    baseURL: process.env.VUE_APP_APP.BACKEND_URL,
    timeout: process.env.VUE_APP_AXIOS.REQUEST_TIMEOUT,
});

request.interceptors.request.use((config) => {

        // 请求带上 Token
        let token = getToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }

        if (config.method.toLowerCase() === 'post') {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8';
            const data = config.data;
            let formData = new FormData();
            for (let i in data) {
                if (data.hasOwnProperty(i)) {
                    data[i] = data[i] === undefined || data[i] === null ? '' : data[i];
                    formData.append(i, data[i])
                }
            }
            config.data = formData
        }

        if (config.method.toLowerCase() === 'get') {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
            const data = config.data;
            let temp = {};
            let url = config.url;

            if (url) {
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
            if(temp !== {}) {
                for (let i in temp) {
                    if (temp.hasOwnProperty(i)) {
                        temp[i] = temp[i] === undefined ? '' : temp[i];
                        params = params + '&' + i + '=' + temp[i]
                    }
                }
            }
            params = params.indexOf('&') === 0 ? params.substring(1, params.length) : params;
            config.url = params !== '' ? config.url + '?' + params : config.url
        }
        return config
    },
    (e) => {
        console.log(e);
        Promise.reject(e)
    }
);

// response 拦截器
request.interceptors.response.use(
    (response) => {
        const status = response.status;
        if (status < 200 || status > 300) {
            return Promise.reject(response)
        } else {
            return response.data
        }
    },
    (error) => {
        if (error && error.response) {
            if(!error.response.data.message) {
                switch (error.response.status) {
                    case 400:
                        error.response.data.message = '400 Bad Request';
                        break;
                    case 401:
                        error.response.data.message = '401 Unauthorized';
                        break;
                    case 403:
                        error.response.data.message = '403 Forbidden';
                        break;
                    case 404:
                        error.response.data.message = '404 Not Found';
                        break;
                    case 408:
                        error.response.data.message = '408 Request Timeout';
                        break;
                    case 500:
                        error.response.data.message = '500 Internal Server Error';
                        break;
                    case 501:
                        error.response.data.message = '501 Not Implemented';
                        break;
                    case 502:
                        error.response.data.message = '502 Bad Gateway';
                        break;
                    case 503:
                        error.response.data.message = '503 Service Unavailable';
                        break;
                    case 504:
                        error.response.data.message = '504 Gateway Timeout';
                        break;
                    case 505:
                        error.response.data.message = '505 HTTP Version Not Supported';
                        break;
                    default:
                        error.response.data.message = `服务器请求失败(${error.response.status})!`
                }
            }
            if(error.response.status === 401) {
                console.log('refreshToken' + store.state.jwt.refreshToken);
                if(!store.state.jwt.refreshToken) {
                    Modal.confirm({
                        title: '信息',
                        content: error.response.data.message,
                        okText: '刷新页面',
                        onOk() {
                            // store.dispatch('jwt/setRefreshToken', true).then(() => {
                            window.location.reload(); // 为了重新实例化vue-router对象 避免bug
                            // })
                        },
                        onCancel() {
                        }
                    });
                    store.dispatch('jwt/setRefreshToken', true).then(() => {
                        // window.location.reload(); // 为了重新实例化vue-router对象 避免bug
                    })
                }
                // } else {
                //     window.location.reload(); // 为了重新实例化vue-router对象 避免bug
                // }
            }

        } else{
            error.response = {data: {}};
            if (error.toString().indexOf('Error: Network Error') !== -1) {
                error.response.data.message = "网络请求错误，建议刷新页面后重试";
                // Modal.confirm({
                //     title: '信息',
                //     content: '网络请求错误，建议刷新页面后重试！',
                //     okText: '刷新页面',
                //     onOk() {
                //         window.location.reload(); // 为了重新实例化vue-router对象 避免bug
                //         return Promise.reject();
                //     },
                //     onCancel() {}
                // });
                // return Promise.reject(error);
            }
            if (error.toString().indexOf('Error: timeout') !== -1) {
                error.response.data.message = "网络请求超时，建议刷新页面后重试";
                // Modal.confirm({
                //     title: '信息',
                //     content: '网络请求超时，建议刷新页面后重试！',
                //     okText: '刷新页面',
                //     onOk() {
                //         window.location.reload(); // 为了重新实例化vue-router对象 避免bug
                //     },
                //     onCancel() {}
                // });
            }
        }

        basicNotification.error({message: error.response.data.message});
        return Promise.reject(error)
    }
);

export default request
