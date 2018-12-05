<template>
  <div class="big_box">
    <div class="handle-box">
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
        width="200"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleCoupon(scope.$index, scope.row)">送券</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages">
      <el-pagination
        background
        layout="sizes,prev, pager, next, jumper"
        :page-sizes="[20, 50, 100, 200]"
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
      }
    },
    created(){
      this.optionList = this.options;//最开始所有数据都显示
      this.fetchData(this.limit,this.page);
    },
    methods: {
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
      handleCoupon(index, row){//操作
        console.log(index, row);
      }
    },
    watch:{
      limit(val){
        this.fetchData(val,this.page);
      },
      page(val){
        this.fetchData(this.limit,val);
      }
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
  }
  .tagSelect{
    width: 40%;
  }

  .pages{
    padding: 15px 0;
  }
</style>
