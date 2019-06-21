import Vue from 'vue'

const hasAnyAuthority = {
  install(Vue) {
    Vue.directive('hasAnyAuthority', {
      bind(el, binding, vnode) {
        const authority = vnode.context.$store.state.user.currentUser.authority
        const value = binding.value || []
        let display = false
        value.map((v) => {
          if(authority.includes(v.toUpperCase())) {
            display = true
          }
        })
        const systemAdminRole = vnode.context.$store.state.user.systemAdminRole
        const rolePrefix = vnode.context.$store.state.user.rolePrefix
        systemAdminRole.map((v) => {
          if(authority.includes(rolePrefix + v.toUpperCase())) {
            display = true
          }
        })
        if (!display) {
          if (!el.parentNode) {
            el.style.display = 'none'
          } else {
            el.parentNode.removeChild(el)
          }
        }
      }
    })
  }
}

const hasAuthority = {
  install(Vue) {
    Vue.directive('hasAuthority', {
      bind(el, binding, vnode) {
        let authority = vnode.context.$store.state.user.currentUser.authority
        let value = binding.value || ''
        let display = false
        if(authority.includes(value.toUpperCase())) {
          display = true
        }
        const systemAdminRole = vnode.context.$store.state.user.systemAdminRole
        const rolePrefix = vnode.context.$store.state.user.rolePrefix
        systemAdminRole.map((v) => {
          if(authority.includes(rolePrefix + v.toUpperCase())) {
            display = true
          }
        })
        if (!display) {
          if (!el.parentNode) {
            el.style.display = 'none'
          } else {
            el.parentNode.removeChild(el)
          }
        }
      }
    })
  }
}

// const hasRole = {
//   install(Vue) {
//     Vue.directive('hasRole', {
//       bind(el, binding, vnode) {
//         let authority = vnode.context.$store.state.user.currentUser.authority
//         let value = binding.value || ''
//         let display = false
//
//         let role = []
//         authority.map((au) => {
//           if(au.indexOf('ROLE_') > -1) {
//             role.push(au)
//           }
//         })
//
//           if(role.includes('ROLE_' + value.toUpperCase())) {
//             display = true
//           }
//
//         if (!display) {
//           if (!el.parentNode) {
//             el.style.display = 'none'
//           } else {
//             el.parentNode.removeChild(el)
//           }
//         }
//
//       }
//     })
//   }
// }

const plugins = [
  hasAnyAuthority,
  hasAuthority
]

/**
 * 注册自定义指令
 */
plugins.map((plugin) => {
  Vue.use(plugin)
})

export default Vue
