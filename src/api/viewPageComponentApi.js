import request from "./index.js";

const preUrlPath = '/api/user/view_page_component_api';

export const viewPageComponentApiAssociateAllByPageComponentIdAndApiIdList = ((apiIdList, pageComponentId) => {
  return request({
    url: `${preUrlPath}/associate_all_by_page_component_id_and_api_id_list`,
    method: 'post',
    data: {'apiIdList[]': apiIdList, 'pageComponentId': pageComponentId}
  })
})

export const viewPageComponentApiRevokeAssociateAllByPageComponentIdAndApiIdList = ((apiIdList, pageComponentId) => {
  return request({
    url: `${preUrlPath}/revoke_associate_all_by_page_component_id_and_api_id_list`,
    method: 'post',
    data: {'apiIdList[]': apiIdList, 'pageComponentId': pageComponentId}
  })
})
