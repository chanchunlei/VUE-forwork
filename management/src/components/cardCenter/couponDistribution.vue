<template>
  <div v-loading="this.$store.state.loading" class="big_box">
    <div class="cardBox">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>发券数据</span>
        </div>
        <div class="text item">
          <h3>今日发券数量</h3>
          <div class="numbers">
            <h1>{{issueData.itoday}}</h1>
            <span>张</span>
          </div>
        </div>
        <div class="text item">
          <h3>昨日发券数量</h3>
          <div class="numbers">
            <h1>{{issueData.iyesterday}}</h1>
            <span>张</span>
          </div>
        </div>
        <div class="text item">
          <h3>累计发券数量</h3>
          <div class="numbers">
            <h1>{{issueData.itotal}}</h1>
            <span>张</span>
          </div>
        </div>
      </el-card>
    </div>
    <div class="cardBox cardBox2">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用券数据</span>
        </div>
        <div class="text item">
          <h3>今日用券数量</h3>
          <div class="numbers">
            <h1>{{useData.utoday}}</h1>
            <span>张</span>
          </div>
        </div>
        <div class="text item">
          <h3>昨日用券数量</h3>
          <div class="numbers">
            <h1>{{useData.uyesterday}}</h1>
            <span>张</span>
          </div>
        </div>
        <div class="text item">
          <h3>累计用券数量</h3>
          <div class="numbers">
            <h1>{{useData.utotal}}</h1>
            <span>张</span>
          </div>
        </div>
      </el-card>
    </div>
    <div class="picture">
      <areaPolygon :option="orderIssue" v-if="flag1"></areaPolygon>
      <areaPolygon :option="orderUse" v-if="flag2"></areaPolygon>
    </div>
    <div class="chart">
      <pie :option="groupIssue" v-if="flag3"></pie>
      <pie :option="groupUse" v-if="flag4"></pie>
    </div>
  </div>
</template>

<script>
  import api from '../../api/api'
  import areaPolygon from '../charts/areaPolygon'
  import pie from '../charts/pie'
    export default {
        name: "couponDistribution",
      components:{
        "areaPolygon": areaPolygon,
        "pie": pie
      },
      data(){
          return{
            issueData: {},
            useData: {},
            orderIssue: {},
            orderUse: {},
            groupIssue: {},
            groupUse: {},
            series:[
              {
                name: '发放数量',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
              }
            ],
            series2:[
              {
                name: '使用数量',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
              }
            ],
            yAxis1: [
              {
                type : 'value',
                name : '数量',
                axisLabel : {
                  formatter: '{value} 张'
                }
              }
            ],
            flag1: false,//解决组件传值异步
            flag2: false,//解决组件传值异步
            flag3: false,//解决组件传值异步
            flag4: false //解决组件传值异步
          }
      },
      created(){
        this.InitDatas();
      },
      methods:{
          InitDatas() {
            api.CouponDistribution({
              success: res =>{
                if(res.status == 200){
                  this.issueData = res.data.data.issue;
                  this.useData = res.data.data.use;
                  this.orderIssue = res.data.data.issue_trend;
                  this.orderUse = res.data.data.use_trend;
                  //券发放趋势数据
                  this.orderIssue.name = "优惠券发放趋势";
                  this.orderIssue.legend = ['占比'];
                  this.series[0].data = this.orderIssue.y;
                  this.orderIssue.series = this.series;
                  this.orderIssue.color = '#ADD8E6';
                  this.orderIssue.id = "areaPolygon1";
                  this.orderIssue.yAxis = this.yAxis1;
                  this.flag1 = true;
                  //券使用趋势数据
                  this.orderUse.name = "优惠券使用趋势";
                  this.orderUse.legend = ['占比'];
                  this.series2[0].data = this.orderUse.y;
                  this.orderUse.series = this.series2;
                  this.orderUse.color = '#F590CB';
                  this.orderUse.id = "areaPolygon2";
                  this.orderUse.yAxis = this.yAxis1;
                  this.flag2 = true;
                  //事业群券发放图
                  this.groupIssue.data=res.data.data.issue_total_trend;
                  this.groupIssue.name='事业群券发放图';
                  this.groupIssue.title='事业群券发放分布图';
                  this.groupIssue.id='couponIssue';
                  this.groupIssue.color= ['#40E0D0','#FFB6C1','#fad797'];
                  this.flag3 = true;
                  //事业群券使用图
                  this.groupUse.data=res.data.data.use_total_trend;
                  this.groupUse.name='事业群券使用图';
                  this.groupUse.title='事业群券使用分布图';
                  this.groupUse.id='couponUse';
                  this.groupUse.color= ['#FCCAF2','#90EBF5','#D2F59F'];
                  this.flag4 = true;

                }
              }
            })
          }
      }
    }
</script>

<style scoped>
  .big_box{
    background-color: #fff;
  }
  .cardBox{
    width: calc(100% - 30px);
    padding: 30px 15px;
  }
  .cardBox2{
    padding-top: 0;
  }
  .box-card{
    width: 100%;
    text-align: left;
  }
  .text {
    font-size: 14px;
    display: inline-block;
    margin-right: 150px;
  }
  .numbers>h1{
    font-size: 20px;
    font-weight: 700;
    display: inline-block;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix{
    font-size: 20px;
    font-weight: 700;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .picture,.chart{
    display: flex;
    justify-content: space-around;
  }
</style>
