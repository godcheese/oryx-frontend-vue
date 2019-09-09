import request from "./index.js"

const preUrlPath = '/api/user/view_page_api';

export const viewPageApiAssociateAllByPageIdAndApiIdList = ((apiIdList, viewPageId) => {
    return request({
        url: `${preUrlPath}/associate_all_by_view_page_id_and_api_id_list`,
        method: 'post',
        data: {'apiIdList[]': apiIdList, 'viewPageId': viewPageId}
    })
});

export const viewPageApiRevokeAssociateAllByPageIdAndApiIdList = ((apiIdList, viewPageId) => {
    return request({
        url: `${preUrlPath}/revoke_associate_all_by_view_page_id_and_api_id_list`,
        method: 'post',
        data: {'apiIdList[]': apiIdList, 'viewPageId': viewPageId}
    })
});
