<template>
  <div :id="datas.id" class="blend"></div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "blend", //混合图
    props:{
      option:{
        type: Object,
        default(){
          return{}
        }
      }
    },
    data() {
      return{
        datas: {}
      }
    },
    created(){
      this.datas = this.option;
    },
    methods:{
      drawArea(datas){
        let myCharts = echarts.init(document.getElementById(datas.id));
        myCharts.setOption({
          color: datas.color,
          title : {
            text: datas.title,
          },
          tooltip : {
            trigger: 'axis'
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore : {show: true},
              //saveAsImage : {show: true}
            }
          },
          calculable : true,
          legend: {
            data: datas.content
          },
          xAxis : [
            {
              type : 'category',
              data : datas.time

            }
          ],
          yAxis : [
            {
              type : 'value',
              name : datas.left,
              axisLabel : {
                formatter: '{value}'
              }
            },
            {
              type : 'value',
              name : datas.right,
              axisLabel : {
                formatter: '{value}'
              }
            }
          ],
          series : [
            {
              name: datas.content[0],
              type:'bar',
              data: datas.amount
            },
            {
              name:datas.content[1],
              type:'line',
              yAxisIndex: 1,
              data: datas.guest
            }
          ]
        });
      }
    },
    watch:{
      datas(val){
        let time = [],amount = [],guest = [];
        val.data.forEach(item=>{
          time.push(item.datetime);
          amount.push(item.amount);
          guest.push(item.guest);
        })
        val.amount = amount;
        val.guest = guest;
        val.time = time;
        this.drawArea(val);
      }
    }
  }
</script>

<style scoped>
  .blend{
    width: 500px;
    height: 400px;
    margin-top: 30px;
  }
</style>
