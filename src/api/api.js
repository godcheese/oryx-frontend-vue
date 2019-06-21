import request from "./index.js";

const preUrlPath = '/api/user/api';

export const apiPageAllAsAntdTableByRoleIdAndApiCategoryIdList = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/page_all_as_antd_table_by_role_id_and_api_category_id_list`,
    data: params,
    method: 'get'
  })
})

export const apiPageAllAsAntdTableByApiCategoryIdList = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/page_all_as_antd_table_by_api_category_id_list`,
    data: params,
    method: 'get'
  })
})

export const apiGetOneByApiId = ((id) => {
  return request({
    url: `${preUrlPath}/one/${id}`,
    method: 'get',
  })
})

export const apiAddOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/add_one`,
    method: 'post',
    data: params
  })
})

export const apiSaveOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/save_one`,
    method: 'post',
    data: params
  })
})

export const apiDeleteAll = ((params = {}) => {
  return request({
    url: `${preUrlPath}/delete_all`,
    method: 'post',
    data: {'id[]': params}
  })
})

export const apiGrantAll = ((apiIdList, roleId) => {
  return request({
    url: `${preUrlPath}/grant_all_by_role_id_and_api_id_list`,
    method: 'post',
    data: {'apiIdList[]': apiIdList, 'roleId': roleId}
  })
})

export const apiRevokeAll = ((apiIdList, roleId) => {
  return request({
    url: `${preUrlPath}/revoke_all_by_role_id_and_api_id_list`,
    method: 'post',
    data: {'apiIdList[]': apiIdList, 'roleId': roleId}
  })
})

export const apiPageAllAsAntdTableByPageIdAndApiCategoryIdList = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/page_all_as_antd_table_by_page_id_and_api_category_id_list`,
    data: params,
    method: 'get'
  })
})

export const apiPageAllAsAntdTableByPageComponentIdAndApiCategoryIdList = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/page_all_as_antd_table_by_page_component_id_and_api_category_id_list`,
    data: params,
    method: 'get'
  })
})


