<template>
   <div id="menus">
     <div class="retract">
        <i @click="collapseChange" class="el-icon-menu"></i>
     </div>
     <el-menu :collapse="collapse" class="el-menu-vertical-demo">
       <!--1-->
       <el-submenu index="1">
         <template slot="title">
           <i class="iconfont icon-huiyuan"></i>
           <span slot="title">会员管理</span>
         </template>
         <el-menu-item-group>
           <el-menu-item index="1-1"><router-link :to="'/member'">会员列表</router-link></el-menu-item>
         </el-menu-item-group>
         <el-submenu index="1-3">
           <span slot="title">会员人群管理</span>
           <el-menu-item index="1-3-1"><router-link :to="'/grouplist'">人群列表</router-link></el-menu-item>
           <el-menu-item index="1-3-2"><router-link :to="'/groupAdd'">人群新增</router-link></el-menu-item>
           <el-menu-item index="1-3-3">人群规则新增</el-menu-item>
         </el-submenu>
       </el-submenu>
       <!--2-->
       <el-submenu index="2">
         <template slot="title">
           <i class="iconfont icon-xingweifenxi"></i>
           <span slot="title">会员数据分析</span>
         </template>
         <el-menu-item-group>
           <el-menu-item index="2-1"><router-link :to="'/baseCharts'">会员规模分析</router-link></el-menu-item>
           <el-menu-item index="2-2">会员贡献度</el-menu-item>
           <el-menu-item index="2-3">会员行为偏好</el-menu-item>
         </el-menu-item-group>
       </el-submenu>
       <!--3-->
       <el-submenu index="3">
         <template slot="title">
           <i class="iconfont icon-wodejihua"></i>
           <span slot="title">运维计划</span>
         </template>
         <el-menu-item-group>
           <el-menu-item index="3-1">信息关怀</el-menu-item>
           <el-menu-item index="3-2">推荐信息</el-menu-item>
         </el-menu-item-group>
       </el-submenu>
     </el-menu>
   </div>
</template>

<script>
  import bus from '../components/bus.js'
    export default {
        name: "menus",
      data() {
          return{
            collapse: false
          }
      },
      methods:{
        collapseChange(){
          this.collapse = !this.collapse;
          bus.$emit('collapse',this.collapse);
        }
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
</style>
