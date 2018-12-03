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
        width="130">
      </el-table-column>
      <el-table-column
        prop="cname"
        label="群名称"
        width="110">
      </el-table-column>
      <el-table-column
        prop="exec_time"
        label="最后更新时间"
        width="110">
      </el-table-column>
      <el-table-column
        label="标签"
        >
        <template class="tags" slot-scope="scope">
          <el-tag class="tag_cell" v-for="item in scope.row.crule" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="c_count"
        label="群成员总数"
        width="110">
      </el-table-column>
      <el-table-column
        fixed="right"
        width="320"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleRecord(scope.$index, scope.row)">群成员</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleDetails(scope.$index, scope.row)">群详情</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleCoupon(scope.$index, scope.row)">送券</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
    data() {
      return {
        tableData: [],
        total: 0,
        page: 1,//当前页
        limit: 10//每页显示条数
      }
    },
    created(){
      this.list(this.page,this.limit);
    },
    methods: {
      list(page,limit){//数据
        api.GroupList({
          query:{
            page: page,
            limit: limit
          },
          success:res=>{
            if(res.status == 200){
              //console.log(res);
              this.total = res.data.count;
              this.tableData = res.data.data;
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
      handleRecord(index, row) {
        this.$router.push({ name: 'groupmember', params: {cid: row.cid}});
      },
      handleDetails(index, row) {
        this.$router.push({ name: 'groupdetail', params: {cid: row.cid}});
      },
      handleCoupon(index, row){
        console.log(index, row);
      },
      handleDelete(index,row){
        api.DeleteGroup({
          query:{
            cid: row.cid
          },
          success:res=>{
            if(res.status == 200){
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.list(this.page,this.limit);
            }
          }
        })
      }
    },
    watch:{
      limit(val){
        this.list(this.page,val);
      },
      page(val){
        this.list(val,this.limit);
      }
    }
  }
</script>

<style scoped>
  .big_box{
    background-color: #fff;
  }
  .tag_cell{
    margin: 3px;
  }
  .pages{
    padding: 15px 0;
  }
</style>
