<template >
   <!-- 登录页面 -->
    <div class="loginToHome">
      <el-form ref="form" :model="form" status-icon label-width="80px" class="loginForm">
        <h3>登录</h3>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="form.username" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="homeBut" type="primary" plain @click="login()" >登录</el-button>
          <el-button class="loginBut" type="primary" plain @click="register()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
  export default {
    name:'Login',
    data: function() {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      login: function() {//登录按钮
        let url=this.axios.urls.USER_LOGIN;
        let param={
          username:this.form.username,
          password:this.form.password
        }
        this.axios.post(url,param).then(response =>{
          // console.log(param);
          if(response.data.code==1){
            this.$message({
              message: '登录成功',
              type: 'success'
            })
             this.$router.push('/');//跳转到首页
          }else{
            this.$message({
              message: '用户名或者密码错误录',
              type: 'error'
            })
          }
        }).catch(error=>{
          alert(error);
        })
      },
      register:function(){//注册按钮
        this.$router.push('/Register');
      }
    }
  }
</script>
<style scoped>


  .loginToHome {
    position: absolute;
    left: 0px;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 400px;
    height: 300px;
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
  }

  .loginBut {
    position: absolute;
    right: 0px;
  } */
</style>
