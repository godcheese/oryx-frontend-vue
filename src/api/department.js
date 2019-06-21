import request from '../api/index.js'

const preUrlPath = '/api/user/department';

export const departmentListAllAsAntdTreeNode = (() => {
  return request({
    url: `${preUrlPath}/list_all_as_antd_tree_node`,
    method: 'get',
  })
})

export const departmentListAllAsAntdTable = (() => {
  return request({
    url: `${preUrlPath}/list_all_as_antd_table`,
    method: 'get',
  })
})

export const departmentListAllByDepartmentId = ((id) => {
  return request({
    url: `${preUrlPath}/list_all_by_department_id/${id}`,
    method: 'get',
    async: false
  })
})

// export const departmentFormatter = ((value, values, callback) => {
//   var departmentName = [];
//   expressui.ajax({
//     url: Url.User.Api.DEPARTMENT + '/list_all_by_department_id/' + value,
//     async: false,
//     success: function (data) {
//       for(var i=0; i< data.length; i++) {
//         departmentName.push(data[i].name);
//       }
//     }
//   });
//   return departmentName.join('\\')
// })

export const departmentAddOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/add_one`,
    method: 'post',
    data: params
  })
})

export const departmentGetOneByDepartmentId = ((id) => {
  return request({
    url: `${preUrlPath}/one/${id}`,
    method: 'get',
  })
})

export const departmentSaveOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/save_one`,
    method: 'post',
    data: params
  })
})

export const departmentDeleteAll = ((params = {}) => {
  return request({
    url: `${preUrlPath}/delete_all`,
    method: 'post',
    data: {'id[]': params}
  })
})
