<template>
    <div :id="datas.id" class="dashboard">
    </div>
</template>

<script>
  import echarts from 'echarts'
    export default {
        name: "dashboard",//环形图
      props:{
        option:{
          type:Object,
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
        this.datas = this.option;//赋值
      },
      methods:{
         drawLine(datas){//画图
           let myCharts = echarts.init(document.getElementById(datas.id));
           myCharts.setOption({
             color: datas.color,
             title : {
               text: datas.title,
               x:'center'
             },
             tooltip : {
               trigger: 'item',
               formatter: "{a} <br/>{b} : {c} ({d}%)"
             },
             legend: {
               orient : 'vertical',
               x : 'left',
             },
             toolbox: {
               show : true,
               feature : {
                 mark : {show: true},
                 dataView : {show: true, readOnly: false},
                 magicType : {
                   show: true,
                   type: ['pie', 'funnel'],
                   option: {
                     funnel: {
                       x: '25%',
                       width: '50%',
                       funnelAlign: 'center'
                     }
                   }
                 },
                 restore : {show: true},
               }
             },
             calculable : true,
             series : [
               {
                 name: datas.name,
                 type:'pie',
                 radius : ['50%', '70%'],
                 itemStyle : {
                   normal : {
                     label : {
                       show : true
                     },
                     labelLine : {
                       show : true
                     }
                   },
                   emphasis : {
                     label : {
                       show : true,
                       position : 'center',
                       textStyle : {
                         fontSize : '16',
                         fontWeight : 'bold'
                       }
                     }
                   }
                 },
                 data:datas.data
               }
             ]
           })
         }
      },
      watch:{
        datas(val){//监听数据改变,改变时开始绘制图形
          //console.log(val);
          this.drawLine(val);
        }
      },
    }
</script>

<style scoped>
    .dashboard{
      width: 500px;
      height: 400px;
      margin-top: 30px;
    }
</style>
