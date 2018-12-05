<template>
  <div id="login">

    <canvas id="mycanvas"></canvas>
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
        drawBack(){//绘制背景
          var All;
          var arr = [];
          var current = {};
          function All() {
            this.canvas = document.getElementById('mycanvas');
            this.ctx = this.canvas.getContext('2d');//创建上下文
            var windowW = document.documentElement.clientWidth;
            var windowH = document.documentElement.clientHeight;
            if(windowW > 800){//设置数量
              this.num = 100;
            }else{
              this.num = 60;
            }
            this.canvas.width = windowW;//画布宽
            this.canvas.height = windowH;//画布高
            this.x = Math.random() * windowW;//设置随机X坐标
            this.y = Math.random() * windowH;//设置随机Y坐标
            this.mx = Math.random();//
            this.my = Math.random();//
            this.r = Math.random() * 6;//创建随机半径
            // this.current = {'x':null,'y':null};
            this.canvas.onmousemove = function(e){//监听鼠标移动
              e = e || this.event;
              current.y = e.clientY;
              current.x = e.clientX;
            }
            this.canvas.onmouseout = function(){//监听鼠标离开
              current.y = null;
              current.x = null;
            }
            this.init = function(){//初始化
              for(var i = 0; i < this.num; i++){
                arr.push(new All());
              }
              this.draw();//运行
            }
            this.drawCircle = function() {//画圆
              this.ctx.beginPath();//开始一个路径
              this.ctx.arc(this.x,this.y,this.r,0,2*Math.PI);//画圆
              this.ctx.fillStyle = '#A8A5A6';//填充颜色
              this.ctx.fill();//填充
              this.ctx.closePath();//结束路径
            }
            this.drawLine = function(loop){//画线
              let dx = this.x - loop.x;
              let dy = this.y - loop.y;
              let d = Math.sqrt(dx * dx + dy * dy);
              if(d < 150){
                this.ctx.beginPath();//开始路径
                this.ctx.moveTo(this.x,this.y);//起始点
                this.ctx.lineTo(loop.x,loop.y);//连接
                this.ctx.strokeStyle = '#A8A5A6';//设置线颜色
                this.ctx.stroke();//填充
                this.ctx.closePath();
              }
            }
            this.move = function(w,h) {//圆圈移动，圆圈移动的距离必须在屏幕范围内
              this.mx = (this.x < w && this.x > 0) ? this.mx : (-this.mx);
              this.my = (this.y < h && this.y > 0) ? this.my : (-this.my);
              this.x += this.mx / 2;//随机圆心X
              this.y += this.my / 2;//随机圆心Y
            }
            this.mouseOn = function(current) {//监听鼠标鼠标
              this.ctx.beginPath();//开始路径
              this.r = 8;//圆大小
              this.ctx.arc(current.x,current.y,this.r,0,2 * Math.PI);//画圆
              this.ctx.fillStyle = 'rgba(255,99,71,.8)';//填充颜色
              this.ctx.fill();//填充
              this.ctx.closePath();//关闭路径
            }
            var self = this;
            this.draw = function() { //画图逻辑
              self.ctx.clearRect(0,0,windowW,windowH); //清除画布
              for(var i = 0; i < arr.length; i++){ //循环画圆
                arr[i].move(windowW,windowH);//移动
                arr[i].drawCircle();//画圆
                for(var j = i + 1; j < arr.length; j++){ //圆之间连线
                  arr[i].drawLine(arr[j]);
                }
              }
              //console.log(current.x)
              if(current.x){//鼠标跟踪画图
                self.mouseOn(current);//跟踪画圆
                for(var k = 0; k < arr.length; k++){//连线
                  self.drawLine(arr[k]);
                  self.x = current.x;//定义鼠标起始位置
                  self.y = current.y;

                }
              }
              requestAnimationFrame(self.draw);//帧播放
            }
          }
          All = (new All).init();
        }
      },
      mounted(){
        this.drawBack();
      }
    }
</script>

<style scoped>
   #login{
     width: 100%;
     height: 100%;
     overflow: hidden;
     background-color: #fff;;
     position: relative;
   }
   canvas{
     display: block;
   }
   .login_title{
     font-size: 20px;
     font-weight: 700;
     color: #333;
     margin: 15px 0;
   }
   .box-card{
    width: 400px;
    background-color: rgba(255,255,255,.9);
    border: 0;
     box-shadow: 0px 2px 20px 15px #e2e2e2;
    position: absolute;
    top: 25%;
    left: 50%;
    margin-left: -200px;
    padding-right: 20px;
    box-sizing: border-box;
     z-index: 200;
  }
  .login_btn{
    width: 100%;
  }


</style>
