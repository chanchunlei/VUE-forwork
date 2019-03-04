<template>
  <div>
    <div class="addBtn">
      <el-button type="primary" round @click="FormVisible">添加角色</el-button>
      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="管理员角色" :label-width="formLabelWidth">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" :label-width="formLabelWidth">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="Doit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table
      v-loading="this.$store.state.loading"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="角色描述">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="medium"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
            size="medium"
            type="primary"
            @click="handleSet(scope.$index, scope.row)">设置权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>确认删除?</span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="deleteThis(indexDel,roleId)">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from '../../api/api'
  export default {
    name:'roleList',
    data() {
      return {
        tableData: [],
        centerDialogVisible: false,
        dialogFormVisible: false,
        isAdd: true,
        roleId: '',
        indexDel:'',
        form: {
          name: '',
          remark:''
        },
        title: '添加角色',
        formLabelWidth: '120px',
      }
    },
    created(){
      this.requestData();
    },
    methods:{
      Doit(){//判断是编辑还是添加
        if(this.isAdd){
          this.addRole();
        }else{
          this.EditRole();
        }
      },
      addRole(){//添加角色
        this.dialogFormVisible = false;
        //console.log(this.form);
        api.AddRole({
          query:{
            name: this.form.name,
            remark: this.form.remark
          },
          success:res=>{
            this.Msg(res);
          }
        })
      },
      EditRole(){//修改角色
        this.dialogFormVisible = false;
        api.EditRole({
          query:{
            id:this.roleId,
            data:{
              name: this.form.name,
              remark: this.form.remark
            }
          },
          success:res=>{
            this.Msg(res);
          }
        })
      },
      deleteThis(index,id){//删除角色
        this.centerDialogVisible = false;
        this.tableData.splice(index,1);
        api.DeleteRole({
          query:{
            id:id
          },
          success:res=>{
            this.Msg(res);
          }
        })
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
      requestData(){//列表数据请求
        api.RoleList({
          query:{},
          success:res=>{
            if(res.status==200){
              this.tableData = res.data.data;
            }
          }
        })
      },
      FormVisible(){//添加角色清除form
        this.dialogFormVisible = true;
        this.form.name = '';
        this.form.remark = '';
        this.isAdd = true;
        this.title = '添加角色';
      },
      handleEdit(index,row){//编辑角色增加form内容
        this.dialogFormVisible = true;
        this.roleId = row.id;
        this.form.name = row.name;
        this.form.remark = row.remark;
        this.isAdd = false;
        this.title = '编辑角色';
      },
      handleDelete(index,row){//删除
        this.centerDialogVisible = true;
        this.roleId = row.id;
        this.indexDel = index;
      },
      handleSet(index,row){//设置角色权限
        //console.log(row)
        this.$router.push({//跳转传参
          name: "authority",
          params:{
            id: row.id,
            name: row.name
          }
        });
      },
    }
  }
</script>
<style scoped>
 .addBtn{
   margin: 15px 20px;
   text-align: left;
 }
</style>
