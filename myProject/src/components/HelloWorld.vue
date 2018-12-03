<template>
  <div id="app">
    <app-headers></app-headers>
    <app-user></app-user>
    <app-footers></app-footers>
  </div>
</template>

<script>
  import user from './user.vue'//组件引用
  import Header from './Header.vue'//组件引用
  import Footer from './Footer.vue'//组件引用
  export default {
    name: 'App',
    components:{
      "app-user":user,
      "app-headers":Header,
      "app-footers":Footer
    }
  }
</script>
<style>

</style>
