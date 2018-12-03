<template>
  <div>
    <el-dialog width="450px" :visible.sync="dialogFormVisible">
      <el-form class="modelBlack" :model="form">
        <el-form-item label="角色类别" :label-width="formLabelWidth">
          <el-select v-model="roleId" clearable placeholder="请选择">
            <el-option v-for="item in selectData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="selectId">确 定</el-button>
      </div>
    </el-dialog>
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
        prop="username"
        label="管理员账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="r_name"
        label="角色"
        width="180">
      </el-table-column>
      <el-table-column
        label="状态"
        width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" type="success" v-if="scope.row.status==1">启用</el-tag>
            <el-tag size="medium" type="danger" v-if="scope.row.status==2">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import api from '../../api/api'
    export default {
        name: "set",
      data(){
        return {
          tableData: [],
          selectData:[],
          roleId: '',
          dialogFormVisible: false,
          formLabelWidth: '120px',
          form: {
            region:''
          },
        }
      },
      created(){
        this.adminList();
        api.RoleList({//选择框
          query:{},
          success:res=>{
            if(res.status==200){
              this.selectData = res.data.data;
            }
          }
        })
      },
      methods:{
        adminList(){
          api.AdminList({//表格
            query:{},
            success:res=>{
              //console.log(res);
              if(res.status==200){
                this.tableData = res.data.data;
              }
            }
        })
        },
        handleEdit(index, row) {//编辑
          //console.log(index, row);
          this.dialogFormVisible = true;
          this.roleId = row.r_id;//角色id
          this.adminId = row.id;
        },
        selectId(){//确定
          //console.log(this.roleId);
          api.AdminRole({
            query:{
              r_id: this.roleId,
              admin_id: this.adminId
            },
            success:res=>{
              if(res.data.code == 200){
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.adminList();
              }else{
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }
              this.roleId = '';
              this.adminId = '';
            }
          })
          this.dialogFormVisible = false;
        }
      }
    }
</script>

<style scoped>
  .modelBlack{
    width: 100%;
  }
</style>
