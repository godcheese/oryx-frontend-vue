import request from "./index.js"

const preUrlPath = '/api/user/view_page_component';

export const viewPageComponentPageAllAsAntdTableByRoleIdAndViewPageIdList = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/page_all_as_antd_table_by_role_id_and_view_page_id_list`,
    data: params,
    method: 'get'
  })
});

export const viewPageComponentPageAllAsAntdTableByViewPageIdList = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/page_all_as_antd_table_by_view_page_id_list`,
    data: params,
    method: 'get'
  })
});

export const viewPageComponentGetOneByViewPageComponentId = ((id) => {
  return request({
    url: `${preUrlPath}/one/${id}`,
    method: 'get',
  })
});

export const viewPageComponentAddOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/add_one`,
    method: 'post',
    data: params
  })
});

export const viewPageComponentSaveOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/save_one`,
    method: 'post',
    data: params
  })
});

export const viewPageComponentDeleteAll = ((params = {}) => {
  return request({
    url: `${preUrlPath}/delete_all`,
    method: 'post',
    data: {'id[]': params}
  })
});

export const viewPageComponentGrantAll = ((viewPageComponentIdList, roleId) => {
  return request({
    url: `${preUrlPath}/grant_all_by_role_id_and_view_page_component_id_list`,
    method: 'post',
    data: {'viewPageComponentIdList[]': viewPageComponentIdList, 'roleId': roleId}
  })
});

export const viewPageComponentRevokeAll = ((viewPageComponentIdList, roleId) => {
  return request({
    url: `${preUrlPath}/revoke_all_by_role_id_and_view_page_component_id_list`,
    method: 'post',
    data: {'viewPageComponentIdList[]': viewPageComponentIdList, 'roleId': roleId}
  })
});
