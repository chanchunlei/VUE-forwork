<template>
  <div id="login">
    <el-card class="box-card animated flipInY">
      <el-form :model="ruleForm2" :label-position="labelPosition" status-icon :rules="rules2" ref="ruleForm2" label-width="50px" class="demo-ruleForm">
        <h3 class="login_title">系统登录</h3>
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="ruleForm2.account" @keyup.native.enter="handleSubmit2" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass"  @keyup.native.enter="handleSubmit2" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox label="记住密码" v-model="checked" class="remember">记住密码</el-checkbox>
        <el-form-item >
          <el-button type="primary" class="login_btn" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "login",
        data(){
          return {
            logining: false,
            ruleForm2:{
              account: '',
              checkPass: ''
            },
            rules2: {
              account: [
                { required: true, message: '请输入账号', trigger: 'blur' }
              ],
              checkPass: [
                { required: true, message: '请输入密码', trigger: 'blur' }
              ]
            },
            checked: true,
            labelPosition: 'left'
          }
        },
      methods: {
          handleSubmit2(){
            this.$refs.ruleForm2.validate((vaild) => {
              if(vaild){
                this.logining = true;
                let loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
                if(loginParams.username != 'admin' || loginParams.password != '123456'){
                  this.logining = false;
                  this.$message({
                    message: "账号或密码错误！",
                    type: 'error'
                  })
                }else{
                  // 保存数据到sessionStorage   sessionStorage.setItem('key', 'value');
                  sessionStorage.setItem('user',JSON.stringify('admin'));
                  this.$router.push({ path: '/' });
                }
              }
            });
          }
      }
    }
</script>

<style scoped>
   #login{
     width: 100%;
     height: 100%;
     background: url(".././assets/timg.jpg") 100% 100%;
   }
   .login_title{
     font-size: 20px;
     font-weight: 700;
     color: #666;
     margin: 15px 0;
   }
   .box-card{
    width: 400px;
    background-color: rgba(255,255,255,.7);
    border: 0;
    position: absolute;
    top: 25%;
    left: 50%;
    margin-left: -200px;
    padding-right: 20px;
    box-sizing: border-box;
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
