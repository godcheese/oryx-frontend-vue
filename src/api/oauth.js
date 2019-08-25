import request from '../api/index.js'

const preUrlPath = '/api/oauth';

export const clientPageAll = ((params = {}) => {
  return request({
    url: `${preUrlPath}/client/page_all`,
    method: 'get',
    data: params
  })
});

export const clientGetOneByClientId = ((clientid) => {
  return request({
    url: `${preUrlPath}/one/${clientId}`,
    method: 'get',
  })
});

export const clientAddOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/add_one`,
    method: 'post',
    data: params
  })
});

export const clientSaveOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/save_one`,
    method: 'post',
    data: params
  })
});

export const clientDeleteAll = ((params = {}) => {
  return request({
    url: `${preUrlPath}/delete_all`,
    method: 'post',
    data: {'clientIdList[]': params}
  })
});

