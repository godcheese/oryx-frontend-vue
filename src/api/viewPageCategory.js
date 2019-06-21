import request from "./index.js";

const preUrlPath = '/api/user/view_page_category';

export const viewPageCategoryListAllAsAntdTableByRoleId = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/list_all_as_antd_table_by_role_id`,
    data: params,
    method: 'get'
  })
})

export const viewPageCategoryListAllAsAntdTable = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/list_all_as_antd_table`,
    data: params,
    method: 'get'
  })
})

export const viewPageCategoryGetOneByViewPageCategoryId = ((id) => {
  return request({
    url: `${preUrlPath}/one/${id}`,
    method: 'get',
  })
})

export const viewPageCategoryAddOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/add_one`,
    method: 'post',
    data: params
  })
})

export const viewPageCategorySaveOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/save_one`,
    method: 'post',
    data: params
  })
})

export const viewPageCategoryDeleteAll = ((params = {}) => {
  return request({
    url: `${preUrlPath}/delete_all`,
    method: 'post',
    data: {'id[]': params}
  })
})

export const viewPageCategoryListAllAsAntdTreeNode = (() => {
  return request({
    url: `${preUrlPath}/list_all_as_antd_tree_node`,
    method: 'get',
  })
})


export const viewPageCategoryGetOneByViewPageId = ((viewPageId) => {
  return request({
    url: `${preUrlPath}/get_one_by_view_page_id`,
    method: 'get',
    data: {viewPageId: viewPageId}
  })
})
