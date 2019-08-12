import request from "./index.js"

const preUrlPath = '/api/user/view_menu';

export const viewMenuListAllAsAntdVueMenuByCurrentUser = (() => {
  return request({
    url: `${preUrlPath}/list_all_as_antd_vue_menu_by_current_user`,
    method: 'get'
  })
});

export const viewMenuPageAllAsAntdTableByRoleIdAndViewMenuCategoryIdList = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/page_all_as_antd_table_by_role_id_and_view_menu_category_id_list`,
    data: params,
    method: 'get'
  })
});

export const viewMenuPageAllAsAntdTableByViewMenuCategoryIdList = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/page_all_as_antd_table_by_view_menu_category_id_list`,
    data: params,
    method: 'get'
  })
});

export const viewMenuGetOneByViewMenuId = ((id) => {
  return request({
    url: `${preUrlPath}/one/${id}`,
    method: 'get',
  })
});

export const viewMenuAddOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/add_one`,
    method: 'post',
    data: params
  })
});

export const viewMenuSaveOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/save_one`,
    method: 'post',
    data: params
  })
});

export const viewMenuDeleteAll = ((params = {}) => {
  return request({
    url: `${preUrlPath}/delete_all`,
    method: 'post',
    data: {'id[]': params}
  })
});

export const viewMenuGrantAll = ((viewMenuIdList, roleId) => {
  return request({
    url: `${preUrlPath}/grant_all_by_role_id_and_view_menu_id_list`,
    method: 'post',
    data: {'viewMenuIdList[]': viewMenuIdList, 'roleId': roleId}
  })
});

export const viewMenuRevokeAll = ((viewMenuIdList, roleId) => {
  return request({
    url: `${preUrlPath}/revoke_all_by_role_id_and_view_menu_id_list`,
    method: 'post',
    data: {'viewMenuIdList[]': viewMenuIdList, 'roleId': roleId}
  })
});
