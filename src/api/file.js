import request from "./index.js"
import {getAccessToken} from "../common/token.js"

const preUrlPath = '/api/system/file';

export const filePageAll = ( (params = {}) => {
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

export const fileSaveOne = ( (params = {}) => {
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
 return process.env.BACKEND_URL + '/api/system/file/download/' + guid + '?access_token=' + getAccessToken()
});

export const filePageAllImage = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/page_all_image`,
    data: params,
    method: 'get'
  })
});

export const fileUploadOneUrlFormatter = (() =>  {
  return process.env.BACKEND_URL + '/api/system/file/upload_one?access_token=' + getAccessToken()
});
