import request from "./index.js";

const preUrlPath = '/api/user/view_page';

export const viewPagePageAllAsAntdTableByRoleIdAndPageCategoryIdList = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/page_all_as_antd_table_by_role_id_and_page_category_id_list`,
    data: params,
    method: 'get'
  })
})

export const viewPagePageAllAsAntdTableByPageCategoryIdList = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/page_all_as_antd_table_by_page_category_id_list`,
    data: params,
    method: 'get'
  })
})

export const viewPageGetOneByViewPageId = ((id) => {
  return request({
    url: `${preUrlPath}/one/${id}`,
    method: 'get',
  })
})

export const viewPageAddOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/add_one`,
    method: 'post',
    data: params
  })
})

export const viewPageSaveOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/save_one`,
    method: 'post',
    data: params
  })
})

export const viewPageDeleteAll = ((params = {}) => {
  return request({
    url: `${preUrlPath}/delete_all`,
    method: 'post',
    data: {'id[]': params}
  })
})

export const viewPageGrantAll = ((viewPageIdList, roleId) => {
  return request({
    url: `${preUrlPath}/grant_all_by_role_id_and_view_page_id_list`,
    method: 'post',
    data: {'viewPageIdList[]': viewPageIdList, 'roleId': roleId}
  })
})

export const viewPageRevokeAll = ((viewPageIdList, roleId) => {
  return request({
    url: `${preUrlPath}/revoke_all_by_role_id_and_view_page_id_list`,
    method: 'post',
    data: {'viewPageIdList[]': viewPageIdList, 'roleId': roleId}
  })
})

export const viewPageListAllByViewPageCategoryId = ((viewPageCategoryId) => {
  return request({
    url: `${preUrlPath}/list_all_by_view_page_category_id`,
    method: 'get',
    data: {viewPageCategoryId: viewPageCategoryId}
  })
})
