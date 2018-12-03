<template>
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <el-form-item label="账号" prop="pass">
      <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model.number="ruleForm2.age"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
    export default {
        name: "login",
      data() {
          return {
            loginging: false,
            ruleFrome2: {
              account: 'admin',
              checkPass: '123456'
            },
            rules2: {
              account: [
                {required: true, message: '请输入账号！', trigger: 'blur'}
              ],
              checkPass: [
                {require: true, message: '请输入密码', trigger: 'blur'}
              ],
              checked: true
            }
          }
      },
      methods: {
          handleReset2() {
              console.log()
          },
          handleSubmit2() {
              console.log()
          }
      }
    }
</script>

<style scoped>

</style>
