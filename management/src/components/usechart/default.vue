<template>
   <div v-loading="this.$store.state.loading" id="default">
     <Dashboard :option="option1" v-if="flag1"></Dashboard>
     <Dashboard :option="option2" v-if="flag2"></Dashboard>
     <Histogram :option="option3" v-if="flag3"></Histogram>
     <Histogram :option="option4" v-if="flag4"></Histogram>
     <Dashboard :option="option5" v-if="flag5"></Dashboard>
     <Blend :option="option6" v-if="flag6"></Blend>
   </div>
</template>

<script>
  import Dashboard from '../charts/dashboard'
  import Histogram from '../charts/histogram'
  import Blend from '../charts/blend'
  import api from '../../api/api'
    export default {
        name: "default",
      components:{
        "Dashboard": Dashboard,
        "Histogram": Histogram,
        "Blend": Blend
      },
      data(){
          return{
            option1:{},
            option2:{},
            option3:{},
            option4:{},
            option5:{},
            option6:{},
            flag1: false,//解决组件传值异步
            flag2: false,//解决组件传值异步
            flag3: false,//解决组件传值异步
            flag4: false,//解决组件传值异步
            flag5: false,//解决组件传值异步
            flag6: false//解决组件传值异步
        }
      },
      created(){
        this.sexual();
        this.age();
        this.check();
        this.num();
        this.deal();
        this.blend();
      },
      methods:{
        sexual(){//性别比例数据
          api.Sexual({
            query:{},
            success:res=>{
              if(res.status == 200){
                this.option1.data=res.data.data;
                this.option1.name='男女分布';
                this.option1.title='男女分布图';
                this.option1.id='sexual';
                this.option1.color= ['#40E0D0','#FFB6C1','#fad797'];
                this.flag1 = true;
              }
            }
          })
        },
        age(){
          api.Age({//年龄比例数据
            query:{},
            success:res=>{
              if(res.status == 200){
                this.option2.data=res.data.data;
                this.option2.name='年龄比例';
                this.option2.title='年龄比例分布图';
                this.option2.id='Age';
                this.option2.color= ['#CD5C5C','#f5b031','#59ccf7','#fad797','#c3b4df','#ADFF2F','#D2B48C'];
                this.flag2 = true;
              }
            }
          })
        },
        check(){//下单时间段统计
          api.checkTime({
            query:{},
            success:res=>{
              if(res.status == 200){
                this.option3.data=res.data.data;
                this.option3.name='人数';
                this.option3.title='下单时间段统计';
                this.option3.id='check';
                this.option3.color= '#FF0000';
                this.flag3 = true;
              }
            }
          })
        },
        num(){//下单频次
          api.PurchaseFrequency({
            query:{},
            success:res=>{
              if(res.status == 200){
                this.option4.data=res.data.data;
                this.option4.name='人数';
                this.option4.title='购买频次';
                this.option4.id='num';
                this.option4.color= '#4169E1';
                this.flag4 = true;
              }
            }
          })
        },
        deal(){//年成交占比
          api.AnnualTransaction({
            query:{},
            success:res=>{
              if(res.status == 200){
                this.option5.data=res.data.data;
                this.option5.name='支付比例';
                this.option5.title='用户年成交占比图';
                this.option5.id='deal';
                this.option5.color= ['#CD5C5C','#f5b031','#59ccf7','#fad797','#c3b4df','#ADFF2F','#D2B48C'];
                this.flag5 = true;
              }
            }
          })
        },
        blend(){//每月成交金额
          api.Gmv({
            query:{},
            success:res=>{
              if(res.status == 200){
                this.option6.data=res.data.data;
                this.option6.title='每月成交';
                this.option6.left='月总交易金额(万元)';
                this.option6.right='客单价(元)';
                this.option6.content = ['月总交易金额(万元)','客单价(元)'];
                this.option6.id='blend';
                this.option6.color= ['#FFD700','#FF4500'];
                this.flag6 = true;
              }
            }
          })
        }
      }
    }
</script>

<style scoped>
   #default{
     width: 100%;
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     justify-content: space-around;
   }
</style>
