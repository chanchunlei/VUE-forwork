<template>
  <div v-loading="this.$store.state.loading">
    <el-table
      :data="tableData"
      border
      style="width: 100%; text-align: left">
      <el-table-column
        prop="strBncCode"
        label="商益号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="lngshopName"
        label="门店名称"
        width="140">
      </el-table-column>
      <el-table-column
        prop="proName"
        label="商品名称"
        width="130">
      </el-table-column>
      <el-table-column
        prop="sclassName"
        label="商品小类名称"
        width="130">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="交易金额"
        width="140">
      </el-table-column>
      <el-table-column
        prop="TFlow"
        label="订单号"
        width="140">
      </el-table-column>
      <el-table-column
        prop="SaleQty"
        label="交易单数"
        width="140">
      </el-table-column>
      <el-table-column
        prop="SaleDate"
        label="交易时间"
        width="140">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import api from '../../api/api'
    export default {
      name: "transactionS",//加了S表示不做缓存
      data() {
        return {
          tableData: []
        }
      },
      created(){
        this.datas();
      },
      methods:{
        datas(){
          api.MemberOrderDetail({
            query:{
              strBncCode: this.$route.params.strBncCode
            },
            success: res=>{
              //console.log(res);
              if(res.status == 200){
                this.tableData = res.data.data;
              }
            }
          })
        }
      },
      beforeRouteUpdate (to, from, next) {//导航守卫组件复用
        next();
        this.datas();
      }
    }
</script>

<style scoped>

</style>
