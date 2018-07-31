<template>
  <div id="Home">
     <v-Head></v-Head>
     <v-Menu></v-Menu>
     <div class="content-box" :class="{'content-collapse':collapse}">
         <v-Tag></v-Tag>
         <transition name="move" mode="out-in">
             <keep-alive>
                 <router-view></router-view>
             </keep-alive>
         </transition>
     </div>
  </div>
</template>

<script>
    import vHead from '../components/top.vue'
    import vMenu from '../components/menu.vue'
    import vTag from '../components/tags.vue'
    import bus from '../components/bus.js'
    export default {
        name: "index",
        data(){
          return{
            collapse: false
          }
        },
        components:{
          "v-Head": vHead,
          "v-Menu": vMenu,
          "v-Tag": vTag
        },
      created(){
          bus.$on('collapse',msg => {
            this.collapse = msg
          })
        }
    }
</script>

<style scoped>
   #Home{
     width: 100%;
     height: 100%;
     position: relative;
   }
  .content-box{
    width: calc(100% - 251px);
    position: absolute;
    top: 70px;
    left: 251px;
    height: calc(100% - 70px);
    overflow-y: scroll;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
  }
  .content-collapse{
    left: 65px;
    width: calc(100% - 65px);
  }
</style>

