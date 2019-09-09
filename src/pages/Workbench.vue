<template>
    <BasicPage>
        <div slot="container">
            <a-row>
                <a-col :span="24" style="padding-bottom:0">
                    <a-row :gutter="16">
                        <a-col :span="8">
                            <a-card title="Card title" :bordered=false>
                                <p>card content</p>
                            </a-card>
                        </a-col>
                        <a-col :span="8">
                            <a-card title="Card title" :bordered=false>
                                <p>card content</p>
                            </a-card>
                        </a-col>
                        <a-col :span="8">
                            <a-card title="Card title" :bordered=false>
                                <p>card content</p>
                            </a-card>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :span="12" style="padding-bottom:0;padding-right:0">
                    <a-card title="Card Title">
                        <a href="#" slot="extra">more</a>
                        <p>card content</p>
                        <p>card content</p>
                        <p>card content</p>
                    </a-card>
                </a-col>
                <a-col :span="12" style="padding-bottom:0">
                    <a-card title="Card Title">
                        <a href="#" slot="extra">more</a>
                        <p>card content</p>
                        <p>card content</p>
                        <p>card content</p>
                    </a-card>
                </a-col>
                <a-col :span="24">
                    <mavon-editor v-model="markdownValue" :toolbars="toolbars" :toolbarsFlag="false" @keydown=""
                                  :editable="false" :subfield="false" :defaultOpen="'preview'"/>
                </a-col>
            </a-row>
        </div>
    </BasicPage>
</template>

<script type="text/jsx">

    import BasicPage from "../components/BasicPage"

    export default {
        name: "Workbench",
        components: {BasicPage},
        data() {
            return {
                markdownValue: `

<p align="center">
  <img width="320" src="https://github.com/godcheese/oryx/blob/master/oryx_banner.png?raw=true">
</p>
<p align="center">
  <a href="https://github.com/godcheese/oryx-backend">
    <img src="https://img.shields.io/github/last-commit/godcheese/oryx-backend.svg" alt="GitHub Last Commit">
  </a>
  <a href="https://github.com/godcheese/oryx-backend/releases">
    <img src="https://img.shields.io/github/release/godcheese/oryx-backend.svg" alt="GitHub release">
  </a>
  <a href="https://travis-ci.org/godcheese/oryx-backend" rel="nofollow">
    <img src="https://travis-ci.org/godcheese/oryx-backend.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://github.com/godcheese/nirmod-backend/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
<!--   <a href="https://gitter.im/repo-name/discuss">
    <img src="https://badges.gitter.im/Join%20Chat.svg" alt="gitter">
  </a> -->
<!--   <a href="https://godcheese.github.io/oryx-backend/donate">
    <img src="https://img.shields.io/badge/%24-donate-ff69b4.svg" alt="donate">
  </a> -->
</p>

## 简介 Introduction
> Oryx 英[ˈnimrɔd] 美[ˈnɪmˌrɑd] n.\t好猎手，猎人;

Oryx 是一款基于 Spring Boot 封装前后端分离 Java Web 平台快速开发脚手架，所采用的技术栈包括 Spring Boot、Spring、Spring MVC、MyBatis、Vue 等，遵守[阿里巴巴 Java 开发规约](https://github.com/alibaba/p3c)，帮助养成良好的编码习惯。整体采用 RBAC （ Role-Based Access Control ，基于角色的访问控制），具有严格的权限控制模块，支持系统与模块分离开发。最后希望这个项目能够对你有所帮助。

- Oryx 开发交流群：[547252502](https://jq.qq.com/?_wv=1027&k=5yxyg73)（QQ 群）
- [后端码云 Gitee](https://gitee.com/godcheese/oryx-backend)
- [前端码云 Gitee](https://gitee.com/godcheese/oryx-frontend-vue)

|环境  |版本|
|:-----|---|
|[Java](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)  |1.8|
|[MySQL](https://dev.mysql.com/downloads/mysql/5.7.html#downloads) |5.7|
|[Maven](http://maven.apache.org/download.cgi) |3.5|
|[Tomcat](https://tomcat.apache.org/download-90.cgi)|9.0|

|依赖            |版本         |
|:------------- |:------------|
|[Spring Boot](http://mvnrepository.com/artifact/org.springframework.boot/spring-boot)    |2.1.4.RELEASE|
|[Spring Web MVC](http://mvnrepository.com/artifact/org.springframework/spring-webmvc)     |5.1.6.RELEASE|
|[Spring Security Web](http://mvnrepository.com/artifact/org.springframework.security/spring-security-web)|5.1.5.RELEASE|
|[MyBatis](http://mvnrepository.com/artifact/org.mybatis/mybatis)        |3.5.1      |
|[Druid](http://mvnrepository.com/artifact/com.alibaba/druid-spring-boot-starter)          |1.1.16       |
|[Vue.js](http://cn.vue.js)      ||

|测试账号     |        |                                       |
|:-----------|:-------|:---------------------|
|Username    |Password|Role & Authority      |
|system_admin|123456  |ROLE_SYSTEM_ADMIN     |
|admin       |123456  |ROLE_ADMIN            |
|user        |123456  |ROLE_USER             |

## 特性 Features

- OAtuh 2.0 ✓
- 数据字典 ✓
- 角色管理 ✓
- 用户管理 ✓
  - 在线用户 ✗
- 权限管理 ✓
  - 视图菜单 ✓
  - 视图页面 ✓
  - 视图页面组件 ✓
  - API ✓
- 消息中间件（ActiveMQ） ✓
- 电子邮件管理 ✓
- 操作日志 ✓
- 文件管理 ✓
- 定时任务 ✓
- 部门管理 ✓
- ~~工作流（Flowable）~~ ✓

## [待开发功能 Todo list](https://github.com/godcheese/oryx-backend/blob/master/todo.md)

## 起步 Getting started

\`\`\`bash
# clone oryx-backend
git clone https://github.com/godcheese/oryx-backend.git && cd oryx-backend

# package
mvn clean package

# develop
mvn spring-boot:run

# clone oryx-frontend-vue
git clone https://github.com/godcheese/oryx-frontend-vue.git && cd oryx-frontend-vue

# install
npm install

# develop
npm run dev

\`\`\`
## [后端开发文档 Documentation](https://github.com/godcheese/oryx-backend/blob/master/docs/getting_started.md)

## [前端开发文档 Documentation](https://github.com/godcheese/oryx-frontend-vue/blob/master/docs/getting_started.md)

## [后端更新日志 Changelog](https://github.com/godcheese/oryx-backend/releases)
## [前端更新日志 Changelog](https://github.com/godcheese/oryx-frontend-vue/releases)

## [在线演示 Online Demo](http://demo.godcheese.com:9090)

登录用户名密码加QQ群547252502获取。

#### 截图 Screenshots

![1.png](https://github.com/godcheese/oryx-backend/blob/master/screenshots/1.png)
![2.png](https://github.com/godcheese/oryx-backend/blob/master/screenshots/2.png)
![3.png](https://github.com/godcheese/oryx-backend/blob/master/screenshots/3.png)
![4.png](https://github.com/godcheese/oryx-backend/blob/master/screenshots/4.png)

## 反馈 Feedback

[后端 Issues](https://github.com/godcheese/oryx-backend/issues)
[前端 Issues](https://github.com/godcheese/oryx-frontend-vue/issues)

## 捐赠 Donation

如果此项目对你有所帮助，不妨请我喝咖啡。
If you find Oryx useful, you can buy us a cup of coffee.

[Paypal Me](https://www.paypal.me/godcheese)

## 浏览器支持 Browsers support

Modern browsers and Internet Explorer 9+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE9, IE10, IE11, Edge| last 15 versions| last 15 versions| last 10 versions


        `,//输入的数据
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    help: true, // 帮助
                    code: true, // code
                    subfield: true, // 是否需要分栏
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    /* 1.3.5 */
                    undo: true, // 上一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true // 导航目录
                }
            }
        }
    }

