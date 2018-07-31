<template>
  <section class="main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-rank"></i> 创建新群</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="drag-box">
        <div class="drag-box-item">
          <div class="item-title">相关规则</div>
          <draggable v-model="todo" @remove="removeHandle" :options="dragOptions">
            <transition-group tag="div" id="todo" class="item-ul">
              <div v-for="(item,index) in todo" class="drag-list" :key="index">
                {{item.content}}
              </div>
            </transition-group>
          </draggable>
        </div>
        <div class="drag-box-item">
          <div class="item-title">创建</div>
          <draggable v-model="doing" @remove="removeHandle" :options="dragOptions">
            <transition-group tag="div" id="doing" class="item-ul">
              <div v-for="(item,index) in doing" class="drag-list" :key="index">
                {{item.content}}
              </div>
            </transition-group>
          </draggable>
        </div>
        <div class="drag-box-item">
          <el-input v-model="input" class="group_name" placeholder="请输入群名称"></el-input>
          <el-button type="primary" class="login_btn">确认创建</el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    data() {
      return {
        input: '',
        dragOptions:{
          animation: 120,
          scroll: true,
          group: 'sortlist',
          ghostClass: 'ghost-style'
        },
        todo: [
          {
            content: '消费5000元以上'
          },
          {
            content: '女性'
          },
          {
            content: '男性'
          },
          {
            content: '年龄在20~25岁'
          },
          {
            content: '消费金额5000以上'
          },
          {
            content: '未消费过'
          },
          {
            content: '消费5次以上'
          }
        ],
        doing: [

        ]
      }
    },
    components:{
      draggable
    },
    methods: {
      removeHandle(event){
        console.log(event);
        this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `);
      }
    }
  }

</script>

<style scoped>
  .drag-box{
    display: flex;
    user-select: none;
  }
  .drag-box-item {
    flex: 1;
    max-width: 330px;
    min-width: 300px;
    background-color: #fff;
    margin-right: 16px;
    border-radius: 6px;
    border: 1px #e1e4e8 solid;
  }
  .item-title{
    padding: 8px 8px 8px 12px;
    font-size: 14px;
    line-height: 1.5;
    color: #24292e;
    font-weight: 600;
  }
  .item-ul{
    padding: 0 8px 8px;
    height: 500px;
    overflow-y: scroll;
  }
  .item-ul::-webkit-scrollbar{
    width: 0;
  }
  .drag-list {
    border: 1px #e1e4e8 solid;
    padding: 10px;
    margin: 5px 0 10px;
    list-style: none;
    background-color: #fffdef;
    border-radius: 6px;
    cursor: pointer;
    -webkit-transition: border .3s ease-in;
    transition: border .3s ease-in;
  }
  .drag-list:hover {
    border: 1px solid #20a0ff;
  }
  .drag-title {
    font-weight: 400;
    line-height: 25px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
  }
  .ghost-style{
    display: block;
    color: transparent;
    border-style: dashed
  }
  .crumbs i{
    margin: 20px 0 20px 10px;
    font-size: 20px;
  }
  .group_name{
    margin-top: 30px;
    width: 80%;
    background-color: #eee;
  }
  .login_btn{
    margin-top: calc(50% + 20px);
  }
</style>
