import request from "./index.js";

const preUrlPath = '/api/system/dictionary_category';

export const dictionaryCategoryListAllAsAntdTableByRoleId = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/list_all_as_antd_table_by_role_id`,
    data: params,
    method: 'get'
  })
})

export const dictionaryCategoryListAllAsAntdTable = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/list_all_as_antd_table`,
    data: params,
    method: 'get'
  })
})

export const dictionaryCategoryGetOneByDictionaryCategoryId = ((id) => {
  return request({
    url: `${preUrlPath}/one/${id}`,
    method: 'get',
  })
})

export const dictionaryCategoryAddOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/add_one`,
    method: 'post',
    data: params
  })
})

export const dictionaryCategorySaveOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/save_one`,
    method: 'post',
    data: params
  })
})

export const dictionaryCategoryDeleteAll = ((params = {}) => {
  return request({
    url: `${preUrlPath}/delete_all`,
    method: 'post',
    data: {'id[]': params}
  })
})

export const dictionaryCategoryListAllAsAntdTreeNode = (() => {
  return request({
    url: `${preUrlPath}/list_all_as_antd_tree_node`,
    method: 'get',
  })
})

