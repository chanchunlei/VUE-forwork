<template>
  <div id="login">


    <el-card class="box-card animated bounceIn">
      <el-form :model="ruleForm" :label-position="labelPosition" status-icon :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
        <h3 class="login_title">系统登录</h3>
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="ruleForm.account" @keyup.native.enter="handleSubmit" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass"  @keyup.native.enter="handleSubmit" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" class="login_btn" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import api from '../api/api'
    export default {
        name: "login",
        data(){
          return {
            logining: false,
            ruleForm:{
              account: '',
              checkPass: ''
            },
            rules: {
              account: [
                { required: true, message: '请输入账号', trigger: 'blur' }
              ],
              checkPass: [
                { required: true, message: '请输入密码', trigger: 'blur' }
              ]
            },
            labelPosition: 'left'
          }
        },
      methods: {
          handleSubmit(){//登录
            this.$refs.ruleForm.validate((vaild) => {
              if(vaild){
                this.logining = true;
                let loginParams = { username: this.ruleForm.account, password: this.ruleForm.checkPass };
                api.Token({
                  loginParams:loginParams,
                  success: res=>{
                    //console.log(res);
                    if(res.status == 200){
                      this.logining = true;
                      sessionStorage.setItem("userName",this.ruleForm.account);
                      sessionStorage.setItem("token",res.data);
                      this.$store.dispatch('login');
                      this.$router.push({ path: '/' });
                      this.$message({
                        message: "登录成功！",
                        type: 'success'
                      })
                    }
                  },
                  error: error=>{
                    if(error.status == 403){
                      this.logining = false;
                      this.$message({
                        message: `${error.data.msg}!`,
                        type: 'error'
                      })
                    }
                  }
                });
              }
            });
          },
      }
    }
</script>

<style scoped>
   #login{
     width: 100%;
     height: 100%;
     overflow: hidden;
     background-color: black;
     position: relative;
   }
   #login {
     background-color: #1e0059;
     height: 100vh;
     margin: 0;
     overflow: hidden;
     -webkit-perspective: 5em;
     perspective: 5em;
   }

   #login::after {
     background-color: inherit;
     border-radius: 50%;
     box-shadow: 0 0 2em 2em #1e0059;
     content: "";
     height: 1em;
     left: 50%;
     position: absolute;
     top: 50%;
     -webkit-transform: translate(-50%, -50%);
     transform: translate(-50%, -50%);
     width: 1em;
   }
   .login_title{
     font-size: 20px;
     font-weight: 700;
     color: #333;
     margin: 15px 0;
   }
   .box-card{
    width: 400px;
    background-color: rgba(255,255,255,.5);
    border: 0;
    position: absolute;
    top: 25%;
    left: 50%;
    margin-left: -200px;
    padding-right: 20px;
    box-sizing: border-box;
     z-index: 200;
  }
  .remember{
    width: 100%;
    padding-left: 15%;
    box-sizing: border-box;
    margin-bottom: 15px;
    text-align: left;
  }
  .login_btn{
    width: 100%;
  }


</style>
