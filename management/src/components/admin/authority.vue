<script src="../../../../../lnk-address-cascader.js"></script>
<template>
   <div v-loading="this.$store.state.loading">
     <div class="block">
       <h2>角色名:{{this.$route.params.name}}</h2>
       <span class="demonstration">权限分类筛选：</span>
       <el-cascader
         expand-trigger="hover"
         :options="options"
         v-model="selectedOptions"
         @change="handleChange">
       </el-cascader>
       <el-button type="primary" @click="selectAll" round>全选</el-button>
       <el-button type="primary" @click="dselectAll" round>全不选</el-button>
     </div>
     <div>
       <el-card v-for="(item,index) in cardList" v-if="item.auth.length>0" :key="index" class="box-card">
         <div slot="header" class="clearfix" :style="{fontSize:26-item.count*4+'px'}">
           <span>{{item.cate_name}}</span>
         </div>
         <div v-for="child in item.auth" class="switch">
           <div>
             {{child.auth_name}}
           </div>
           <el-switch
             v-model="child.status"
             active-color="#13ce66"
             inactive-color="#ff4949">
           </el-switch>
         </div>
       </el-card>
     </div>
     <div class="submitBtn">
       <el-button type="primary" size="medium" round @click="FormVisible">确认修改</el-button>
     </div>
   </div>
</template>

<script>
  import api from '../../api/api'
    export default {
        name: "authorityS",
      data(){
        return{
          list: [],//选择器数据
          options: [],//递归后选择器数据
          selectedOptions: [],
          cate_id: 0,
          term: '',
          cardList:[],
          initData:[],//原始数据
          first: {//加一条
            value:0,
            label: '全部'
          },
          r_id: ''
        }
      },
      created(){
        this.classify();
        this.classifyList();
      },
      beforeRouteUpdate (to, from, next) {//导航守卫组件复用
        next();
        this.classify();
        this.classifyList();
      },
      methods:{
        rId(){//获取已有权限
          if(this.$route.params.id){
            api.RoleAuth({
              query:{
                r_id: this.$route.params.id
              },
              success:res=>{
                if(res.status==200){
                  let roleAuth = res.data.data;
                  for(let i=0;i<this.initData.length;i++){
                    for(let j=0;j<this.initData[i].auth.length;j++){
                      this.cardList[i].auth[j].status = false;
                      for(let p=0;p<roleAuth.length;p++){
                        if(this.initData[i].auth[j].id == roleAuth[p].id){
                          this.cardList[i].auth[j].status = true;
                        }
                      }
                    }
                  }
                }
              }
            })
          }
        },
        handleChange(value) {//筛选
          this.cate_id = value[value.length-1];
          if(this.cate_id == 0){
            this.cardList = this.initData;
          }else{
            for(var i=0;i<this.initData.length;i++){
              if(this.initData[i].cate_id==this.cate_id){
                this.cardList = [];
                this.cardList.push(this.initData[i]);
              }
            }
          }
        },
        classify(){//请求分类表
          api.AuthListCate({
            query:{},
            success:res=>{
              if(res.status == 200){
                let datas = res.data.data;
                for(let key in datas){
                  datas[key].value = datas[key].cate_id;
                  datas[key].label = datas[key].cate_name;
                }
                this.list = datas;
                this.options = this.recursion(this.list);
                this.options.unshift(this.first);
                //console.log(this.list);
                //console.log(this.options);
              }
            }
          })
        },
        recursion(data){//无限级分类
          let tree = data.filter(father=>{
            let branchArr = data.filter(child=>{
              return father.cate_id == child.pid;//cate_id有对应的pid就是有子集
            });
            if(branchArr.length>0){ //大于0表示有子集
              father.children = branchArr;  //给字段加入
            }
            return father.pid == 0;//最顶级
          });
          return tree;
        },
        classifyList(){//权限数据
          api.AuthList({
            query:{},
            success:res=>{
                if(res.status == 200){
                  let datas = res.data.data;
                  for(let i=0;i<datas.length;i++){//加入状态
                    for(let j=0;j<datas[i].auth.length;j++){
                      datas[i].auth[j].status = false;
                    }
                  }
                  this.initData = datas;
                  this.cardList = datas;
                  this.rId();
                  //console.log(this.initData);
                }
            }
          })
        },
        FormVisible(){//保存/确认修改
          let setId = [];
          for(let i=0;i<this.initData.length;i++){//加入状态
            for(let j=0;j<this.initData[i].auth.length;j++){
              if(this.initData[i].auth[j].status == true){
                setId.push(this.initData[i].auth[j].id)
              }
            }
          }
          api.SetRole({//设置权限
            query:{
              r_id: this.$route.params.id,
              auth_ids: setId
            },
            success:res=>{
               this.Msg(res)
            }
          })
          //console.log(setId)
        },
        Msg(res){//提示消息
          if(res.data.code == 200){
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.requestData();
          }else{
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        },
        selectAll(){//全选
          for(let i=0;i<this.cardList.length;i++){//加入状态
            for(let j=0;j<this.cardList[i].auth.length;j++){
              this.cardList[i].auth[j].status = true;
            }
          }
        },
        dselectAll(){//全不选
          for(let i=0;i<this.cardList.length;i++){//加入状态
            for(let j=0;j<this.cardList[i].auth.length;j++){
              this.cardList[i].auth[j].status = false;
            }
          }
        },
      }
    }
</script>

<style scoped>
.block{
  margin: 15px 0;
  position: relative;
}
.block>h2{
  position: absolute;
  left: 15px;
  top: 10px;
  font-size: 22px;
  color: #666;
  font-weight: 500;
}
.box-card{
  text-align: left;
  margin: 10px 15px;
}
.clearfix{
  font-size: 20px;
  color: #333;
}
.switch{
  display: inline-block;
  margin: 0 15px;
}
.submitBtn{
  margin: 15px 0 20px;
}
</style>
