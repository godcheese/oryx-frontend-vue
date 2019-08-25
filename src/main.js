import Vue from 'vue'
import App from './App.vue'

import router from './router/index.js'
import store from './store/index.js'
import './common/index.js'
import './common/registerDirective.js'

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// mavon editor markdown editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(Antd);
Vue.use(mavonEditor);

Vue.config.productionTip = false;

Vue.config.devtools = true;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
