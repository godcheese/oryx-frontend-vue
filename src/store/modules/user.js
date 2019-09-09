import {getCurrentUser, login} from "../../api/user.js";
import {getToken, removeToken, setToken} from "../../common/token.js";
import request from "../../api";

const user = {
  namespaced: true,
  state: {
    token: getToken(),
    currentUser: {
      loggedIn: false,
      username: '',
      email: '',
      avatar: '',
      authority: [],
      department: [],
      sideMenu: [],
    },
    systemAdminRole: ['SYSTEM_ADMIN'],
    rolePrefix: ['ROLE_']
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_LOGGED_IN: (state, loggedIn) => {
      state.currentUser.loggedIn = loggedIn
    },
    SET_SIDE_MENU: (state, sideMenu) => {
      state.currentUser.sideMenu = sideMenu;
    },
    SET_USERNAME: (state, username) => {
      state.currentUser.username = username
    },
    SET_EMAIL: (state, email) => {
      state.currentUser.email = email
    },
    SET_AVATAR: (state, avatar) => {
      state.currentUser.avatar = avatar
    },
    SET_AUTHORITY: (state, authority) => {
      state.currentUser.authority = authority
    },
    SET_DEPARTMENT: (state, department) => {
      state.currentUser.department = department
    },
  },
  actions: {
    logout({commit}) {
      return new Promise((resolve, reject) => {
        // logout().then((response) => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve()
        // }).catch((error) => {
        //   reject(error)
        })
    },
    /**
     * 获取当前用户资料，包括判断当前用户登录
     * @param commit
     * @returns {Promise<any>}
     */
    getCurrentUser({commit}) {
      return new Promise((resolve, reject) => {
        getCurrentUser().then((data) => {
          commit('SET_LOGGED_IN', true);
          commit('SET_SIDE_MENU', data.sideMenu);
          commit('SET_USERNAME', data.username);
          commit('SET_AVATAR', data.avatar);
          commit('SET_EMAIL', data.email);
          commit('SET_AUTHORITY', data.authority);
          commit('SET_DEPARTMENT', data.department);
          resolve(data)
        }).catch((e) => {
          console.log(e);
          reject(e)
        })
      })
    },
    setLoggedIn({commit}, loggedIn) {
      commit('SET_LOGGED_IN', loggedIn);
    }
  }
};

export default user
