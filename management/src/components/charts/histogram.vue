<template>
    <div id="histogram">

    </div>
</template>

<script>
  import echarts from 'echarts'
    export default {
        name: "histogram",
      data(){
          return{

          }
      },
      mounted(){
         this.drawLine()
      },
      methods:{
          drawLine(){
            let myChart = echarts.init(document.getElementById('histogram'));
            myChart.setOption({
              title: { text: '在Vue中使用echarts' },
              tooltip: {},
              xAxis: {
                data: ["周一","周二","周三","周四","周五","周六","周日"]
              },
              yAxis: {},
              series: [{
                name: '增加数',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20,33.5]
              }]
            });
          }
      }
    }
</script>

<style scoped>
    #histogram{
      width: 500px;
      height: 400px;
      margin-top: 30px;
    }
</style>
