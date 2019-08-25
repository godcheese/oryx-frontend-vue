<template>
  <a-layout>
    <SideMenu :siderTheme="siderTheme" :sideMenuData="sideMenuData" :collapsed="collapsed" :collapsible="true" :appTitle="appTitle"/>
    <a-layout :style="{ paddingLeft: paddingLeft }">
      <BasicHeader :collapsed="collapsed" @toggleCollapsed="toggleCollapsed" :headerTheme="headerTheme" :appTitle="appTitle" :currentUser="currentUser"/>
      <a-layout-content :style="{minHeight: minHeight, margin: '14px 14px 0', padding: 0}">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="padding: 0">
        <BasicFooter />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<!---->
<script>
  import BasicHeader from '../components/BasicHeader.vue'
  import SideMenu from '../components/SideMenu.vue'
  import BasicFooter from '../components/BasicFooter.vue'

  const minHeight = window.innerHeight - 64 - 24 - 122;
  export default {
    name: 'BasicLayout',
    components: { BasicHeader, BasicFooter, SideMenu },
    data() {
      return {
        minHeight: minHeight + 'px',
        collapsed: false,
      }
    },
    created() {
      // this.getSideMenu()
    },
    computed: {
      paddingLeft () {
        return `${this.siderOpened ? 256 : 80}px`
        // return this.fixedSider ? `${this.siderOpened ? 256 : 80}px` : '0'
      },
      sideMenuData(){
        return this.$store.state.user.currentUser.sideMenu
      },
      currentUser() {
        return this.$store.state.user.currentUser;
      },
      siderOpened() {
        return !this.collapsed
      },
      headerTheme() {
        return process.env.VUE_APP_ANTD.HEADER_THEME
      },
      siderTheme() {
        return process.env.VUE_APP_ANTD.SIDER_THEME
      },
      appTitle() {
        return process.env.VUE_APP_APP.TITLE
      },
    },
    methods: {
      // getSideMenu() {
      //   this.$store.dispatch('user/getSideMenu').then(() => {
      //   }).catch((error) => {
      //     console.log(error)
      //   })
      // },
      toggleCollapsed() {
        this.collapsed = !this.collapsed
      },
    },
  }
</script>

<style lang="less" scoped>
  /*.setting{*/
  /*  background-color: #1890ff;*/
  /*  color: #fff;*/
  /*  border-radius: 5px 0 0 5px;*/
  /*  line-height: 40px;*/
  /*  font-size: 22px;*/
  /*  width: 40px;*/
  /*  height: 40px;*/
  /*  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);*/
  /*}*/
</style>

<style>

  /*#components-layout-demo-custom-trigger .trigger {*/
  /*  font-size: 18px;*/
  /*  line-height: 64px;*/
  /*  padding: 0 24px;*/
  /*  cursor: pointer;*/
  /*  transition: color .3s;*/
  /*}*/

  /*#components-layout-demo-custom-trigger .trigger:hover {*/
  /*  color: #1890ff;*/
  /*}*/

  /*#components-layout-demo-custom-trigger .logo {*/
  /*  height: 32px;*/
  /*  background: rgba(255,255,255,.2);*/
  /*  margin: 16px;*/
  /*}*/

  /*#components-layout-demo-fixed-sider .logo {*/
  /*  height: 32px;*/
  /*  background: rgba(255,255,255,.2);*/
  /*  margin: 16px;*/
  /*}*/

</style>

