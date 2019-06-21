<template>
  <div class="basic-page">
    <a-tabs defaultActiveKey="1">
      <a-tab-pane :tab="title" key="1">
        <div class="page-container">
          <a-card :bordered="false">
            <slot name="container"></slot>
          </a-card>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
  export default {
    name: 'BasicPage',
    data() {
      return {
        // height: document.documentElement.clientHeight - 94.5 + 'px;',
        loading: true,
        title: ''
      }
    },
    mounted: function() {
      setTimeout(() => {
        this.loading = false
      }, 230)
      // const that = this
      // window.onresize = function temp() {
      //   that.height = document.documentElement.clientHeight - 94.5 + 'px;'
      // }
      this.$nextTick(()=> {
        this.title = this.$route.meta.title
      })
    },
  }
</script>
<style type="less">
  @import "../../static/less/page.less";
</style>
