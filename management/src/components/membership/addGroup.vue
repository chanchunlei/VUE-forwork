<template>
  <section class="main">
    <div v-loading="this.$store.state.loading" class="container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="tagHeader">标签组</span>
          <span class="tagSelected">已选标签</span>
        </div>
        <div class="parent">
          <div class="tagLeft">
            <div class="tagLeftBox">
              <h3 class="tagLeftTitle">选择下面标签组成人群</h3>
              <div class="tagBox">
                <div class="Tagetitle">会员基本属性标签</div>
                <ul class="tagListBox">
                  <li v-for="(item,index) in datas" @click="choose(index)" :class="[item.show ? 'active':'']">{{item.name}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="tagRight">
             <div class="templateDiv">
               <p class="tagRightTitle"><span>新建人群同时需要满足以下标签</span><span class="selectedNum">已选标签:{{num}}</span></p>
               <!--单选-->
               <div v-for="(item,index) in list" v-if="item.model==1" class="template1 animated fadeIn">
                 <div class="templateTitle">
                   <span>{{item.name}}</span>
                   <span @click="clear(item,index)">删除</span>
                 </div>
                 <div class="Box">
                   <template v-for="val in item.data_list">
                     <el-radio-group v-model="item.radio" @change="radioInp(arguments,item)">
                       <el-radio :label="val.typeKey">{{val.typeValue}}</el-radio>
                     </el-radio-group>
                   </template>
                 </div>
               </div>
               <!--多选-->
               <div v-for="(item,index) in list" v-if="item.model==2" class="template2 animated fadeIn">
                 <div class="templateTitle">
                   <span>{{item.name}}</span>
                   <span @click="clear(item,index)">删除</span>
                 </div>
                 <div class="Box">
                   <template>
                     <el-checkbox-group v-model="item.checkbox" @change="multi(arguments,item)">
                       <el-checkbox v-for="val in item.data_list" :key="val.typeKey" :label="val.typeKey">{{val.typeValue}}</el-checkbox>
                     </el-checkbox-group>
                   </template>
                 </div>
               </div>
               <!--数字区间-->
               <div v-for="(item,index) in list" v-if="item.model==3" class="template3 animated fadeIn">
                 <div class="templateTitle">
                   <span>{{item.name}}({{item.company}})</span>
                   <span @click="clear(item,index)">删除</span>
                 </div>
                 <div class="Box">
                   <template>
                     <el-input-number size="mini" v-model="item.num.start" :min="0" label="开始时间"></el-input-number> ~
                     <el-input-number size="mini" v-model="item.num.end" :min="0" label="结束时间"></el-input-number>
                   </template>
                   <div class="msgCue" v-if="item.num.start>=item.num.end">请输入起始时间小于结束时间的时间段!</div>
                 </div>
               </div>
               <!--时间选择-->
               <div v-for="(item,index) in list" v-if="item.model==4" class="template4 animated fadeIn">
                 <div class="templateTitle">
                   <span>{{item.name}}</span>
                   <span @click="clear(item,index)">删除</span>
                 </div>
                 <div class="Box">
                   <template>
                     <div class="block">
                       <el-date-picker
                         v-model="item.times.starttime"
                         type="date"
                         placeholder="开始日期"
                         format="yyyy / MM / dd "
                         value-format="yyyy-MM-dd">
                       </el-date-picker> ~
                       <el-date-picker
                         v-model="item.times.endtime"
                         type="date"
                         placeholder="结束日期"
                         format="yyyy / MM / dd "
                         value-format="yyyy-MM-dd">
                       </el-date-picker>
                     </div>
                   </template>
                   <div class="msgCue" v-if="new Date(item.times.starttime)>=new Date(item.times.endtime)">开始时间请早于结束时间!</div>
                   <div class="msgCue" v-if="new Date(item.times.starttime)>new Date() || new Date(item.times.endtime)>new Date()">请不要选择未来日期!</div>
                 </div>
               </div>

               <!--联动只能选到最后-->
               <div v-for="(item,index) in list" v-if="item.model==5" class="template4 animated fadeIn">
                 <div class="templateTitle">
                   <span>{{item.name}}</span>
                   <span @click="clear(item,index)">删除</span>
                 </div>
                 <div class="Box">
                   <div class="block">
                     <el-cascader
                       placeholder="请选择"
                       v-model="checkbox1"
                       :options="item.data_list"
                       :props="props"
                       @change="linkage(arguments,item)"
                     ></el-cascader>
                   </div>
                 </div>
               </div>
               <!--联动每级可选-->
               <div v-for="(item,index) in list" v-if="item.model==6" class="template4 animated fadeIn">
                 <div class="templateTitle">
                   <span>{{item.name}}</span>
                   <span @click="clear(item,index)">删除</span>
                 </div>
                 <div class="Box">
                   <div class="block">
                     <el-cascader
                       placeholder="请选择"
                       v-model="checkbox2"
                       :options="item.data_list"
                       :props="props"
                       change-on-select
                       @change="linkage(arguments,item)"
                     ></el-cascader>
                   </div>
                 </div>
               </div>
             </div>
             <div v-if="true" class="buildGroup">
               <el-card class="box-card">
                 <div slot="header" class="clearfix">
                   <span>请输入群名称:</span>
                 </div>
                 <el-input
                   class="inpGname"
                   v-model="cname"
                   placeholder="请输入群名称"
                   clearable>
                 </el-input>
                 <el-button type="primary" @click="newGroup" round>确定生成</el-button>
               </el-card>
             </div>
          </div>
        </div>
      </el-card>
    </div>
  </section>
</template>

<script>
  import api from '../../api/api'
  export default {
    data() {
      return {
        datas:[],//默认请求数据
        list:[],//右侧选中标签
        num: 0,//选中
        checkbox1: [],
        checkbox2: [],
        cname: '',//群名
        props: {
          value: 'id',
          label: 'name',
          children: 'children',
        }
      }
    },
    created(){
      api.TagList({//请求默认数据
        query:{},
        success:res=>{
          if(res.status==200){
            for(let i=0;i<res.data.data.length;i++){
              res.data.data[i].show = false;
            }
            this.datas = res.data.data;
            //console.log(this.datas)
          }
        }
      })
    },
    methods: {
      choose(idx){//选中标签
        this.datas[idx].show = true;
        this.list.unshift(this.datas[idx]);
        this.list = Array.from(new Set(this.list));
        this.num = this.list.length;
        //console.log(this.list);
      },
      clear(it,idx){//清楚选中标签
        this.list.splice(idx,1);
        this.num = this.list.length;
        this.datas.forEach(item=>{
          if(item.ltid==it.ltid){
            item.show = false;
          }
        })
      },
      linkage(value,item){
        let index = value[0];//获取id
        let list = this.doing(index,item.data_list);
        item.selected.id = list[0].id;
        item.selected.level = list[0].level;
      },
      doing(val,data){//处理到最后一层
        if(val.length>1){
          for(let i=0;i<val.length;i++){
            let top = data.filter(item=>{
              return val[i] == item.id;
            })
            if(top){
              let arr = val.slice(i+1,val.length);
              // val.splice(i,1);
              return this.doing(arr,top[0].children);
            }
          }
        }else{
          return data.filter(item=>{
            return val[0] == item.id;
          })
        }
      },
      multi(val,item){//多选数据处理
        let values = val[0];
        let lists = [];
        for(let j=0;j<values.length;j++){
          for(let p=0;p<item.data_list.length;p++){
            if(values[j] == item.data_list[p].typeKey){
              let typeItem = {};
              typeItem.typeKey = item.data_list[p].typeKey;
              typeItem.typeValue = item.data_list[p].typeValue;
              lists.push(typeItem);
            }
          }
        }
        item.nowCheckbox = lists;
      },
      radioInp(val,item){//处理单选数据
        let radioVal = val[0], nowRadio = {};
        item.data_list.forEach(child=>{
          if(child.typeKey == radioVal){
            nowRadio.typeKey = child.typeKey;
            nowRadio.typeValue = child.typeValue;
          }
        })
        item.nowRadio = nowRadio;
      },
      newGroup(){//生成群
        let crule = [];
        let model1 = this.list.filter(item=>{return item.model == 1});
        let model2 = this.list.filter(item=>{return item.model == 2});
        let model3 = this.list.filter(item=>{return item.model == 3});
        let model4 = this.list.filter(item=>{return item.model == 4});
        let model5 = this.list.filter(item=>{return item.model == 5});
        let model6 = this.list.filter(item=>{return item.model == 6});
        try{ //监听异常
            model1.forEach(item=>{
              if(!item.radio){
                throw `${item.name}未选择！`;
              }else{
                let obj = {};
                obj.data = item.nowRadio;
                obj.ltid = item.ltid;
                obj.model = item.model;
                crule.push(obj);
              }
            })
          model2.forEach(item=>{
            if(!item.checkbox.length){
            throw `${item.name}未选择！`;
            }else{
              let obj = {};
              obj.data = item.nowCheckbox;
              obj.ltid = item.ltid;
              obj.model = item.model;
              crule.push(obj);
            }
          })
          model3.forEach(item=>{
              if(item.num.start>=item.num.end){
                throw `${item.name}不正确！`;
              }else{
                let obj = {};
                obj.data = item.num;
                obj.ltid = item.ltid;
                obj.model = item.model;
                crule.push(obj);
              }
          })
          model4.forEach(item=>{
            if(new Date(item.times.starttime)>=new Date(item.times.endtime) || new Date(item.times.starttime)>new Date() || new Date(item.times.endtime)>new Date()){
              throw `${item.name}不正确！`;
            }else{
              let obj = {};
              obj.data = item.times;
              obj.ltid = item.ltid;
              obj.model = item.model;
              crule.push(obj);
            }
          })
          model5.forEach(item=>{
             if(item.selected.id == 0){
               throw `${item.name}未选择！`;
             }else{
               let obj = {};
               obj.data = item.selected;
               obj.ltid = item.ltid;
               obj.model = item.model;
               crule.push(obj);
             }
          })
          model6.forEach(item=>{
            if(item.selected.id == 0){
              throw `${item.name}未选择！`;
            }else{
              let obj = {};
              obj.data = item.selected;
              obj.ltid = item.ltid;
              obj.model = item.model;
              crule.push(obj);
            }
          })
          if(crule.length<=0){//判断是否有条件
            throw '请选择生成条件标签！！！';
          }
          if(this.cname.length<=0){//判断是否有群名称
            throw '请确认填好群名称！！！';
          }
          this.produce(crule,this.cname)
        }catch (e) {
          this.infoMsg(e);
        }
      },
      produce(crule,cname){
        api.ProduceGroup({
          query:{
            crule:crule,
            cname:cname
          },
          success:res=>{
            if(res.data.code == 200){
              this.list = [];
              this.cname = '';
              this.num = 0;
              this.datas.forEach(item=>{
                item.show = false;
              })
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
            }else{
              this.$message({
                message: res.data.msg,
                type: 'danger'
              });
            }
          }

        })
      },
      infoMsg(msg){
        this.$notify({
          title: '警告',
          message: msg,
          type: 'warning'
        });
        return false;
      }
    }

  }

</script>

<style scoped>

  .crumbs i{
    margin: 20px 0 20px 10px;
    font-size: 20px;
  }
  .parent{
    overflow: hidden;
  }
  .tagHeader,.tagLeft{
    float: left;
    text-align: left;
    width: 50%;
    font-size: 20px;
    font-weight: 700;
    color: #333;
  }
  .tagLeft,.tagRight{
    height: 570px;
    overflow: hidden;
    position: relative;
  }
  .tagSelected,.tagRight{
    float: right;
    text-align: right;
    width: 50%;
  }
  .tagRight{
    padding-bottom: 150px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
  }
  .tagSelected{
    font-size: 20px;
    font-weight: 700;
    color: #333;
  }
  .tagLeftTitle,.tagRightTitle{
    line-height: 35px;
    color: #333;
    font-size: 16px;
    font-weight: 700;
  }
  .tagRightTitle{
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

  }
  .selectedNum{
    font-size: 16px;
  }
  .tagBox{
    padding: 15px;
    padding-top: 0px;
    font-size: 16px;
    font-weight: 500;
    border: 1px solid #eee;
    box-sizing: border-box;
  }
  .tagLeftBox,.templateDiv{
    width: calc(100% + 17px);
    height: 100%;
    overflow-y: scroll;
  }
  .Tagetitle{
    line-height: 40px;
  }
  .tagListBox{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border: 1px solid #e2e2e2;
    background-color: #f3f7ff;

  }
  .tagListBox>li{
    padding: 5px 10px;
    font-size: 14px;
    margin: 10px 8px;
    border: 1px solid #e2e2e2;
    border-radius: 3px;
    color: #666;
    cursor: pointer;
    background-color: #fff;
  }
  .tagListBox>.active{
    border: 1px solid #3089dc;
    color: #3089dc;
  }
  .templateDiv>div{
    text-align: left;
    margin: 10px 0 10px 10px;
    border: 1px solid #eee;
  }
  .templateTitle{
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
    color: #555;
  }
  .templateTitle>span:last-child{
    color: #2d8cf0;
    cursor: pointer;
  }
  .templateTitle>span:last-child:active{
    color: red;
  }
  .Box{
    line-height: 30px;
    padding: 0 10px 10px;
    box-sizing: border-box;
  }
  /*创建群*/
  .buildGroup{
    position: absolute;
    bottom: 0;
    left: 10px;
    z-index: 10;
    width: calc(100% - 12px);
  }
  .buildGroup>.box-card{
    width: 100%;
  }
  .inpGname{
    width: 40%;
    float: left;
  }
  .clearfix{
    text-align: left;
    font-style: 20px;
    font-weight: 700;
  }
  .msgCue{
    color: #f02d2d;
  }
</style>
