<template>
  <el-card v-loading="this.$store.state.loading" class="box-card">
    <div class="block">
      <span class="demonstration">选择事业群：</span>
      <el-select v-model="teg_id" placeholder="请选择">
        <el-option
          v-for="item in storeList"
          :key="item.teg_id"
          :label="item.teg_name"
          :value="item.teg_id">
        </el-option>
      </el-select>
    </div>
    <div class="block">
      <span class="demonstration">请输入券名称：</span>
      <el-input class="inp" v-model="name" placeholder="请输入优惠券关键字！"></el-input>
    </div>
    <div class="block">
      <span class="demonstration">筛选日期：</span>
      <el-date-picker
        v-model="before_time"
        type="date"
        :clearable="false"
        value-format="yyyy-MM-dd"
        placeholder="开始日期">
      </el-date-picker>
      <el-date-picker
        v-model="end_time"
        type="date"
        :clearable="false"
        value-format="yyyy-MM-dd"
        placeholder="结束日期">
      </el-date-picker>
    </div>
    <div class="block">
      <el-button type="success" @click="requestInfo" round>确定</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%; text-align: left">
        <el-table-column
          prop="name"
          label="券名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="card_total"
          label="券发放量"
          width="140">
        </el-table-column>
        <el-table-column
          prop="no_receive"
          label="剩余未领"
          width="130">
        </el-table-column>
        <el-table-column
          prop="receive_total"
          label="已领取量"
          width="130">
        </el-table-column>
        <el-table-column
          prop="receive_user"
          label="领取用户量"
          width="140">
        </el-table-column>
        <el-table-column
          prop="receive_proportion"
          label="已领数量占比"
          width="140">
        </el-table-column>
        <el-table-column
          prop="use_total"
          label="使用数量占比"
          width="140">
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="pages">
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        :total="total">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
  import api from '../../api/api'
  export default {
    name: "couponDetail",
    data(){
      return{
        storeList: [],
        before_time: '',
        end_time: '',
        tableData: [],
        name: '',
        page: 1,
        total: 0,
        teg_id: '0'
      }
    },
    created(){
      this.storeinfo();
      this.tableList();
    },
    methods:{
      storeinfo(){
        api.BusinessGroup({
          success:res=>{
           //console.log(res);
            if(res.status == 200){
              let obj = {
                teg_id: '0',
                teg_name: "全部"
              }
              this.storeList = res.data.data;
              this.storeList.unshift(obj);
            }
          }
        })
      },
      handleCurrentChange(val){//当前页
        this.page = val;
      },
      requestInfo(){//提交数据
        try {
          if(new Date(this.before_time)>=new Date(this.end_time)){ throw `请选择开始时间早于结束时间的区间！`}
          this.tableList();
        }catch (err) {
          this.$message.error(err);
        }
        this.tableList();
      },
      tableList(){
        api.CouponDetailList({
          query:{
            teg_id: this.teg_id,
            name: this.name,
            before_time: this.before_time,
            end_time: this.end_time,
            page: this.page

          },
          success:res=>{
            //console.log(res);
            if(res.status == 200){
              this.tableData = res.data.data.card;
              this.total = res.data.data.count;
            }
          }
        })
      }
    },
    watch:{
      page(val){
        this.tableList();
      }
    }
  }
</script>

<style scoped>
  .block{
    line-height: 50px;
    text-align: left;
  }
  .pages{
    padding: 20px 0;
  }
  .inp{
    width: 35%
  }
</style>
