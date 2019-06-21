<template>
  <BasicPage>
    <div slot="container">
      <Iframe :src="src"/>
  </div>
  </BasicPage>
</template>

<script>
  import BasicPage from '../components/BasicPage.vue'
  import Iframe from '../components/Iframe.vue'
  export default {
    name: "Druid",
    components: {BasicPage, Iframe },
    data() {
      return {
        src: process.env.BACKEND_URL + '/druid/index.html'
      }
    }
  }
</script>
