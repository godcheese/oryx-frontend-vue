import request from "./index.js";
import {getAccessToken} from "../common/token";

const preUrlPath = '/api/system/attachment';

export const attachmentPageAll = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/page_all`,
    data: params,
    method: 'get'
  })
})

export const attachmentGetOneByAttachmentId = ((id) => {
  return request({
    url: `${preUrlPath}/one/${id}`,
    method: 'get',
  })
})

export const attachmentSaveOne = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/save_one`,
    data: params,
    method: 'post'
  })
})

export const attachmentDeleteAll = ((params = {}) => {
  return request({
    url: `${preUrlPath}/delete_all`,
    method: 'post',
    data: {'id[]': params}
  })
})

export const downloadUrlFormatter = ((guid) => {
 return process.env.BACKEND_URL + '/api/system/attachment/download/' + guid + '?access_token=' + getAccessToken()
})

export const attachmentPageAllImage = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/page_all_image`,
    data: params,
    method: 'get'
  })
})

export const attachmentUploadOneUrlFormatter = (() =>  {
  return process.env.BACKEND_URL + '/api/system/attachment/upload_one?access_token=' + getAccessToken()
})
