import request from "./index.js";

const preUrlPath = '/api/user/view_page_api';

export const viewPageApiAssociateAllByPageIdAndApiIdList = ((apiIdList, pageId) => {
  return request({
    url: `${preUrlPath}/associate_all_by_page_id_and_api_id_list`,
    method: 'post',
    data: {'apiIdList[]': apiIdList, 'pageId': pageId}
  })
})

export const viewPageApiRevokeAssociateAllByPageIdAndApiIdList = ((apiIdList, pageId) => {
  return request({
    url: `${preUrlPath}/revoke_associate_all_by_page_id_and_api_id_list`,
    method: 'post',
    data: {'apiIdList[]': apiIdList, 'pageId': pageId}
  })
})
