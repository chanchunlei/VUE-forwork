<template>
  <div id="mycanvas"></div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "areas",
    data() {
      return{

      }
    },
    mounted(){
      this.drawArea();
    },
    methods:{
      drawArea(){
        let myCharts = echarts.init(document.getElementById('mycanvas'));
        myCharts.setOption({
          title : {
            text: '热销商品',
            subtext: '数据大数据分析'
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:['上个月', '本月']
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore : {show: true}
            }
          },
          calculable : true,
          xAxis : [
            {
              type : 'value',
              boundaryGap : [0, 0.01]
            }
          ],
          yAxis : [
            {
              type : 'category',
              data : ['苹果8','戴尔电脑','咖啡','按摩椅','美食','电竞','耳机','小米','松果','best']
            }
          ],
          series : [
            {
              name:'上个月',
              type:'bar',
              data:[999, 757, 666, 456, 256, 315, 456, 968, 253, 235]
            },
            {
              name:'本月',
              type:'bar',
              data:[215, 212, 757, 968, 253, 235, 646, 227, 632, 758]
            }
          ]
        });
      }
    }
  }
</script>

<style scoped>
  #mycanvas{
    width: 750px;
    height: 600px;
    margin-top: 30px;
  }
</style>
