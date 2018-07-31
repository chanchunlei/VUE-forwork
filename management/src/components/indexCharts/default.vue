<template>
   <div id="default">
      <hotShops></hotShops>
   </div>
</template>

<script>
  import hotShops from './hotShops.vue'
    export default {
        name: "default",
      components:{
        "hotShops": hotShops
      }
    }
</script>

<style scoped>
   #default{
     width: 100%;
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     justify-content: space-around;
   }
</style>
