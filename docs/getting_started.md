
### 安装 Node.js
下载地址：https://nodejs.org/zh-cn/download/（建议安装长期支持版最新版）
### npm 设置淘宝镜像
npm config set registry https://registry.npm.taobao.org
（设置成原镜像 npm config set registry http://registry.npmjs.org）

### 检查是否设置正确
npm config get registry

### 查看已安装的全局依赖包
npm -g list --dept 0

### 下载项目
git clone git@github.com:godcheese/oryx-frontend-vue.git && cd oryx-frontend-vue

### 安装依赖包
npm install

### 开发运行
npm run serve

### 构建项目
npm run build
