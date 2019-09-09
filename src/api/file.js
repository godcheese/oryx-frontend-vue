import request from "./index.js"
import {getToken} from "../common/token.js"

const preUrlPath = '/api/system/file';

export const filePageAll = ((params = {}) => {
    return request({
        url: `${preUrlPath}/page_all`,
        data: params,
        method: 'get'
    })
});

export const fileGetOneByAttachmentId = ((id) => {
    return request({
        url: `${preUrlPath}/one/${id}`,
        method: 'get',
    })
});

export const fileSaveOne = ((params = {}) => {
    return request({
        url: `${preUrlPath}/save_one`,
        data: params,
        method: 'post'
    })
});

export const fileDeleteAll = ((params = {}) => {
    return request({
        url: `${preUrlPath}/delete_all`,
        method: 'post',
        data: {'id[]': params}
    })
});

export const downloadUrlFormatter = ((guid) => {
    return process.env.VUE_APP_APP.BACKEND_URL + '/api/system/file/download/' + guid + '?token=' + getToken()
});

export const filePageAllImage = ((params = {}) => {
    return request({
        url: `${preUrlPath}/page_all_image`,
        data: params,
        method: 'get'
    })
});

export const fileUploadOneUrlFormatter = (() => {
    return process.env.VUE_APP_APP.BACKEND_URL + '/api/system/file/upload_one?token=' + getToken()
});
