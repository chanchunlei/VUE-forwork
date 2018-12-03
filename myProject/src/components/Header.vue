<template>
    <div class="head">
      <div class="head_box">
        <div class="logo">
          <img src="../assets/PC.png">
        </div>
        <div class="inps">
          <el-input
            placeholder="请输入内容"
            clearable>
          </el-input>
        </div>
        <div class="bars">
          <el-menu class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3">消息中心</el-menu-item>
            <el-menu-item index="4">订单管理</el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
</template>

<script>
  import api from '../api/api.js'
    export default {
        name: "Header",
       created:function() {
           api.Test()
        }
    }
</script>

<style scoped>
  .head{
    width: 100%;
    background-color: #409eff;
    height:80px;
    border-bottom: 1px solid #eee;
}
  .head_box{
    width: 1100px;
    overflow: hidden;
    height: 80px;
    margin: 0 auto;
  }
  .logo{
    width: 80px;
    height: 80px;
    margin-left: 30px;
    float: left;
  }
  .logo>img{
    max-height: 80px;
    max-width: 80px;
  }
  .inps{
    line-height: 80px;
    padding-left: 50px;
    max-width: 20%;
    float: left;
  }
  .el-menu-demo{
    padding-top: 20px;
    width: 500px;
    float: right;
    background-color:#409eff;
    color: #fff;
  }
</style>
