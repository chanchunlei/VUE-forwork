<template>
  <div :id="datas.id" class="areaPolygon">
    <!--面积折线图-->
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "areaPolygon",
    props:{
      option:{
        type: Object,
        default(){
          return{}
        }
      }
    },
    data(){
      return{
        datas:{}
      }
    },
    created(){
      this.datas = this.option;
    },
    methods:{
      drawLine(val){
        let myChart = echarts.init(document.getElementById(val.id));
        myChart.setOption({
          color: val.color,
          title : {
            text: val.name,
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data: val.legend
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
            }
          },
          calculable : true,
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : val.x
            }
          ],
          yAxis : val.yAxis,
          series : val.series
        });
      }
    },
    watch:{
      datas(val){
        this.drawLine(val);
      }
    }
  }
</script>

<style scoped>
  .areaPolygon{
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    height: 500px;
    margin-top: 30px;
  }
</style>
