import request from "./index.js"

const preUrlPath = '/api/user/api_category';

export const apiCategoryListAllAsAntdTableByRoleId = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/list_all_as_antd_table_by_role_id`,
    data: params,
    method: 'get'
  })
});

export const apiCategoryListAllAsAntdTable = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/list_all_as_antd_table`,
    data: params,
    method: 'get'
  })
});

export const apiCategoryGetOneByApiCategoryId = ((id) => {
  return request({
    url: `${preUrlPath}/one/${id}`,
    method: 'get',
  })
});

export const apiCategoryAddOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/add_one`,
    method: 'post',
    data: params
  })
});

export const apiCategorySaveOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/save_one`,
    method: 'post',
    data: params
  })
});

export const apiCategoryDeleteAll = ((params = {}) => {
  return request({
    url: `${preUrlPath}/delete_all`,
    method: 'post',
    data: {'id[]': params}
  })
});

export const apiCategoryListAllAsAntdTreeNode = (() => {
  return request({
    url: `${preUrlPath}/list_all_as_antd_tree_node`,
    method: 'get',
  })
});


