<template>
<div>
    <div class="loginToHome">
      <el-form ref="form" :model="form" status-icon label-width="80px" class="loginForm">
        <h3>登录</h3>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="form.username" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input type="text" v-model="form.phoneNumber" auto-complete="off" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <a href="login.vue">返回登录</a>
          <!-- <el-button class="homeBut" type="primary" plain @click="login()" >登录</el-button> -->
          <el-button class="loginBut" type="primary" plain @click="register()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default{
    name:'Register',
    data:function(){
      return{
        form:{
          username:'',
          password:'',
          phoneNumber:''
        }
      }
    },
    methods:{
     register:function(){
         let url=this.axios.urls.USER_REGISTER;
         let param={
           username:this.form.username,
           password:this.form.password,
           phoneNumber:this.form.phoneNumber,
         }
         this.axios.post(url,param).then(response =>{
           console.log(param);
           if(response.data.code==1){
             this.$message({
               message: '注册成功',
               type: 'success'
             })
           }else{
             this.$message({
               message: '注册失败',
               type: 'error'
             })
           }
         }).catch(error =>{
           alert(error);
         })
     }
    }
  }
</script>

<style>
  .loginToHome {
    position: absolute;
    left: 0px;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 400px;
    height: 260px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    background: #fff;
    border: 1px solid #dcdfe6;
  }

  .loginForm {
    text-align: center;
    padding-top: 15px;
    padding-right: 30px;
    top: 10px;
  }

  /* .homeBut {
    position: absolute;
    left: 0px;
  } */

  .loginBut {
    position: absolute;
    right: 0px;
  }
</style>
