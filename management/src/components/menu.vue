<template>
   <div id="menus">
     <div @click="collapseChange" class="retract">
        <i class="el-icon-more"></i>
     </div>
     <!--默认导航-->
     <el-menu class="el-menu-vertical-demo" :collapse="this.$store.state.menu" v-if="showName=='default'? true:false">
       <!--1-->
       <el-menu-item index="1">
         <router-link to="/default" active-class>
           <i class="el-icon-menu"></i>
           <span>首页</span>
         </router-link>
       </el-menu-item>
       <!--2-->
       <el-submenu index="2">
         <template slot="title">
           <i class="iconfont icon-huiyuan"></i>
           <span slot="title">会员数据</span>
         </template>
         <el-menu-item-group>
           <el-menu-item index="2-1"><router-link to="/default/member" active-class>会员规模</router-link></el-menu-item>
         </el-menu-item-group>
         <el-menu-item-group>
           <el-menu-item index="2-2"><router-link to="/default/contribution" active-class>会员贡献</router-link></el-menu-item>
         </el-menu-item-group>
         <el-menu-item-group>
           <el-menu-item index="2-3"><router-link to="/default/memberList" active-class>会员列表</router-link></el-menu-item>
         </el-menu-item-group>
       </el-submenu>
       <!--3-->
       <el-submenu index="3">
         <template slot="title">
           <i class="iconfont icon-xingweifenxi"></i>
           <span slot="title">会员群管理</span>
         </template>
         <el-menu-item-group>
           <el-menu-item index="3-1"><router-link to="/default/grouplist" active-class>人群列表</router-link></el-menu-item>
           <el-menu-item index="3-2"><router-link to="/default/groupAdd" active-class>人群新增</router-link></el-menu-item>
         </el-menu-item-group>
       </el-submenu>
       <!--4-->
       <el-submenu index="4">
         <template slot="title">
           <i class="iconfont el-icon-tickets"></i>
           <span slot="title">卡券中心</span>
         </template>
         <el-menu-item-group>
           <el-menu-item index="4-1"><router-link to="/default/cardHistory" active-class>发券记录</router-link></el-menu-item>
           <el-menu-item index="4-2"><router-link to="/default/couponDistribution" active-class>优惠券分布</router-link></el-menu-item>
           <el-menu-item index="4-3"><router-link to="/default/couponDetail" active-class>优惠券详情</router-link></el-menu-item>
         </el-menu-item-group>
       </el-submenu>
       <!--5-->
       <el-menu-item index="5">
         <router-link to="/ranking" active-class>
           <i class="el-icon-sort"></i>
           <span>商品排行</span>
         </router-link>
       </el-menu-item>
       <!--6-->
       <el-menu-item index="6">
         <router-link to="/journaling" active-class>
           <i class="el-icon-document"></i>
           <span>报表</span>
         </router-link>
       </el-menu-item>
     </el-menu>
     <!--设置导航-->
     <el-menu class="el-menu-vertical-demo" :collapse="this.$store.state.menu" v-if="showName=='set'? true:false">
       <el-submenu index="1">
         <template slot="title">
           <i class="el-icon-setting"></i>
           <span slot="title">管理员管理</span>
         </template>
         <el-menu-item-group>
           <el-menu-item index="1-1"><router-link to="/set" active-class>管理员列表</router-link></el-menu-item>
           <el-menu-item index="1-2"><router-link to="/set/roleList" active-class>角色管理</router-link></el-menu-item>
         </el-menu-item-group>
       </el-submenu>
     </el-menu>
   </div>
</template>

<script>
  import { mapGetters } from 'vuex'
    export default {
        name: "menus",
      data() {
          return{
            showName: 'default'
          }
      },
      methods:{
        collapseChange(){//伸缩menu
          this.$store.commit('MENU');
        },
      },
      created(){
        this.showName = this.changeName;
      },
      computed:{
        ...mapGetters([
          'changeName',
        ])
      },
      watch:{
        $route(newRoute,oldRoute){},//监听路由导航默认选中
        changeName(val){//判断是否切换NAV
          this.showName = val;
          //console.log(this.$route.path)
        },
      }
    }
</script>

<style scoped>
   #menus{
     height: calc(100% - 70px);
     position: absolute;
     top: 70px;
     left: 0;
     background-color: #e6e6e6;
   }
   .retract{
     background-color: #fff;
     border-bottom: 1px solid #eee;
     border-right: 1px solid #e2e2e2;
     box-sizing: border-box;
     height: 50px;
     line-height: 50px;
     font-size: 20px;
     color: #999;
   }
   .el-icon-menu{
     cursor: pointer;
   }
   .el-menu-vertical-demo:not(.el-menu--collapse){
     text-align: left;
     width: 250px;
   }
   .el-menu-vertical-demo a{
     display: block;
     width: 100%;
     height: 100%;
   }
   .el-menu-vertical-demo a:hover{
     color: #4BA2FC;
   }
  .router-link-exact-active i{
    color: #4BA2FC;
  }
   .router-link-exact-active{
     color: #4BA2FC;
   }
</style>
