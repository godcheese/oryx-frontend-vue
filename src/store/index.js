import Vue from 'vue'
import Vuex from 'vuex'
import user from '../store/modules/user.js'
import antd from '../store/modules/antd.js'
import jwt from '../store/modules/jwt.js'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user, antd, jwt
  }
})
