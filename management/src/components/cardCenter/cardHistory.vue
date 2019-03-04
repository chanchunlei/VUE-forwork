<template>
  <div v-loading="this.$store.state.loading" class="big_box">
    <el-table class="box"
              :data="tableData"
              border
              style="width: 100%">
      <el-table-column
        fixed
        prop="cid"
        label="群ID"
        width="110">
      </el-table-column>
      <el-table-column
        prop="cname"
        label="群名称"
        width="160">
      </el-table-column>
      <el-table-column
        fixed
        prop="ipid"
        label="卡券ID"
        width="110">
      </el-table-column>
      <el-table-column
        prop="name"
        label="卡券名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="log_id"
        label="记录ID"
        width="110">
      </el-table-column>
      <el-table-column
        prop="addtime"
        label="发送时间"
        width="170">
      </el-table-column>
      <el-table-column
        prop="admin_name"
        label="操作人"
        width="110">
      </el-table-column>
      <el-table-column
        fixed="right"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="primary"
            @click="handleDetails(scope.$index, scope.row)">详情</el-button>
        </template>
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
  import api from '../../api/api'
    export default {
      name: "cardHistory",
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
          api.CardHistory({
            query:{
              page: page,
              limit: limit
            },
            success: res => {
              if(res.status == 200){
                //console.log(res);
                this.total = res.data.count;
                this.tableData = res.data.data;
              }
            }
          })
        },
        handleDetails(index,row){//详情
          //console.log(index,scope);
          this.$router.push({ name: 'cardGroupDetail', params: {log_id: row.log_id}});
        },
        handleSizeChange(val){//每页多少条
          this.limit = val;
        },
        handleCurrentChange(val){//当前页
          this.page = val;
        },
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
  .big_box{
    background-color: #fff;
  }
  .pages {
    padding: 20px 0;
  }
</style>
