import request from "./index.js"

const preUrlPath = '/api/system/dictionary';

export const dictionaryListAllByKey = ((key) => {
  return request({
    url: `${preUrlPath}/list_all_by_key/${key}`,
    method: 'get',
  })
});

export const dictionaryFormatter = ((value, values, callback) => {
  let valueName = undefined;
  function f(v, vs) {
    for (let i = 0; i < vs.length; i++) {
      if ((vs[i].value + '') === (v + '')) {
        return vs[i].valueName
      }
    }
  }
  if (typeof values === 'object') {
    valueName = f(value, values);
    if (!valueName) {
      let defaultValue = f('default', values);
      valueName = f(defaultValue, values)
    }
  }
  if (typeof callback === 'function') {
    valueName = callback(valueName, value, values)
  }
  return valueName
});

export const dictionaryPageAllByDictionaryCategoryIdList = ( (params = {}) => {
  return request({
    url: `${preUrlPath}/page_all_by_dictionary_category_id_list`,
    data: params,
    method: 'get'
  })
});

export const dictionaryGetOneByDictionaryId = ((id) => {
  return request({
    url: `${preUrlPath}/one/${id}`,
    method: 'get',
  })
});

export const dictionaryAddOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/add_one`,
    method: 'post',
    data: params
  })
});

export const dictionarySaveOne = ((params = {}) => {
  return request({
    url: `${preUrlPath}/save_one`,
    method: 'post',
    data: params
  })
});

export const dictionaryDeleteAll = ((params = {}) => {
  return request({
    url: `${preUrlPath}/delete_all`,
    method: 'post',
    data: {'id[]': params}
  })
});

export const dictionarySyncToMemory = (() => {
  return request({
    url: `${preUrlPath}/sync_to_memory`,
    method: 'post',
  })
});
