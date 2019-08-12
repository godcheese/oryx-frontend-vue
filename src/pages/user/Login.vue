<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <img alt="logo" class="logo" src="../../../static/img/oryx_banner.png" />
          <!--          <span class="title">{{systemName}}</span>-->
        </div>
        <div class="description">
          Oryx 是一款基于 Spring Boot 封装前后端分离 Java Web 平台快速开发脚手架，所采用的技术栈包括 Spring Boot、Spring、Spring MVC、MyBatis、Vue 等，遵守[阿里巴巴 Java 开发规约](https://github.com/alibaba/p3c)，帮助养成良好的编码习惯。整体采用 RBAC （ Role-Based Access Control ，基于角色的访问控制），具有严格的权限控制模块，支持系统与模块分离开发。最后希望这个项目能够对你有所帮助。</div>
      </div>
      <div class="login">
        <a-form :form="form" @submit="onSubmit">

          <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
            <a-tab-pane tab="用户登录" key="1">
              <a-alert type="error" :closable="true" v-show="errorMessage" :message="errorMessage" showIcon style="margin-bottom: 24px;" />
              <a-form-item>
                <a-input size="large" placeholder="用户名/电子邮箱/手机号码" v-decorator="['username',{rules: [{ required: true, message: '请输入用户名/电子邮箱/手机号码', whitespace: true}]}]" :disabled="logging">
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input size="large" placeholder="密码" type="password" v-decorator="['password',{rules: [{ required: true, message: '请输入密码', whitespace: true}]}]" :disabled="logging">
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>
            </a-tab-pane>
          </a-tabs>
          <a-form-item>
            <a-checkbox v-decorator="['rememberMe', {valuePropName: 'checked', initialValue: false}]" :disabled="logging">记住我一周</a-checkbox>
            <a style="float: right">忘了密码？</a>
            <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="footer">
      <div class="links">
        <a target="_blank" :key="index" :href="item.link ? item.link : 'javascript: void(0)'" v-for="(item, index) in linkList">
          <a-icon v-if="item.icon" :type="item.icon"/>{{item.name}}
        </a>
      </div>
      <div class="copyright">
        {{copyright}}
      </div>
    </div>
  </div>
</template>

<script>
  // import GlobalFooter from '../../layouts/GlobalFooter'
  // import Cookies from 'js-cookie'
  // import request from '../../api/index.js';
  export default {
    name: 'Login',
    data () {
      return {
        logging: false,
        errorMessage: '',
        redirect: undefined,
      }
    },
    beforeCreate () {
      this.form = this.$form.createForm(this);
    },
    computed: {
      webName () {
        return process.env.WEB.NAME
      },
      copyright () {
        return '@2019 Oryx'
      },
      linkList() {
        return [
          {link: 'https://github.com/godcheese/oryx-frontend-vue', name: '此项目前端开源地址'},
          {link: 'https://github.com/godcheese/oryx', name: '此项目后端开源地址'},
          {link: 'https://godcheese.com', name: '作者博客'},
        ]
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      onSubmit (e) {
        e.preventDefault();
        this.form.validateFieldsAndScroll((error, values) => {
          if (!error) {
            this.logging = true
            this.$store.dispatch('user/login', values).then((data) => {
              this.$router.push({path: this.redirect || '/'})
              this.logging = false
              }).catch((error) => {
              console.log(error)
              this.logging = false
            })
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background: #f0f2f5 url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center 110px;
    background-size: 100%;
    .content {
      padding: 32px 0;
      flex: 1;
      @media (min-width: 768px){
        padding: 60px 0 24px;
      }
      .top {
        text-align: center;
        .header {
          height: 44px;
          line-height: 44px;
          a {
            text-decoration: none;
          }
          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
          }
          .title {
            font-size: 33px;
            color: rgba(0,0,0,.85);
            font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .description {
          font-size: 14px;
          color: rgba(0,0,0,.45);
          margin:12px 0;
          padding:0 350px;
        }
      }
      .login{
        width: 368px;
        margin: 0 auto;
        @media screen and (max-width: 576px) {
          width: 95%;
        }
        @media screen and (max-width: 320px) {
          .captcha-button{
            font-size: 14px;
          }
        }
        .icon {
          font-size: 24px;
          color: rgba(0, 0, 0, 0.2);
          margin-left: 16px;
          vertical-align: middle;
          cursor: pointer;
          transition: color 0.3s;
          &:hover {
            color: #1890ff;
          }
        }
      }
    }
  }

  .footer{
    padding: 0 16px;
    margin: 20px 0 24px;
    text-align: center;
    .copyright{
      color: rgba(0,0,0,.45);
      font-size: 14px;
    }
    .links{
      margin-bottom: 8px;
      a:not(:last-child) {
        margin-right: 40px;
      }
      a{
        color: rgba(0,0,0,.45);
        -webkit-transition: all .3s;
        transition: all .3s;
      }
    }
  }
</style>
