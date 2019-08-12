import {getCurrentUser, login} from "../../api/user.js";
import {getAccessToken, removeAccessToken, setAccessToken} from "../../common/token.js";
import {viewMenuListAllAsAntdVueMenuByCurrentUser} from "../../api/viewMenu.js";

const user = {
  namespaced: true,
  state: {
    accessToken: getAccessToken(),
    siderMenu: [],
    currentUser: {
      loggedIn: false,
      username: '',
      email: '',
      avatar: '',
      authority: [],
      department: [],
    },
    systemAdminRole: ['SYSTEM_ADMIN'],
    rolePrefix: ['ROLE_']
  },
  mutations: {
    SET_ACCESS_TOKEN: (state, accessToken) => {
      state.accessToken = accessToken
    },
    SET_SIDER_MENU: (state, siderMenu) => {
      state.siderMenu = siderMenu;
    },
    SET_LOGGED_IN: (state, loggedIn) => {
      state.currentUser.loggedIn = loggedIn
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
    login({commit}, user) {
      let username = user.username;
      let password = user.password;
      let rememberMe = user.rememberMe;
      return new Promise((resolve, reject) => {
        login(username, password).then((data) => {
          setAccessToken(data.access_token, rememberMe);
          commit('SET_ACCESS_TOKEN', data.access_token);
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    logout({commit}) {
      return new Promise((resolve, reject) => {
        // logout().then((response) => {
        commit('SET_ACCESS_TOKEN', '');
        commit('SET_LOGGED_IN', false);
        commit('SET_AUTHORITY', []);
        commit('SET_DEPARTMENT', []);
        removeAccessToken();
        resolve()
        // }).catch((error) => {
        //   reject(error)
        // })
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
          commit('SET_USERNAME', data.username)
          commit('SET_AVATAR', data.avatar)
          commit('SET_EMAIL', data.email)
          commit('SET_AUTHORITY', data.authority)
          commit('SET_DEPARTMENT', data.department)
          commit('SET_LOGGED_IN', true)
          resolve(data)
        }).catch((error) => {
          console.log(error)
          reject(error)
        })
      })
    },
    getSiderMenu({ commit }) {
      return new Promise( (resolve, reject) => {
        if(getAccessToken()) {
          viewMenuListAllAsAntdVueMenuByCurrentUser().then((data) => {
            commit('SET_SIDER_MENU', data)
            resolve(data)
          }).catch((error) => {
            reject(error)
          })
        }
      })
    },
  }
}

export default user
