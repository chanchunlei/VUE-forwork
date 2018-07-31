<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import './common/css/base.css'  //引入base
  import './common/css/animate.css'  //引入动画
export default {
  name: 'App'
}
</script>

<style>
html{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
body{
  margin: 0;
  padding: 0;
  font-size: 14px;
  width: 100%;
  height: 100%;
  font-family: "PingFang SC";
  background: #f2f2f2;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
