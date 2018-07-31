<template>
  <el-row :gutter="16">
    <el-col :span="16" :offset="2">
      <el-card class="box-card">

        <el-row>
          <el-col :span="24"><div class="titleMember">会员详情</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="titleMember fontStyle">昵称：<span class="content">{{list.name}}</span></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="titleMember fontStyle">卡号：<span class="content">{{list.cardID}}</span></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="titleMember fontStyle">注册日期：<span class="content">{{list.times}}</span></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="titleMember fontStyle">头像：<span class="memberimgs"><img :src="list.imgs"></span></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="titleMember fontStyle">unionID：<span class="content">{{list.unionid}}</span></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="titleMember fontStyle">openID：<span class="content">{{list.openid}}</span></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="titleMember fontStyle">性别：<span class="content">{{list.sex}}</span></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="titleMember fontStyle">标签：<span class="content">{{list.tags}}</span></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="titleMember fontStyle">手机：<span class="content">{{list.phone}}</span></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="titleMember fontStyle">消费金额：<span class="content">{{list.record}}</span></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="titleMember fontStyle">最后消费时间：<span class="content">{{list.consumeTime}}</span></div></el-col>
        </el-row>


        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
    export default {
      data(){
        return{
          list: {
            cardID: 123,
            name: "张三",
            times: '2018-05-20',
            imgs: require('../../assets/logo.png'),
            unionid: '4564653131323332adds33',
            openid: '4564653131323332adds33',
            sex: '男',
            tags: '文艺青年',
            phone: '12345678945',
            record: 5556.00,
            consumeTime: '2018-05-20'
          }
        }
      }
    }
</script>

<style scoped>
  .box-card{
    margin: 30px 0 30px 30px;
  }

 .titleMember{
   text-align: left;
   font-size: 18px;
   color: #333;
   line-height: 50px;
   border-bottom: 1px solid #e2e2e2;
   position: relative;
 }
  .fontStyle{
    font-size: 16px;
    color: #666;
  }
  .content{
    display: inline-block;
    left: 180px;
    position: absolute;
  }
  .memberimgs{
    height: 80px;
    display: inline-block;
  }
  .memberimgs>img{
    position: absolute;
    left: 180px;
    margin-top: 10px;
    width: 80px;
    height: 80px;
  }
</style>
