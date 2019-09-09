import {getToken, setToken} from "../../common/token.js";
import request from "../../api/index.js";
import Cookies from 'js-cookie'

const preUrlPath = '/api/jwt';

const refreshTokenKey = process.env.VUE_APP_REFRESH_TOKEN.KEY;


export const getRefreshToken = (() => {
  return Cookies.get(refreshTokenKey) === 'true';
});

export const setRefreshToken = ((refreshToken) => {
  return Cookies.set(refreshTokenKey, Boolean(refreshToken), {expires: parseInt(process.env.VUE_APP_TOKEN.EXPIRES)})
});

const jwt = {
  namespaced: true,
  state: {
    token: getToken(),
    refreshToken: getRefreshToken(),
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_REFRESH_TOKEN: (state, refreshToken) => {
      state.refreshToken = refreshToken;
    }
  },
  actions: {
    generateToken({commit}, user) {
      let username = user.username;
      let password = user.password;
      let rememberMe = user.rememberMe;
      return new Promise((resolve, reject) => {
        return request({
          url: `${preUrlPath}/generate_token`,
          method: 'post',
          data: {
            'username': username,
            'password': password,
          }
        }).then((data) => {
          setToken(data.token, rememberMe);
          commit('SET_TOKEN', data.token);
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    refreshToken({commit}) {
      return new Promise((resolve, reject) => {
        return request({
          url: `${preUrlPath}/refresh_token`,
          method: 'post',
        }).then((data) => {
          setToken(data.token);
          commit('SET_TOKEN', data.token);
          commit('SET_REFRESH_TOKEN', false);
          setRefreshToken(false);
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    setRefreshToken({commit}, refreshToken) {
      commit('SET_REFRESH_TOKEN', refreshToken);
      setRefreshToken(refreshToken);
    }
  }
};

export default jwt
