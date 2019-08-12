import request from "./index.js"

const preUrlPath = '/api/user/view_page_component_api';

export const viewPageComponentApiAssociateAllByPageComponentIdAndApiIdList = ((apiIdList, viewPageComponentId) => {
  return request({
    url: `${preUrlPath}/associate_all_by_view_page_component_id_and_api_id_list`,
    method: 'post',
    data: {'apiIdList[]': apiIdList, 'viewPageComponentId': viewPageComponentId}
  })
});

export const viewPageComponentApiRevokeAssociateAllByPageComponentIdAndApiIdList = ((apiIdList, viewPageComponentId) => {
  return request({
    url: `${preUrlPath}/revoke_associate_all_by_view_page_component_id_and_api_id_list`,
    method: 'post',
    data: {'apiIdList[]': apiIdList, 'viewPageComponentId': viewPageComponentId}
  })
});
