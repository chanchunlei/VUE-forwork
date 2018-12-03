<template>
    <div :id="datas.id" class="histogram">
    </div>
</template>

<script>
  import echarts from 'echarts'
    export default {      //柱状图
        name: "histogram",
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
        this.datas = this.option;//获取父元素过来的值
      },
      methods:{
          drawLine(datas){
            let myChart = echarts.init(document.getElementById(datas.id));
            myChart.setOption({
              title: { text: datas.title },
              tooltip: {},
              color: datas.color,
              xAxis: {
                data: datas.names
              },
              yAxis: {},
              series: [{
                name: datas.name,
                type: 'bar',
                data: datas.value
              }]
            });
          }
      },
      watch:{
          datas(val){//数据改变开始绘制
            let name = [],value = [];
            val.data.forEach(item=>{
              name.push(item.name);
              value.push(item.value);
            })
            val.names = name;
            val.value = value;
            this.drawLine(val);
          }
      }
    }
</script>

<style scoped>
    .histogram{
      width: 500px;
      height: 400px;
      margin-top: 30px;
    }
</style>
