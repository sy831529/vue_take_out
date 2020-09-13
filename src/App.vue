<template>
  <div id="app">
    <!--  此处显示 path: '/' 的页面，也就是index.vue  -->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {

  };
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  html,body,#app{
    height: 98.7%;
  }
</style>
