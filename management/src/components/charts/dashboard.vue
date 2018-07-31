<template>
    <div id="dashboard">

    </div>
</template>

<script>
  import echarts from 'echarts'
    export default {
        name: "dashboard",
      data(){
          return{

          }
      },
      mounted(){
          this.drawLine();
      },
      methods:{
         drawLine(){
           let myCharts = echarts.init(document.getElementById('dashboard'));
           myCharts.setOption({
             tooltip : {
               trigger: 'item',
               formatter: "{a} <br/>{b} : {c} ({d}%)"
             },
             legend: {
               orient : 'vertical',
               x : 'left',
               data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
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
                       funnelAlign: 'center',
                       max: 1548
                     }
                   }
                 },
                 restore : {show: true},
               }
             },
             calculable : true,
             series : [
               {
                 name:'访问来源',
                 type:'pie',
                 radius : ['50%', '70%'],
                 itemStyle : {
                   normal : {
                     label : {
                       show : false
                     },
                     labelLine : {
                       show : false
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
                 data:[
                   {value:335, name:'直接访问'},
                   {value:310, name:'邮件营销'},
                   {value:234, name:'联盟广告'},
                   {value:135, name:'视频广告'},
                   {value:1548, name:'搜索引擎'}
                 ]
               }
             ]
           })
         }
      }
    }
</script>

<style scoped>
    #dashboard{
      width: 500px;
      height: 400px;
      margin-top: 30px;
    }
</style>
