<template>
  <div v-loading="this.$store.state.loading" class="big_box">
    <el-table class="box"
              :data="tableData"
              border
              style="width: 100%">
      <el-table-column
        fixed
        prop="log_id"
        label="发券记录ID"
        width="150">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="发券手机号码"
        width="200">
      </el-table-column>
      <el-table-column
        fixed
        prop="status"
        label="发送状态"
        width="160">
      </el-table-column>
      <el-table-column
        prop="detail"
        label="失败原因"
        width="200">
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="pages">
      <el-pagination
        background
        layout="sizes,prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import api from '../../api/api';
    export default {
        name: "cardGroupDetailS",
      data() {
          return {
            tableData: [],
            total: 0,
            page: 1,//当前页
            limit: 10//每页显示条数
          }
      },
      created(){
        this.tableList(this.page,this.limit)
      },
      methods:{
        tableList(page,limit){
          api.CardHistoryDetail({
            query:{
              page: page,
              limit: limit,
              log_id: this.$route.params.log_id
            },
            success: res => {
              if(res.status == 200){
                this.total = res.data.count;
                this.tableData = res.data.data;
                this.tableData.map(item => {
                  if(item.status == 0) {
                    item.status = "发送中";
                  }else if(item.status == 1) {
                    item.status = "发送成功";
                  }else{
                    item.status = "发送失败";
                  }
                  if(!item.detail) {
                    item.detail = "暂无！"
                  }
                })
              }
            }
          })
        },
        handleSizeChange(val){//每页多少条
          this.limit = val;
        },
        handleCurrentChange(val){//当前页
          this.page = val;
        },
      },
      beforeRouteUpdate (to, from, next) {//导航守卫组件复用
        next();
        this.tableList(this.page,this.limit);
      },
      watch:{
        limit(val){
          this.tableList(this.page,val);
        },
        page(val){
          this.tableList(val,this.limit);
        }
      }
    }
</script>

<style scoped>

</style>
