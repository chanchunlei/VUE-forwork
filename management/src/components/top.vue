<template>
  <div id="top">
    <div class="logo">
      <img src="../assets/logo.png" alt="">
      会员管理系统
    </div>
    <ul class="menus">
      <li v-for="(item, index) in list"><router-link class="run" v-bind:to="item.path" :key="index" replace active-class>{{ item.title }}</router-link</li>
      <li class="admin_logo">
        <p>
          <img src="../assets/logo.png" alt="">
        </p>
        <el-dropdown class="user_name">
          <span class="el-dropdown-link">
            {{this.$store.state.userName}}<i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>

<script>
    import api from '../api/api.js'
    export default {
        name: "top",
      data() {
          return {
            activeIndex: '1',
            list: [
              {
                path:'/default',
                title: '报表',
              },
              {
                path: '/set',
                title: '设置',
              },

            ]
          }
      },
      created:function(){
        this.changeRoute(this.$route);
      },
      methods:{
        changeRoute:function(Route){//改变路由
          const nowPath = Route.path;
          this.$store.commit('NAV_SHOW',nowPath);
        },
        logout:function(){//登出
          this.$store.commit('LOGOUT');
        }
      },
      watch:{
          $route(newRoute,oldRoute){//监听路由改变
            this.changeRoute(newRoute);
          }
      }

    }
</script>

<style scoped>
  #top{
    width: 100%;
    padding: 0 5%;
    box-sizing: border-box;
    height: 70px;
    line-height: 70px;
    background-color: #4BA2FC;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    position: absolute;
    top: 0;
    left: 0;
  }
  .logo{
    margin: 0 20px;
  }
  .logo>img{
    width: 50px;
    height: 50px;
  }
 .menus{
   list-style-type: none;
   overflow: hidden;
 }
  .menus>li{
    display: block;
    float: left;
    padding: 0 15px;
    cursor: pointer;
  }
  .menus>.admin_logo{
    cursor: auto;
  }
  .admin_logo>p{
    height: 70px;
    margin: 0 10px;
    float: left;
  }
  .admin_logo>p>img{
    width: 50px;
    height: 50px;
    border-radius: 50% 50%;
  }
  .user_name{
    float: left;
    height: 50px;
    cursor: pointer;
  }
  .el-dropdown-link,.run{
    color: #fff;
  }
  .run:hover,.router-link-exact-active{
    color: #e2e2e2;
  }
</style>
