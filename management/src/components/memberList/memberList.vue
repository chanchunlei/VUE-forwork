<template>
  <div v-loading="this.$store.state.loading" class="big_box">
    <div class="handle-box">
      <div class="tagBoxSelect">
        <span class="titleSelected">表头标签：</span>
        <el-select class="tagSelect" @change="syllable" v-model="value" multiple placeholder="请选择要展示的标签">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button type="success" size="mini" @click="downloadFile" slot="reference">导出会员信息</el-button>
        <el-button type="success" size="mini" @click="downloadOrder" slot="reference">导出订单信息</el-button>
      </div>

    </div>
    <div class="tagSelf">
       <div class="popoverBox">
         <el-button type="primary" @click="showPopover" slot="reference">自定义筛选</el-button>
         <div class="popover" v-if="showPop">
           <el-button type="success" @click="newModel" icon="el-icon-edit" round>增加模板</el-button>
           <el-card :body-style="{ padding: '10px' }" v-for="(card,index) in ruleOptions" :key="index" class="box-card">
             <!--筛选条件-->
             <div class="titleRaw">
               <span>请选择筛选条件:</span>
               <el-button class="deleteRaw" size="mini" @click="deleteRaw(index)" type="danger">删除此模板</el-button>
             </div>

             <el-select v-model="card.checkedCities" value-key="w_id" @change="chooseData(arguments,card)" placeholder="请选择">
               <el-option
                 v-for="item in card.rawData"
                 :key="item.w_id"
                 :label="item.name"
                 :value="item">
               </el-option>
             </el-select>
             <!--筛选内容-->
             <!--一般类型-->
             <el-card v-for="kind in card.chooseArray" v-if="kind.type === 1" :key="kind.w_id" :body-style="{ padding: '10px' }" class="box-card">
               <div class="clearfix">
                 <span>{{kind.name}}:</span>
                 <span class="delete" @click="deleteChoose(kind,card.chooseArray)">删除</span>
               </div>
               <div class="crule">
                 <span>关系:</span>
                 <el-select v-model="kind.cruleModel" value-key="id" class="relation" placeholder="请选择">
                   <el-option
                     v-for="relation in kind.crule"
                     :key="relation.id"
                     :label="relation.s_name"
                     :value="relation.id">
                   </el-option>
                 </el-select>
               </div>
               <!--选择型-->
               <span>筛选:</span>
               <el-select v-if="kind.value instanceof Array" v-model="kind.valueModel" class="relation" placeholder="请选择">
                 <el-option
                   v-for="selected in kind.value"
                   :key="selected.value"
                   :label="selected.key"
                   :value="selected.value">
                 </el-option>
               </el-select>
               <!--输入型-->
               <el-input v-else-if="kind.value === 1" v-model="kind.valueModel" type="number" placeholder="请输入号码"></el-input>
             </el-card>
             <!--时间区间类型-->
             <el-card v-for="times in card.chooseArray" v-if="times.type === 2" :key="times.w_id" :body-style="{ padding: '10px' }" class="box-card">
               <div class="clearfix">
                 <span>{{times.name}}:</span>
                 <span class="delete" @click="deleteChoose(times,card.chooseArray)">删除</span>
               </div>
               <div class="crule">
                 <span>关系:</span>
                 <el-select v-model="times.cruleModel" class="relation" placeholder="请选择">
                   <el-option
                     v-for="relation in times.crule"
                     :key="relation.id"
                     :label="relation.s_name"
                     :value="relation.id">
                   </el-option>
                 </el-select>
                 <div class="block">
                   <span class="demonstration">起始:</span>
                   <el-date-picker
                     v-model="times.start"
                     type="date"
                     placeholder="选择日期"
                     value-format="yyyy-MM-dd">
                   </el-date-picker>
                 </div>
                 <div class="block">
                   <span class="demonstration">结束:</span>
                   <el-date-picker
                     v-model="times.end"
                     type="date"
                     placeholder="选择日期"
                     value-format="yyyy-MM-dd">
                   </el-date-picker>
                 </div>
               </div>
             </el-card>
             <!--模板结束-->
           </el-card>
           <!--提交-->
           <el-row class="btn">
             <el-button @click="submitPop" type="primary" size="small">确认</el-button>
             <el-button @click="hidePop" type="danger" size="small">取消</el-button>
           </el-row>

       </div>
       </div>
      <div class="term">
        <el-tag
          class="tags"
          v-for="(tag,index) in tags"
          :key="tag.name"
          closable
          @close="handleClose(tag,index)"
          :type="tag.type">
          {{tag.name}}
        </el-tag>
      </div>
    </div>
    <el-table class="box"
              :data="list"
              border
              style="width: 100%">
      <el-table-column
        fixed
        prop="strBncCode"
        label="商益号"
        width="150">
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
        width="150"
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
    data() {
      return {
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
          value: 'vip_level',
          label: '会员等级'
        },{
          value: 'amount_num',
          label: '交易总金额'
        },{
          value: 'ie_num',
          label: '优惠券总数'
        },{
          value: 'max_or_time',
          label: '最近交易时间'
        },{
          value: 'min_or_time',
          label: '首次交易'
        },{
          value: 'o_num',
          label: '交易总数'
        }],
        optionList:[],//选择显示字段
        value: [],//已选字段
        tags: [], //标签
        ruleOptions: [], //筛选规则原始数据
        rawData: [],     //原始筛选数据
        rawJson: {},     //渲染模板使用json
        chooseArray: [], //选定子条件
        switchModel: '', //子集筛选条件
        cruleModel: '', //关系
        input: '',     //输入框
        submitData: [],    //提交参数处理
        showPop: false
      }
    },
    created(){
      this.optionList = this.options;//最开始所有数据都显示
      this.fetchData(this.limit,this.page,this.submitData);
    },
    methods: {
      downloadFile(){//导出会员信息
        api.File({
          success:res=>{
            //console.log(res)
            if(res.headers["content-type"] =="application/json"){
              this.$message.error('你暂时无此功能的权限！');
            }else{
              let blob = new Blob([res.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
              const fileName = '会员数据表格.xlsx';
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
      },
      downloadOrder(){
        api.Order({
          success:res=>{
            if(res.headers["content-type"] =="application/json"){
              this.$message.error('你暂时无此功能的权限！');
            }else {
              let blob = new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
              const fileName = '订单表格.xlsx';
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
      },
      fetchData(limit,page,s_data){//数据请求
        api.MemberList({
          query:{
            limit: limit,
            page: page,
            s_data: s_data
          },
          success:res=>{
            //console.dir(res);
            if(res.status == 200){
              this.total = res.data.count;//总条数
              this.tableData = res.data.data;//列表数据
              this.list = res.data.data;
              this.rawData = res.data.s_data; //存起原始筛选数据
              this.rawJson.rawData = this.rawData; //存起json原始数据
              this.rawJson.chooseArray = this.chooseArray; //存起一个空数组选择子集
              this.$set(this.rawJson,'checkedCities',{});// 存起一筛选v-model;vue不可监听到对象属性的添加或删除
              this.ruleOptions.push(JSON.parse(JSON.stringify(this.rawJson))); //将上面数据进行深拷贝
              this.tableData.forEach((item)=>{//表格
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
          selected[index].strBncCode = child.strBncCode;
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
              optionsArr.unshift(item);
            }
          })
        })
        this.list = selected;
        this.optionList = optionsArr;
      },
      showPopover(){//显示自定义属性标签
        this.showPop = !this.showPop;
        this.ruleOptions = [];
        this.ruleOptions.push(JSON.parse(JSON.stringify(this.rawJson))); //将上面数据进行深拷贝
      },
      submitPop(){//提交筛选
        try{
          let arr1 = [];
          let arr2 = [];
          let arrays1 = [];
          let arrays2 = [];
          this.ruleOptions.forEach(father=>{
            if(father.chooseArray.length == 0){ throw "请选择筛选条件！" }
            father.chooseArray.forEach(child=>{
              if(child.cruleModel == ""){ throw `${child.name}关系未选择！`}
              let obj = {},tagName = {};
              obj.w_id = child.w_id;
              tagName.w_id = child.w_id;
              obj.crule = child.cruleModel;
              tagName.crule = child.cruleModel;
              if(child.type == 1){
                if(child.valueModel == ""){ throw `${child.name}条件未选择！`}
                obj.value = child.valueModel;
                tagName.value = child.valueModel;
                if(child.value instanceof Array){
                  child.value.forEach(item=>{
                    if(child.valueModel == item.value){tagName.name = item.key;}
                  })
                }else{
                  tagName.name = child.name;
                }
              }else if(child.type == 2){
                if(child.start == "" || child.end == ""){ throw `${child.name}区间未选择！`}
                if(new Date(child.start)>=new Date(child.end)){ throw `请选择开始时间早于结束时间的区间！`}
                obj.start = child.start;
                tagName.start = child.start;
                obj.end = child.end;
                tagName.end = child.end;
                tagName.name = `${child.name}：${child.start}~${child.end}`;
              }
              arrays2.push(tagName);
              arrays1.push(obj);
            })
          })
          arrays1.forEach(item=>{ //转化为字符串去重
            if(arr1.indexOf(JSON.stringify(item)) == -1){
              arr1.push(JSON.stringify(item));
            }
          })
          arr1.forEach(item=>{ //转回json
            this.submitData.push(JSON.parse(item));
          })
          arrays2.forEach(item=>{//转化为字符串去重
            if(arr2.indexOf(JSON.stringify(item)) == -1){
              arr2.push(JSON.stringify(item));
            }
          })
          arr2.forEach(item=>{//转回json
            this.tags.push(JSON.parse(item));
          })
          if(this.ruleOptions.length>0){
            this.fetchData(this.limit,this.page,this.submitData);
            this.ruleOptions.splice(0);
          }
          this.showPop = false;
        }catch (err) {
          this.$notify({
            title: '警告',
            message: err,
            type: 'warning'
          });
        }
      },
      hidePop(){//取消筛选
        this.showPop = false;
        this.ruleOptions.splice(0);
      },
      newModel(){//添加新模板
        this.ruleOptions.unshift(JSON.parse(JSON.stringify(this.rawJson)));
      },
      deleteRaw(index){//删除此模板
        //console.log(this.ruleOptions);
        this.ruleOptions.splice(index,1);
      },
      deleteChoose(item,arr){//清楚当前已经选定的子项
        if(arr.indexOf(item) != -1){
          let i = arr.indexOf(item);
          arr.splice(i,1);
        }
      },
      handleClose(tag,idx){//关闭标签
        delete tag.name;
        this.tags.splice(idx,1); //删除此标签
        this.submitData.forEach((item,index)=>{//删除此条筛选提交条件
          if(JSON.stringify(item) == JSON.stringify(tag)){
            this.submitData.splice(index,1);
          }
        })
        this.fetchData(this.limit,this.page,this.submitData);
      },
      chooseData(val,card){//选择筛选子项
        if(card.chooseArray.indexOf(val[0]) != -1){
          this.$message('此模板中已经选过该筛选条件,请增加新的模板!');
          return false;
        }else{
          this.$set(val[0],'cruleModel','');
          if(val[0].type == 1){//判断类型添加字段
            this.$set(val[0],'valueModel','');
          }else if(val[0].type == 2){
            this.$set(val[0],'start','');
            this.$set(val[0],'end','');
          }
          card.chooseArray.unshift(val[0]);
        }
      },
      handleCoupon(index, row){//操作
        console.log(index, row);
      }
    },
    watch:{
      limit(val){
        this.fetchData(val,this.page,this.submitData);
      },
      page(val){
        this.fetchData(this.limit,val,this.submitData);
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
  .tagSelf{
    width: 100%;
    line-height: 30px;
    text-align: left;
    padding: 0 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
  }
  .term{
    margin-left: 5px;
    margin-top: 4px;
    border-bottom: 1px solid #d9d9d9;
  }
  .tags{
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .titleRaw{
    font-size: 18px;
    font-weight: 600;
  }
  .box-card{
    margin-top: 10px;
  }
  .crule{
    line-height: 20px;
  }
  .delete{
    float: right;
    color: #3a8ee6;
    cursor: pointer;
  }
  .delete:active{
    color: #f10125;
  }
  .relation{
    height: 50px;
  }
  .popoverBox{
    position: relative;
  }
  .popover{
    position: absolute;
    top: 50px;
    width: 400px;
    height: 500px;
    z-index: 20;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #d9d9d9;
    overflow-y: scroll;
    border-radius: 10px;
    box-shadow: 12px 12px 12px 0 rgba(0,0,0,.1);;
  }
  .btn{
    padding-top: 10px;
    text-align: right;
  }
  .deleteRaw{
    float: right;
  }
</style>
