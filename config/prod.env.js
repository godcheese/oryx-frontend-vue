'use strict'
module.exports = {
  NODE_ENV: '"production"',

  VERSION: '"0.1.0"',

  WEB: {
    NAME: '"Nimrod"',
    HEADER_THEME: '"light"',
    SIDER_THEME: '"dark"',
  },

  /**
   * 后端接口地址
   */
  BACKEND_URL: '"http://127.0.0.1:8083/nimrodbackend"', // http://127.0.0.1:8083/nimrodbackend

  /**
   * OAuth 2.0 接口配置信息
   */
  OAUTH2: {
    GRANT_TYPE: '"password"',
    CLIENT_ID: '"web_client"',
    CLIENT_SECRET: '"123456"',
  },

  /**
   * access token cookie
   */
  ACCESS_TOKEN: {
    KEY: '"NIMROD_TOKEN"',
    /**
     * access token cookie 过期时间此处默认1，表示为1天后过期
     */
    EXPIRES: 1,
  },

  /**
   * axios 配置信息
   */
  AXIOS: {
    /**
     * 请求超时时间 30000ms=30s
     */
    REQUEST_TIMEOUT: 30000
  },

}