</script>

<style type="less" scoped>
    .ant-col-24, .ant-col-12 {
        background-color: #ececec;
        padding: 20px;
    }
</style>

<!--<template>-->
<!--  <div>-->
<!--    <div class="title">-->
<!--      &lt;!&ndash;<a-input placeholder="Basic usage"/>&ndash;&gt;-->
<!--    </div>-->
<!--        <h2>Workbench</h2>-->
<!--        &lt;!&ndash;<textarea :value="input" @input="update"></textarea>&ndash;&gt;-->

<!--    <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">-->
<!--    ...-->
<!--    <br />-->
<!--    Really-->
<!--    <br />...<br />...<br />...<br />-->
<!--    long-->
<!--    <br />...<br />...<br />...<br />...<br />...<br />...-->
<!--    <br />...<br />...<br />...<br />...<br />...<br />...-->
<!--    <br />...<br />...<br />...<br />...<br />...<br />...-->
<!--    <br />...<br />...<br />...<br />...<br />...<br />...-->
<!--    <br />...<br />...<br />...<br />...<br />...<br />...-->
<!--    <br />...<br />...<br />...<br />...<br />...<br />...-->
<!--    <br />...<br />...<br />...<br />...<br />...<br />-->
<!--    content-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<style lang="less" scoped>-->
<!--  -->
<!--  /*.edit-state {*/-->
<!--    /*position: absolute;*/-->
<!--    /*top: 50px;*/-->
<!--    /*bottom: 100px;*/-->
<!--    /*display: flex;*/-->
<!--    /*margin: 10px 0 0 0;*/-->
<!--    /*border-radius: 3px;*/-->
<!--    /*width: 100%;*/-->
<!--    /*.markdown {*/-->
<!--      /*flex: 1;*/-->
<!--      /*border: 1px solid rgb(191, 203, 217);*/-->
<!--      /*border-right: none;*/-->
<!--      /*textarea {*/-->
<!--        /*height: 90%;*/-->
<!--        /*width: 100%;*/-->
<!--        /*font-size: 20px;*/-->
<!--        /*outline: none;*/-->
<!--        /*border: none;*/-->
<!--        /*resize: none;*/-->
<!--        /*border-radius: 3px;*/-->
<!--      /*}*/-->
<!--    /*}*/-->
<!--    /*.showState {*/-->
<!--      /*flex: 1;*/-->
<!--      /*border: 1px solid rgb(191, 203, 217);*/-->
<!--      /*background: rgba(191, 203, 217, .1);*/-->
<!--    /*}*/-->
<!--  /*}*/-->
<!--</style>-->
<!--<script>-->
<!--  export default {-->
<!--    name: 'Workbench',-->
<!--  }-->
<!--</script>-->
