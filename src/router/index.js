import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import {getAccessToken} from "../common/token.js";
import {viewMenuListAllAntdViewMenuByCurrentUser} from "../api/viewMenu.js";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
});

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

router.addRoutes(initRoutes)

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
]

const whiteList = ['/user/login']

router.beforeEach((to, from, next) => {
  if(to.meta.title || to.name) {
    let routeName = to.meta.title || to.name;
    window.document.title = (routeName ? routeName + ' - ' : '') + 'Nimrod Frontend';
  } else {
    window.document.title = 'Nimrod Frontend'
  }
  if (getAccessToken()) {
    if (to.path === '/user/login') {
      next({path: '/'})
    } else {
      if(!store.state.user.currentUser.loggedIn) {
        store.dispatch('user/getCurrentUser').then((data) => {
          loadMenu(next, to)
        }).catch((error) => {
          console.log(error)
          store.dispatch('user/logout').then(() => {
            // 为了重新实例化vue-router对象 避免bug
            location.reload()
          })
        })
      } else {
        next()
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
]

export const loadMenu = ((next, to) => {
  viewMenuListAllAntdViewMenuByCurrentUser().then((data) => {
    let menuList = []
    const forEachMenu = (menu, menuList) => {
      let i = 0
      if(menu) {
        for (i in menu) {
          if (menu.hasOwnProperty(i)) {
            let m = {meta: {}}
            if (!menu[i].isCategory) {
              m.path = menu[i].url
              m.name = menu[i].name
              m.component = loadComponent(m.path)
              m.meta.title = menu[i].name
              menuList.push(m)
            }
          }
          if (menu[i].children && menu[i].children.length > 0) {
            let children = menu[i].children
            forEachMenu(children, menuList)
          }
        }
      }
    }
    forEachMenu(data, menuList)

    // 对比和添加来自菜单的动态路由
    if(tempRoutes[0].children.length <= 1 ) {
      tempRoutes[0].children = tempRoutes[0].children.concat(menuList)
      tempRoutes[0].children = tempRoutes[0].children.concat(errorRoutes)
      router.addRoutes(tempRoutes)
    }
    next({...to, replace: true})
  }).catch((error) => {
    console.log(error)
    store.dispatch('user/logout').then(() => {
      // 为了重新实例化vue-router对象 避免bug
      location.reload()
    })
  })
})

/**
 * 通过路由懒加载组件
 * @param route
 * @returns {function(): (Promise<*>|*)}
 */
export const loadComponent = (route) => {
  console.log(route);
  let sp = route.split('/');
  let str1 = sp[sp.length-1]

  if(str1.indexOf('_')) {
    let str1Arr = str1.split('_')
    let i
    for(i in str1Arr) {
      if (str1Arr.hasOwnProperty(i)) {
        str1Arr[i] = str1Arr[i].slice(0, 1).toUpperCase() + str1Arr[i].slice(1)
      }
    }
    str1 = str1Arr.join('')
  }
  sp[sp.length-1] = str1
  route = sp.join('/');

  return () => import(`../pages${route}`)
}

export default router;
