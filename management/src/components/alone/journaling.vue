<template>
  <div v-loading="this.$store.state.loading">
    <el-card class="box-card">
      <div class="btn">
        <el-button type="success" @click="downloadFile">导出会员信息</el-button>
        <el-button type="success" @click="downloadOrder">导出订单信息</el-button>
        <el-button type="success" @click="downloadMemberDeal">导出会员交易信息</el-button>
      </div>
      <div class="inps">
        <el-upload
          class="upload-demo"
          drag
          action=""
          :before-upload="beforeAvatarUpload"
          :http-request="uploadFile"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>即可生成</div>
          <div class="el-upload__tip" slot="tip">上传商益号表导出手机号，只能上传Excel文件，格式请参考模板。</div>
        </el-upload>
        <el-button class="btns" type="warning" @click="downTemplate">下载上传模板</el-button>
      </div>

    </el-card>
  </div>

</template>

<script>
  import api from '../../api/api'
    export default {
        name: "journaling",
      data(){
        return{}
      },
      created(){
        this.$store.commit('LOADING_DONE');//加载结束
      },
      methods:{
        downloadFile(){//导出会员信息
          api.File({
            success:res=>{
              const isEXCLE = res.headers["content-type"] === ("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || "application/vnd.ms-excel");
              if(!isEXCLE){
                let reader = new FileReader();
                reader.onload = e => this.$message.error(JSON.parse(e.target.result).msg);
                reader.readAsText(res.data);
              }else{
                let blob = new Blob([res.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                const fileName = `会员数据表格${Date.parse(new Date())}.xlsx`;
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
        downloadOrder(){//导出订单表格
          api.Order({
            success:res=>{
              const isEXCLE = res.headers["content-type"] === ("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || "application/vnd.ms-excel");
              if(!isEXCLE){
                let reader = new FileReader();
                reader.onload = e => this.$message.error(JSON.parse(e.target.result).msg);
                reader.readAsText(res.data);
              }else {
                let blob = new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                const fileName = `订单表格${Date.parse(new Date())}.xlsx`;
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
        downloadMemberDeal(){//导出会员交易信息
          api.MemberDeal({
            success:res=>{
              const isEXCLE = res.headers["content-type"] === ("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || "application/vnd.ms-excel");
              if(!isEXCLE){
                let reader = new FileReader();
                reader.onload = e => this.$message.error(JSON.parse(e.target.result).msg);
                reader.readAsText(res.data);
              }else {
                let blob = new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                const fileName = `会员交易信息表格${Date.parse(new Date())}.xlsx`;
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
        beforeAvatarUpload(file) {//只能上传表格
          const isEXCLE = file.type === ("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || "application/vnd.ms-excel");
          if (!isEXCLE) {
            this.$message.error('上传文件只能是Excel!');
          }
          return isEXCLE;
        },
        uploadFile(files){//导入商益号返回手机号
          let formData = new FormData();
          formData.append('file', files.file);
          api.UpFile({
            files:{
              formData,
              file: files.file
            },
            success: res =>{
              const isEXCLE = res.headers["content-type"] === ("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || "application/vnd.ms-excel");
              if(!isEXCLE){
                let reader = new FileReader();
                reader.onload = e => this.$message.error(JSON.parse(e.target.result).msg);
                reader.readAsText(res.data);
              }else{
                let blob = new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                const fileName = `手机号表格${Date.parse(new Date())}.xlsx`;
                const elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
              }
            }
          })
        },
        downTemplate(){
          api.Templet({
            success:res=>{
              const isEXCLE = res.headers["content-type"] === ("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || "application/vnd.ms-excel");
              if(!isEXCLE){
                let reader = new FileReader();
                reader.onload = e => this.$message.error(JSON.parse(e.target.result).msg);
                reader.readAsText(res.data);
              }else {
                let blob = new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                const fileName = `模板文件${Date.parse(new Date())}.xlsx`;
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
        }
      }
    }
</script>

<style scoped>
  .btn{
    text-align: left;
    border-bottom: 1px solid #c8c9cc;
    padding-bottom: 10px;
  }
  .upload-demo{
    text-align: left;
    padding: 20px;
  }
  .inps{
    display: flex;
    justify-content: flex-start;
  }
  .btns{
    margin-top: 180px;
    height: 40px;
  }
</style>
