<template>
   <div id="areas"></div>
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
            let myCharts = echarts.init(document.getElementById('areas'));
            myCharts.setOption({
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              series : [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: '55%',
                  roseType: 'angle',
                  data:[
                    {value:800, name:'乐之'},
                    {value:600, name:'百脑汇'},
                    {value:700, name:'betweens'},
                    {value:650, name:'乐之上海'},
                    {value:550, name:'翼世纪'}
                  ]
                }
              ]
            });
          }
        }
    }
</script>

<style scoped>
   #areas{
     width: 500px;
     height: 400px;
     margin-top: 30px;
   }
</style>
