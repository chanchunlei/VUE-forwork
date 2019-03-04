<template>
  <div class="big_box" v-loading="this.$store.state.loading">
    <!--筛选-->
    <div class="handle-box">
      <div class="tagBoxSelect">
        <span class="titleSelected">展示字段：</span>
        <el-select class="tagSelect" @change="syllable" v-model="value" multiple placeholder="请选择要展示的字段">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="btn">
        <el-button type="success" @click="downloadFile">导出会员手机号</el-button>
      </div>
    </div>
    <!--表格-->
    <el-table class="box"
              :data="list"
              border
              style="width: 100%">
      <el-table-column
        fixed
        prop="cid"
        label="人群ID"
        width="130">
      </el-table-column>
      <el-table-column
        v-for="item in optionList"
        width="150"
        :prop="item.value"
        :key="item.value"
        :label="item.label">
      </el-table-column>

      <el-table-column
        fixed="right"
        width="250"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleRecord(scope.$index, scope.row)">详情</el-button>
          <el-button
            size="small"
            type="primary"
            @click="handleCoupon(scope.$index, scope.row)">送券</el-button>
          <el-button
            size="small"
            type="success"
            @click="handleOrder(scope.$index, scope.row)">交易信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="pages">
      <el-pagination
        background
        layout="total,sizes,prev, pager, next, jumper"
        :page-sizes="[20, 50, 100, 200]"
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
        <div class="msg">手机号：{{mobile}}</div>
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
    name: 'groupmemberS',
    data() {
      return {
        select_cate: '',
        select_word: '',
        page: 1,//当前页
        limit: 20,//每页显示条数
        total: 0,
        tableData: [],//默认表格数据
        list: [],//表格数据渲染
        options: [{//默认显示字段
          value: 'birthday',
          label: '生日'
        }, {
          value: 'bu_name',
          label: '所属公众号'
        }, {
          value: 'mobile',
          label: '会员手机号'
        }, {
          value: 'province',
          label: '号码归属地'
        }, {
          value: 'reg_time',
          label: '注册时间'
        },{
          value: 'sex',
          label: '性别'
        },{
          value: 'strBncCode',
          label: '商益号'
        },{
          value: 'vip_level',
          label: '会员等级'
        }],
        optionList:[],//选择显示字段
        value: [],//已选字段
        power: 0, //权限
        outerVisible: false,
        innerVisible: false,
        gridData: [],//优惠券列表
        radio: '',  //选中优惠券
        switchVal: false,//是否发送短信状态
        couponDetail: {},
        is_dx: 0,  //是否发送短信
        strBncCode: '', //商益号
        mobile: '' //手机号
      }
    },
    created(){
      this.optionList = this.options;//最开始所有数据都显示
      this.fetchData(this.limit,this.page);
    },
    methods: {
      downloadFile(){//导出信息
        if(this.power == 1){
          api.GroupMemberFile({
            query:{
              cid: this.$route.params.cid,
            },
            success:res=>{
              //console.log(res)
              if(res.headers["content-type"] =="application/json"){
                this.$message.error('你暂时无此功能的权限！');
              }else{
                let blob = new Blob([res.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                const fileName = `会员手机号表格${Date.parse(new Date())}.xlsx`;
                if ('download' in document.createElement('a')) { // 非IE下载
                  const elink = document.createElement('a');
                  elink.download = fileName;
                  elink.style.display = 'none';
                  elink.href = URL.createObjectURL(blob);
                  document.body.appendChild(elink);
                  elink.click();
                  URL.revokeObjectURL(elink.href); // 释放URL 对象
                  document.body.removeChild(elink);
                } else { // IE10+下载
                  navigator.msSaveBlob(blob, fileName);
                }
              }
            }
          })
        }else {
          this.$message.error('你暂时无此功能的权限！');
        }

      },
      fetchData(limit,page){//数据请求
        api.GroupMemberList({
          query:{
            cid: this.$route.params.cid,
            limit: limit,
            page: page
          },
          success:res=>{
            if(res.status == 200){
              this.total = res.data.count;
              this.tableData = res.data.data;
              this.list = res.data.data;
              this.power = res.data.out_auth;
              this.tableData.forEach((item)=>{
                if(item.sex == 1){ item.sex = "男";}else if(item.sex == 2){ item.sex = "女";}
                if(item.vip_level == 1){ item.vip_level = "一般会员";}else if(item.vip_level == 2){ item.vip_level = "vip会员";}
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
      syllable(val){//选定要显示的字段
        let selected = [];
        let optionsArr = [];
        this.tableData.forEach((child,index)=>{
          selected[index] = {};
          selected[index].cid = child.cid;
          for(let key in child){
            val.forEach(father=>{
              if(father == key){
                selected[index][key] = child[key];
              }
            })
          }
        })
        val.forEach(father=>{
          this.options.forEach((item)=>{
            if(father == item.value){
              optionsArr.push(item);
            }
          })
        })
        this.list = selected;
        this.optionList = optionsArr;
      },
      handleRecord(index, row) {//详情操作
        this.$router.push({ name: 'record', params: {strBncCode: row.strBncCode}});
      },
      handleOrder(index, row){//交易信息
        this.$router.push({ name: 'transaction', params: {strBncCode: row.strBncCode}});
      },
      handleCoupon(index, row) {//送券操作
        this.outerVisible = true;
        this.strBncCode = row.strBncCode;
        this.mobile = row.mobile;
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
      cancelIt() {//点击取消，初始化数据
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
        api.SingleCouponSend({
          query:{
            strBncCode: this.strBncCode,
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
      }
    },
    beforeRouteUpdate (to, from, next) {//导航守卫组件复用
      next();
      this.optionList = this.options;//最开始所有数据都显示
      this.fetchData(this.limit,this.page);
    },
    watch:{
      limit(val){
        this.fetchData(val,this.page);
      },
      page(val){
        this.fetchData(this.limit,val);
      },
      // $route(newValue, oldValue){//监听路由改变
      //   this.optionList = this.options;//最开始所有数据都显示
      //   this.fetchData(this.limit,this.page);
      // },
    }
  }
</script>

<style scoped>
  .big_box{
    background-color: #fff;
  }
  .titleSelected{
    font-size: 16px;
    color: #333;
    font-weight: 700;
  }
  .handle-box {
    padding-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
  .tagBoxSelect{
    width: 70%;
    padding-left: 40px;
    text-align: left;
  }
  .tagSelect{
    width: 60%;
  }
  .pages{
    padding: 15px 0;
  }
  .switchs{
    float: left;
  }
</style>
