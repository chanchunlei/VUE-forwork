<template>
  <div v-loading="this.$store.state.loading" class="big_box">
    <!--卡片-->
    <div class="cardBox">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>核心指标</span>
        </div>
        <div class="text item">
         <h3>会员总数</h3>
          <div class="numbers">
            <h1>{{total}}</h1>
            <span>人</span>
          </div>
        </div>
        <div class="text item">
          <h3>昨日入会</h3>
          <div class="numbers">
            <h1>{{yesterday}}</h1>
            <span>人</span>
          </div>
        </div>
      </el-card>
    </div>
    <!--折线图-->
    <areaPolygon :option="trend" v-if="flag"></areaPolygon>
  </div>
</template>

<script>
  import areaPolygon from '../charts/areaPolygon'
  import api from '../../api/api'
  export default {
    name: 'membershipSize',
    components:{
      "areaPolygon": areaPolygon
    },
    data() {
      return {
        total: 0,
        yesterday: 0,
        trend:{},
        flag: false,//解决组件传值异步
        series:[
          {
            name: '加入会员',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
          }
        ],
        yAxis: [
          {
            type : 'value',
            name : '人数',
            axisLabel : {
              formatter: '{value} 人'
            }
          }
        ]
      }
    },
    created(){
      this.rawdata();

    },
    methods: {
      rawdata(){
        api.MemberData({
          query:{},
          success:res=>{
            if(res.status==200){
              this.total = res.data.data.total;
              this.yesterday = res.data.data.yesterday;
              this.trend = res.data.data.trend;
              this.trend.name = "会员加入趋势图";
              this.trend.legend = ['加入会员'];
              this.series[0].data = this.trend.y;
              this.trend.series = this.series;
              this.trend.color = '#BFEFFF';
              this.trend.id = "areaPolygon";
              this.trend.yAxis = this.yAxis;
              this.flag = true;
              //console.log(this.trend)
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
