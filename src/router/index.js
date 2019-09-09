import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'
import {getToken} from "../common/token.js"
import {basicNotification} from '../common/index.js'
import axios from "axios";

Vue.use(Router);

const appTitle = process.env.VUE_APP_APP.TITLE;

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
});

/**
 * 初始化路由
 * @type {{path: string, component: (function(): (Promise<*>|*)), meta: {title: string}, name: string}[]}
 */
let initRoutes = [
  {
    path: '/user/login',
    name: 'Login',
    component: () => import('../pages/user/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  // {
  //   path: '/user/logout',
  //   name: 'Logout',
  //   redirect: '/user/login'
  // },
];

/**
 * 临时路由，可变，所以定义成变量
 * @type {{redirect: string, path: string, component: (function(): (Promise<*>|*)), children: {path: string, component: (function(): (Promise<*>|*)), meta: {title: string}, name: string}[], meta: {title: string}, name: string}[]}
 */
let tempRoutes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../components/BasicLayout.vue'),
    redirect: '/system/workbench',
    meta: { title: '首页' },
    children: [
      {
        path: '/system/workbench',
        name: 'Workbench',
        component: () => import('../pages/Workbench.vue'),
        meta: {
          title:'工作台'
        }
      }
    ]
  }
];

/**
 * 错误路由，页面发生错误时跳转的路由
 * @type {*[]}
 */
const errorRoutes = [
  {
    path:'/error/404',
    name:'NotFound',
    component: () => import('../pages/error/NotFound.vue'),
    meta: {
      title:'404 Not Found',
    }
  },
  {
    path:'/error/500',
    name:'InternalServerError',
    component: () => import('../pages/error/InternalServerError.vue'),
    meta: {
      title:'500 Internal Server Error',
    }
  },
  // {
  //   path:'*',
  //   name:'NotFound',
  //   redirect: '/error/404'
  // }
];

/**
 * 装载初始化路由
 */
router.addRoutes(initRoutes);

/**
 * 免登录白名单路由
 * @type {string[]}
 */
const whiteList = ['/user/login'];

router.beforeEach((to, from, next) => {
  if(to.meta.title || to.name) {
    let routeName = to.meta.title || to.name;
    window.document.title = (routeName ? routeName + ' - ' : '') + appTitle;
  } else {
    window.document.title = appTitle
  }
  if (getToken()) {
    if (to.path === '/user/login') {
      next({path: '/'})
    } else {
      if(!store.state.user.currentUser.loggedIn) {
        // 判断是否需要刷新 token
        if(store.state.jwt.refreshToken) {
          store.dispatch('jwt/refreshToken').then((data) => {
            console.log(data);
            store.dispatch('user/getCurrentUser').then(() => {
              loadMenu(next, to)
            }).catch((e) => {
              console.log(e);
              // basicNotification.error({message: '' + e});
              // 此处不建议直接登出重载
              store.dispatch('user/logout').then(() => {
                // 为了重新实例化vue-router对象 避免bug
                window.location.reload()
              })
            })

          }).catch((e) => {
            console.log(e);
          });
        } else {
          store.dispatch('user/getCurrentUser').then(() => {
            loadMenu(next, to)
          }).catch((e) => {
            console.log(e);
            // basicNotification.error({message: '' + e});
            // 此处不建议直接登出重载
            store.dispatch('user/logout').then(() => {
              // 为了重新实例化vue-router对象 避免bug
              window.location.reload()
            })
          })
        }

      } else {


        next();
      }
    }
  } else {
    // 没有 access token
    // 在免登录白名单（如：登录页），直接进入
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 否则全部重定向到登录页
      next(`/user/login?redirect=${to.path}`)
    }
  }

});

/**
 * 遍历菜单成 Vue 路由可添加的菜单
 * @param menu 远程获取的动态菜单
 * @param menuList 遍历完成后取出的菜单 list
 */
const forEachMenuAsVueRoute = (menu, menuList) => {
  let index = 0;
  if(menu) {
    for (index in menu) {
      if (menu.hasOwnProperty(index)) {
        let tempMenu = {meta: {}};
        if (!menu[index].isCategory) {
          tempMenu.path = menu[index].url;
          tempMenu.name = menu[index].name;
          tempMenu.component = loadComponent(tempMenu.path);
          tempMenu.meta.title = menu[index].name;
          menuList.push(tempMenu)
        }
        if (menu[index].children && menu[index].children.length > 0) {
          let children = menu[index].children;
          forEachMenuAsVueRoute(children, menuList)
        }
      }
    }
  }
};

/**
 * 装载菜单
 * @type {Function}
 */
export const loadMenu = ((next, to) => {
  const sideMenu = store.state.user.currentUser.sideMenu;
  if(sideMenu) {
    let menuList = [];
    forEachMenuAsVueRoute(sideMenu, menuList);

    // 对比和添加来自菜单的动态路由
    if(tempRoutes[0].children.length <= 1 ) {
      tempRoutes[0].children = tempRoutes[0].children.concat(menuList);
      tempRoutes[0].children = tempRoutes[0].children.concat(errorRoutes);
      router.addRoutes(tempRoutes);
    }
    next({...to, replace: true})
  } else {
    // 未加载到菜单即登出重载
    store.dispatch('user/logout').then(() => {
      // 为了重新实例化vue-router对象 避免bug
      location.reload()
    })
  }

});

/**
 * 通过路由懒加载组件
 * @param route
 * @returns {function(): (Promise<*>|*)}
 */
export const loadComponent = (route) => {
  let sp = route.split('/');
  let str1 = sp[sp.length-1];
  if(str1.indexOf('_')) {
    let str1Arr = str1.split('_');
    for(let i in str1Arr) {
      if (str1Arr.hasOwnProperty(i)) {
        str1Arr[i] = str1Arr[i].slice(0, 1).toUpperCase() + str1Arr[i].slice(1)
      }
    }
    str1 = str1Arr.join('')
  }
  sp[sp.length-1] = str1;
  route = sp.join('/');

  return () => import(`../pages${route}`)
};

export default router;
