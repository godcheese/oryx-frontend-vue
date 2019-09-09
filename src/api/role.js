import request from '../api/index.js'

const preUrlPath = '/api/user/role';

export const rolePageAll = ((params = {}) => {
    return request({
        url: `${preUrlPath}/page_all`,
        method: 'get',
        data: params
    })
});

export const roleGetOneByRoleId = ((id) => {
    return request({
        url: `${preUrlPath}/one/${id}`,
        method: 'get',
    })
});

export const roleAddOne = ((params = {}) => {
    return request({
        url: `${preUrlPath}/add_one`,
        method: 'post',
        data: params
    })
});

export const roleSaveOne = ((params = {}) => {
    return request({
        url: `${preUrlPath}/save_one`,
        method: 'post',
        data: params
    })
});

export const roleDeleteAll = ((params = {}) => {
    return request({
        url: `${preUrlPath}/delete_all`,
        method: 'post',
        data: {'id[]': params}
    })
});

export const roleGrantAllByUserIdAndRoleIdList = ((roleIdList, userId) => {
    return request({
        url: `${preUrlPath}/grant_all_by_user_id_and_role_id_list`,
        method: 'post',
        data: {'roleIdList[]': roleIdList, 'userId': userId}
    })
});

export const roleRevokeAllByUserIdAndRoleIdList = ((roleIdList, userId) => {
    return request({
        url: `${preUrlPath}/revoke_all_by_user_id_and_role_id_list`,
        method: 'post',
        data: {'roleIdList[]': roleIdList, 'userId': userId}
    })
});


export const rolePageAllAsAntdTableByUserId = ((params = {}) => {
    return request({
        url: `${preUrlPath}/page_all_as_antd_table_by_user_id`,
        method: 'get',
        data: params
    })
});
