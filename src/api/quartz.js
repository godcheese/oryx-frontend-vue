import request from "./index.js"

const preUrlPath = '/api/quartz';

export const jobGetOneByJobClassNameAndJobGroup = ((jobClassName, jobGroup) => {
  return request({
    url: `${preUrlPath}/job/one?jobClassName=${jobClassName}&jobGroup=${jobGroup}`,
    method: 'get',
  })
});

export const jobSaveOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/job/save_one`,
    data: params,
    method: 'post',
  })
});

export const jobAddOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/job/add_one`,
    method: 'post',
    data: params
  })
});

export const jobDeleteAll = ((params = {}) => {
  return request({
    url: `${preUrlPath}/job/delete_all`,
    method: 'post',
    data: {'id[]': params}
  })
});

export const jobPauseAll = ( (jobClassNameList, jobGroupList) => {
  return request({
    url: `${preUrlPath}/job/pause_all`,
    data: {
      jobClassNameList: jobClassNameList,
      jobGroupList: jobGroupList
    },
    method: 'post'
  })
});

export const jobResumeAll = ( (jobClassNameList, jobGroupList) => {
  return request({
    url: `${preUrlPath}/job/resume_all`,
    data: {
      jobClassNameList: jobClassNameList,
      jobGroupList: jobGroupList
    },
    method: 'post'
  })
});

export const jobPageAll = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/job/page_all`,
    data: params,
    method: 'get'
  })
});

export const jobRuntimeLogPageAll = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/job_runtime_log/page_all`,
    data: params,
    method: 'get'
  })
});

export const jobRuntimeLogGetOneByJobRuntimeLogId = ((id) => {
  return request({
    url: `${preUrlPath}/job_runtime_log/one/${id}`,
    method: 'get',
  })
});

export const jobRuntimeLogClearAll = (() => {
  return request({
    url: `${preUrlPath}/job_runtime_log/clear_all`,
    method: 'post',
  })
});
