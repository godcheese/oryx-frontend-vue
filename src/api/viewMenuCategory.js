import request from "./index.js";

const preUrlPath = '/api/user/view_menu_category';

export const viewMenuCategoryListAllAsAntdTableByRoleId = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/list_all_as_antd_table_by_role_id`,
    data: params,
    method: 'get'
  })
})

export const viewMenuCategoryListAllAsAntdTable = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/list_all_as_antd_table`,
    data: params,
    method: 'get'
  })
})

export const viewMenuCategoryGetOneByViewMenuCategoryId = ((id) => {
  return request({
    url: `${preUrlPath}/one/${id}`,
    method: 'get',
  })
})

export const viewMenuCategoryAddOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/add_one`,
    method: 'post',
    data: params
  })
})

export const viewMenuCategorySaveOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/save_one`,
    method: 'post',
    data: params
  })
})

export const viewMenuCategoryDeleteAll = ((params = {}) => {
  return request({
    url: `${preUrlPath}/delete_all`,
    method: 'post',
    data: {'id[]': params}
  })
})

export const viewMenuCategoryListAllAsAntdTreeNode = (() => {
  return request({
    url: `${preUrlPath}/list_all_as_antd_tree_node`,
    method: 'get',
  })
})

export const viewMenuCategoryGrantAll = ((viewMenuCategoryIdList, roleId) => {
  return request({
    url: `${preUrlPath}/grant_all_by_role_id_and_view_menu_category_id_list`,
    method: 'post',
    data: {'viewMenuCategoryIdList[]': viewMenuCategoryIdList, 'roleId': roleId}
  })
})

export const viewMenuCategoryRevokeAll = ((viewMenuCategoryIdList, roleId) => {
  return request({
    url: `${preUrlPath}/revoke_all_by_role_id_and_view_menu_category_id_list`,
    method: 'post',
    data: {'viewMenuCategoryIdList[]': viewMenuCategoryIdList, 'roleId': roleId}
  })
})

