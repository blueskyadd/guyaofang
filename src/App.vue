<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    provide () {
      return {
        reload: this.reload
      }
    },
    data () {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>

<style>
  #app {
    width: 100%;
    height:100%;
  }
  .el-icon-error{
    font-size: 20px !important;
  }
  .el-message-error{
    min-width: 1rem !important;
  }
  .el-message--warning,.el-message--success{
    min-width: 2rem !important;

  }
  .el-icon-warning{
    font-size: .2rem!important;
  }
  .el-icon-success{
     font-size: .2rem!important;
  }
  .el-message{
    min-width:2rem;
  }
</style>