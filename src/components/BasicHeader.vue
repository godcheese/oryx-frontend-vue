<template>
  <a-layout-header :class="[headerTheme, 'basic-header']">
    <div :class="['basic-header-wide']">
      <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleCollapsed"/>
      <div :class="['basic-header-right', headerTheme]">
        <!--        <header-search class="header-item" />-->
        <!--        <a-tooltip class="header-item" title="帮助文档" placement="bottom" >-->
        <!--          <a>-->
        <!--            <a-icon type="question-circle-o" />-->
        <!--          </a>-->
        <!--        </a-tooltip>-->
        <!--        <header-notice class="header-item"/>-->
        <HeaderAvatar class="header-item" :currentUser="currentUser"/>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
    import HeaderAvatar from '../components/HeaderAvatar.vue'

    export default {
    name: 'BasicHeader',
    components: { HeaderAvatar },
    props: {
      collapsed: {
        type: Boolean
      },
      appTitle: {
        type: String
      },
      headerTheme: {
        type: String
      },
      currentUser: {
        type: Object
      }
    },
    methods: {
      toggleCollapsed () {
        this.$emit('toggleCollapsed')
      },
    },
  }
</script>

<style lang="less" scoped>
  .trigger {
    font-size: 20px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
    &:hover{
      color: #1890ff;
    }
  }
  .header-item{
    padding: 0 12px;
    display: inline-block;
    height: 100%;
    cursor: pointer;
    vertical-align: middle;
    i{
      font-size: 16px;
      color: rgba(0,0,0,.65);
    }
  }
  .basic-header{
    padding: 0 12px 0 0;
    -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    position: relative;
    &.light{
      background: #fff;
    }
    &.dark{
      background: #001529;
    }
    .basic-header-wide{
      &.head{
        /*max-width: 1400px;*/
        /*margin: auto;*/
      }
      /*&.side{*/
      /*}*/
      .logo {
        height: 64px;
        line-height: 58px;
        vertical-align: top;
        display: inline-block;
        padding: 0 12px 0 24px;
        cursor: pointer;
        font-size: 20px;
        &.pc{
          padding: 0 12px 0 0;
        }
        img {
          display: inline-block;
          vertical-align: middle;
        }
        h1{
          display: inline-block;
          font-size: 16px;
        }
        &.dark h1{
          color: #fff;
        }
      }
      .basic-header-menu{
        display: inline-block;
      }
      .basic-header-right{
        float: right;
        &.dark{
          color: #fff;
          i{
            color: #fff;
          }
        }
      }
    }
  }
</style>
