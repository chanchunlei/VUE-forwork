<template>
  <div v-loading="this.$store.state.loading" class="big_box">
    <!--卡片-->
    <div class="cardBox">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>核心指标</span>
        </div>
        <div class="text item">
          <h3>昨日成交金额</h3>
          <div class="numbers">
            <h1>{{amount}}</h1>
            <span>元</span>
          </div>
        </div>
        <div class="text item">
          <h3>昨日成交人数</h3>
          <div class="numbers">
            <h1>{{dealNumber}}</h1>
            <span>人</span>
          </div>
        </div>
        <div class="text item">
          <h3>昨日成交笔数</h3>
          <div class="numbers">
            <h1>{{orderNumber}}</h1>
            <span>单</span>
          </div>
        </div>
      </el-card>
    </div>
    <!--折线图-->
    <areaPolygon :option="orderRepeat" v-if="flag1"></areaPolygon>
    <areaPolygon :option="orderTrend" v-if="flag2"></areaPolygon>
  </div>
</template>

<script>
  import areaPolygon from '../charts/areaPolygon'
  import api from  '../../api/api'
    export default {
        name: "memberContribution",
      components:{
        "areaPolygon": areaPolygon
      },
      data(){
        return{
          amount: 0,
          dealNumber: 0,
          orderNumber: 0,
          orderRepeat:{},
          orderTrend:{},
          flag1: false,//解决组件传值异步
          flag2: false,//解决组件传值异步
          series:[
            {
              name: '复购比例',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
            }
          ],
          series2: [],
          yAxis1: [
            {
              type : 'value',
              name : '比例',
              axisLabel : {
                formatter: '{value} %'
              }
            }
          ],
          yAxis2: [
            {
              type : 'value',
              name : '单量',
              axisLabel : {
                formatter: '{value} 单'
              }
            },
            {
              type : 'value',
              name : '金额',
              axisLabel : {
                formatter: '{value} 万元'
              }
            }
          ],
        }
      },
      created(){
        this.rawData();
      },
      methods:{
        rawData(){
          api.MemberOffer({
            query:{},
            success:res=>{
              if(res.status == 200){
                this.amount = res.data.data.amount;
                this.dealNumber = res.data.data.dealNumber;
                this.orderNumber = res.data.data.orderNumber;
                this.orderRepeat = res.data.data.orderRepeat;
                this.orderTrend = res.data.data.orderTrend;
                //复购率
                this.orderRepeat.name = "复购率";
                this.orderRepeat.legend = ['占比'];
                this.series[0].data = this.orderRepeat.y;
                this.orderRepeat.series = this.series;
                this.orderRepeat.color = '#ADD8E6';
                this.orderRepeat.id = "areaPolygon1";
                this.orderRepeat.yAxis = this.yAxis1;
                this.flag1 = true;
                //成交趋势
                this.orderTrend.name = "成交趋势图";
                this.orderTrend.legend = ['订单数','订单金额'];
                this.orderTrend.y.forEach(item=>{
                    let arr = {
                      type:'line',
                      smooth:true,
                      itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    };
                   arr.name = item.name;
                   arr.data = item.data;
                   this.series2.push(arr);
                })
                this.series2[1].yAxisIndex = 1;
                this.orderTrend.series = this.series2;
                this.orderTrend.color = ['#EEA9B8','#CAFF70'];
                this.orderTrend.id = "areaPolygon2";
                this.orderTrend.yAxis = this.yAxis2;
                this.flag2 = true;
                // console.log(this.orderTrend)
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
</style>
