<template>
  <a-layout-sider :class="[siderTheme, 'sider', 'fixed-sider', 'shadow']" width="256px" :collapsible="collapsible" v-model="collapsed" :trigger="null">
    <div :class="['logo', siderTheme]">
      <router-link to="/">
        <img src="../../static/img/nimrod_logo.png" >
        <h1>{{webName}}</h1>
      </router-link>
    </div>
    <a-menu key="Menu" mode="inline" :openKeys.sync="openKeys" :theme="siderTheme" :inlineCollapsed="collapsed" @click="onClick">
      <Menu :menuData="siderMenuData"/>
    </a-menu>
  </a-layout-sider>
</template>
<script>
  import Menu from '../components/Menu.vue'

  export default {
    name: "SiderMenu",
    components: { Menu },
    props: {
      collapsible: {
        type: Boolean,
        required: false,
        default: false
      },
      collapsed: {
        type: Boolean,
        required: false,
        default: false
      },
      siderMenuData: {
        type: Array,
        required: true
      },
      siderTheme: {
        type: String,
        required: false,
        default: 'dark'
      },
      webName: {
        type: String,
      },
      isMobile: {
        type:Boolean
      }
    },
    data () {
      return {
        currentPath: [],
        openKeys: [],
        selectedKeys: [],
      }
    },
    computed: {
    },
    methods: {
      onClick (e) {
        console.log('click ', e)
        this.currentPath = e.key
      },
      // handleOpenChange(openKeys) {
      // },
      // collapsedChange(val, oldVal) {
      // },
      // selected({ item, key, selectedKeys }) {
      //   this.selectedKeys = selectedKeys
      //   console.log(item)
      // },
      // onSelect(obj) {
      //   this.$emit('siderMenuSelect', obj)
      // }
    },
    watch: {
      openKeys (val) {
        console.log('openKeys', val)
      },
      currentPath(val) {
        console.log(val);
        this.$router.push(val)
      },
      collapsed(val) {
        console.log('val:' + val)
      }
    },

  }

  // /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
  function urlToList(url) {
    const urllist = url.split("/").filter(i => i);
    return urllist.map((urlItem, index) => {
      return `/${urllist.slice(0, index + 1).join("/")}`;
    });
  }

</script>

<style lang="less" scoped>
  .shadow{
    box-shadow: 2px 0 6px rgba(0,21,41,.35);
  }
  .sider{
    z-index: 10;
    &.light{
      background-color: #fff;
    }
    &.dark{
      background-color: #001529;
    }
    &.fixed-sider{
      position: fixed;
      overflow-y: auto;
      height: 100%;
    }
    .logo{
      height: 64px;
      position: relative;
      line-height: 64px;
      padding-left: 24px;
      -webkit-transition: all .3s;
      transition: all .3s;
      overflow: hidden;
      &.light{
        background-color: #fff;
        h1{
          color: #1890ff;
        }
      }
      &.dark{
        background-color: #002140;
        h1{
          color: #fff;
        }
      }
      h1{
        color: #fff;
        font-size: 20px;
        margin: 0 0 0 12px;
        font-family: "Myriad Pro","Helvetica Neue",Arial,Helvetica,sans-serif;
        font-weight: 600;
        display: inline-block;
        height: 32px;
        line-height: 32px;
        vertical-align: middle;
      }
      img{
        width: 32px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
</style>
