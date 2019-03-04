<template>
  <div v-loading="this.$store.state.loading">
    <!--会员信息-->
    <el-card class="box-card">
      <div class="itemText">
        <div>公众号来源：</div>
        <div>{{tableData.bu_name}}</div>
      </div>
      <div class="itemText">
        <div>性别：</div>
        <div>{{tableData.sex}}</div>
      </div>
      <div class="itemText">
        <div>商益号：</div>
        <div>{{tableData.strBncCode}}</div>
      </div>
      <div class="itemText">
        <div>手机号：</div>
        <div>{{tableData.mobile}}</div>
      </div>
      <div class="itemText">
        <div>会员等级：</div>
        <div>{{tableData.vip_level}}</div>
      </div>
      <div class="itemText">
        <div>生日：</div>
        <div>{{tableData.birthday}}</div>
      </div>
      <div class="itemText">
        <div>交易总金额：</div>
        <div>{{tableData.amount_num}}</div>
      </div>
      <div class="itemText">
        <div>最近一次交易时间：</div>
        <div>{{tableData.max_or_time}}</div>
      </div>
      <div class="itemText">
        <div>首次交易时间：</div>
        <div>{{tableData.min_or_time}}</div>
      </div>
      <div class="itemText">
        <div>交易总数：</div>
        <div>{{tableData.o_num}}</div>
      </div>
      <div class="itemText">
        <div>手机号归属地：</div>
        <div>{{tableData.province}}</div>
      </div>
      <div class="itemText">
        <div>注册时间：</div>
        <div>{{tableData.reg_time}}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import api from '../../api/api'
  export default {
    name: 'recordS',
    data() {
      return {
        tableData: {}
      };
    },
    created(){
      this.datas();
    },
    methods:{
      datas(){
        api.MemberDetail({
          query:{
            strBncCode: this.$route.params.strBncCode
          },
          success: res=>{
            if(res.status == 200){
              this.tableData = res.data.data;
              if(this.tableData.sex == 1){this.tableData.sex = '男'}
              if(this.tableData.sex == 2){this.tableData.sex = '女'}
              if(this.tableData.vip_level == 1){this.tableData.vip_level = '一般会员'}
              if(this.tableData.vip_level == 2){this.tableData.vip_level = 'vip会员'}
            }
          }
        })
      }
    },
    beforeRouteUpdate (to, from, next) {//导航守卫组件复用
      next();
      this.datas();
    }
  };
</script>
<style scoped>
  .itemText{
    font-size: 18px;
    line-height: 50px;
    display: flex;
    justify-content: flex-start;
    color: #666;
    border-bottom: 1px solid #ccc;
  }
</style>
