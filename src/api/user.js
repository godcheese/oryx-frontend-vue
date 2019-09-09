import request from '../api/index.js'
import {getToken} from "../common/token.js"

const preUrlPath = '/api/user';

export const login = ((username, password) => {
    return request({
        url: `${preUrlPath}/login`,
        method: 'post',
        data: {
            'username': username,
            'password': password,
        }
    })
});

export const logout = (() => {
    return request({
        url: `${preUrlPath}/logout`,
        method: 'post',
    })
});

export const getCurrentUser = (() => {
    return request({
        url: `${preUrlPath}/get_current_user`,
        method: 'get'
    })
});

export const userPageAll = ((params = {}) => {
    return request({
        url: `${preUrlPath}/page_all`,
        method: 'get',
        data: params
    })
});

export const userAddOne = ((params = {}) => {
    if (params.avatar === undefined) {
        params.avatar = ''
    }
    return request({
        url: `${preUrlPath}/add_one`,
        method: 'post',
        data: params
    })
});

export const userGetOneByUserId = ((id) => {
    return request({
        url: `${preUrlPath}/one/${id}`,
        method: 'get',
    })
});

export const userSaveOne = ((params = {}) => {
    return request({
        url: `${preUrlPath}/save_one`,
        method: 'post',
        data: params
    })
});

export const userFakeDeleteAll = ((params = {}) => {
    return request({
        url: `${preUrlPath}/fake_delete_all`,
        method: 'post',
        data: {'id[]': params}
    })
});

export const userRevokeFakeDeleteAll = ((params = {}) => {
    return request({
        url: `${preUrlPath}/revoke_fake_delete_all`,
        method: 'post',
        data: {'id[]': params}
    })
});

export const userDeleteAll = ((params = {}) => {
    return request({
        url: `${preUrlPath}/delete_all`,
        method: 'post',
        data: {'id[]': params}
    })
});

export const userAvatar = (avatar) => {
    if (avatar && (avatar.indexOf('https://') === -1 || avatar.indexOf('http://') === -1)) {
        if (typeof avatar === 'string' && avatar === 'undefined') {
            avatar = '../../static/images/avatar.png'
        } else {
            avatar = process.env.VUE_APP_APP.BACKEND_URL + '/api/system/file/download/' + avatar + '?token=' + getToken()
        }
    } else {
        avatar = '../../static/images/avatar.png'
    }
    return avatar
};
