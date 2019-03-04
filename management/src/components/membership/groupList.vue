<template>
  <div v-loading="this.$store.state.loading" class="big_box">
    <!--表格-->
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
            type="danger"
            size="mini"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="pages">
      <el-pagination
        background
        layout="total,sizes,prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total">
      </el-pagination>
    </div>
    <!--送券弹框-->
    <el-dialog width="850px" @close="cancelIt" custom-class="tableBody" title="选择优惠券" :visible.sync="outerVisible">
      <el-dialog
        width="30%"
        title="确认发券信息："
        :visible.sync="innerVisible"
        @close="cancelIt"
        append-to-body>
        <div class="msg">群名称：{{cName}}</div>
        <div class="msg">券名称：{{couponDetail.name}}</div>
        <div class="msg">是否发送短信：{{switchVal ? '是' : '否'}}</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelIt">取 消</el-button>
          <el-button type="primary" @click="ensureCoupon">确定</el-button>
        </div>

      </el-dialog>
      <el-table border :data="gridData">
        <el-table-column label="卡券ID" width="75">
          <template slot-scope="scope">
            <el-radio v-model="scope.row.radio" :label="scope.row.ipid" @change="handleRadio"></el-radio>
          </template>
        </el-table-column>
        <el-table-column property="name" label="卡券名称" width="100"></el-table-column>
        <el-table-column property="limited" width="70" label="单用户领取上限"></el-table-column>
        <el-table-column property="total" width="100" label="卡券总量"></el-table-column>
        <el-table-column property="remain" width="80" label="卡券销量"></el-table-column>
        <el-table-column property="up_begin" width="160" label="上架开始时间"></el-table-column>
        <el-table-column property="up_end" width="160" label="上架结束时间"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-switch
          class="switchs"
          v-model="switchVal"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="SendMsg"
          active-text="发送短信"
          inactive-text="不发送短信">
        </el-switch>
        <el-button @click="cancelIt">取 消</el-button>
        <el-button type="primary" @click="ensure">确定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import api from '../../api/api'
  export default {
    name: 'groupListS',
    data() {
      return {
        tableData: [],
        total: 0,
        page: 1,//当前页
        limit: 10,//每页显示条数
        outerVisible: false,
        innerVisible: false,
        gridData: [],//优惠券列表
        radio: '',  //选中优惠券
        switchVal: false,
        couponDetail: {},
        is_dx: 0,  //是否发送短信
        cid: '', //群ID
        cName: '' //群名称
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
        //console.log(row.cid);
        this.$router.push({ name: 'groupdetail', params: {cid: row.cid}});
      },
      handleCoupon(index, row){//送券
        this.outerVisible = true;
        this.cid = row.cid;
        this.cName = row.cname;
        api.CouponList({
          success:res=> {
            //console.log(res)
            if(res.status == 200){
              res.data.data.forEach(item=>{
                item.radio = '';
              })
              this.gridData = res.data.data;
            }
          }
        })
        //console.log(index, row);
      },
      handleRadio(val){//选择优惠券
        this.radio = val;
        this.gridData.forEach(item=>{
          if(item.ipid !== val){
            item.radio = '';
          }else{
            this.couponDetail = item;
          }
        })
      },
      SendMsg(val){//发送信息的权限
        if(val){
          api.MsgPower({
            success:res=>{
              //console.log(res)
              if(res.data.code !== "200"){
                this.switchVal = false;
                this.is_dx = 0;
                this.$message.error('无此功能权限！');
              }else{
                this.is_dx = 1;
              }
            }
          })
        }else{
          this.is_dx = 0;
        }
      },
      cancelIt(){//取消初始化数据
        this.outerVisible = false;
        this.innerVisible = false;
        this.couponDetail = {};
        this.is_dx = 0;
        this.switchVal = false;
      },
      ensure(){//确定
        if(this.couponDetail.ipid){
          this.innerVisible = true;
        }else{
          this.$message.error('还未选择优惠券！');
        }
      },
      ensureCoupon(){//确定发券
        this.outerVisible = false;
        this.innerVisible = false;
        api.CouponSend({
          query:{
            cid: this.cid,
            ipid: this.couponDetail.ipid,
            is_dx: this.is_dx
          },
          success:res=>{
            if(res.status == 200){
              if(res.data.code == 530){
                this.$message.error(res.data.msg);
              }else{
                this.$message(res.data.msg);
              }
              this.cancelIt();
            }
          }
        })
      },
      handleDelete(index,row){
        this.$confirm('此操作将删除该群, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
  .msg{
    font-size: 18px;
    line-height: 30px;
  }
  .el-dialog__body{
    padding-top: 0;
  }
  .tableBody{
    padding: 0;
    height: 500px;
    overflow-y: scroll;
  }
  .switchs{
    float: left;
  }
</style>
