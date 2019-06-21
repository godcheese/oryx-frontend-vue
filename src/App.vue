<template>
  <a-locale-provider :locale="locale">
  <div id="app">
    <router-view/>
  </div>
  </a-locale-provider>
</template>

<script>
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import moment from 'moment';
  import 'moment/locale/zh-cn';

  moment.locale('zh_cn')

  export default {
    name: 'App',
    data() {
      return {
        locale: zhCN,
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
    padding:0;
    margin:0;
  }
</style>
