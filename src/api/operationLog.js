import request from "./index.js"

const preUrlPath = '/api/system/operation_log';

export const operationLogPageAll = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/page_all`,
    data: params,
    method: 'get'
  })
});

export const operationLogGetOneByOperationLogId = ((id) => {
  return request({
    url: `${preUrlPath}/one/${id}`,
    method: 'get',
  })
});

export const operationLogDeleteAll = ((params = {}) => {
  return request({
    url: `${preUrlPath}/delete_all`,
    method: 'post',
    data: {'id[]': params}
  })
});

export const operationLogClearAll = (() => {
  return request({
    url: `${preUrlPath}/clear_all`,
    method: 'post',
  })
});
