import request from "./index.js"

const preUrlPath = '/api/mail';

export const mailGetOneByMailId = ((id) => {
    return request({
        url: `${preUrlPath}/one/${id}`,
        method: 'get',
    })
});

export const mailAddOne = ((params = {}) => {
    return request({
        url: `${preUrlPath}/add_one`,
        method: 'post',
        data: params
    })
});


export const mailDeleteAll = ((params = {}) => {
    return request({
        url: `${preUrlPath}/delete_all`,
        method: 'post',
        data: {'id[]': params}
    })
});

export const mailPageAll = ((params = {}) => {
    return request({
        url: `${preUrlPath}/page_all`,
        data: params,
        method: 'get'
    })
});

