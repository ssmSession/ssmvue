<template>
  <div>
    <!-- 注册页面-->
    <div class="loginToHome">
      <el-form ref="form" :rules="rules" :model="form" status-icon label-width="80px" class="loginForm">
        <h3>用户注册</h3>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="form.username" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input type="text" v-model="form.phoneNumber" auto-complete="off" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码" >
          <el-input v-model="phoneyzm" placeholder="请输入验证码" style="width:190px"></el-input>
          <el-button icon="el-icon-mobile-phone" @click="send()" style="width: 150px;" plain :disabled="disabled=!show">
            <span v-show="show">获取验证码</span>
            <span v-show="!show" class="count">{{count}} s</span>
          </el-button>
        </el-form-item>
        <el-form-item>
          <a href="" @click="goPath('Login')"><span style="color: gray">返回登录</span></a>
          <el-button class="loginBut" type="primary" plain @click="register('form')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data: function() {
      var checkchcTel = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8|9][0-9]{9}$/;
        if (!value) {
          return callback(new Error('不允许为空'));
        }
        if (isNaN(value)) {
          return callback(new Error('请输入11为数字'));
        }
        if (phoneReg.test(value)) {
          callback();
        } else {
          callback(new Error('电话号码格式不正确'))
        }
        return callback();
      };
      var checkName=(rule, value, callback) => {
        // const manReg=/^([\u4e00-\u9fa5]{2,6})$/;
        if (!value) {
          return callback(new Error('不允许为空'));
        }
        return callback();
      };
      var checkPassword=(rule, value, callback) => {
        const pwd=/^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/g;
        if (pwd.test(value)) {
          callback();
        } else {
          callback(new Error('密码由6-16位字母和数字组成'));
        }
        if (!value) {
          return callback(new Error('不允许为空'));
        }
        return callback();
      };
      return {
        rules:{
          phoneNumber: [{
            required: true,
            validator: checkchcTel,//自定义验证
            trigger: 'blur'
          }],
          username: [{
            required: true,
           validator:checkName,
            trigger: 'blur'
          }],
          password: [{
            required: true,
            validator: checkPassword,
            trigger: 'blur'
          }],
        },
        form: {
          username: '',
          password: '',
          phoneNumber: ''
        },
        phoneyzm:null,
        phoneNum: null,
        show: true, // 初始启用按钮
        count: '' // 初始化次数

      }
    },
    methods: {
      goPath(path){
        // this.$router.replace();
        this.$router.push({path:'/'+path+''});
      },
      register: function(formName) {
        this.$refs[formName].validate((valid) => {
           if (valid) {
            let url = this.axios.urls.USER_REGISTER;
            let param = {
              username: this.form.username,
              password: this.form.password,
              phoneNumber:this.form.phoneNumber
            }
            if(this.phoneNum!=this.phoneyzm){
              // console.log(this.phoneNum);
              // console.log(this.phoneyzm);
              this.$message({
                message: '验证码错误',
                type: 'error'
              })
              return ;
            }
            this.axios.post(url, param).then(response => {
              if (response.data.code == 1) {
                this.$message({
                  message: '注册成功',
                  type: 'success'
                })
                this.$router.push('/');
              } else {
                this.$message({
                  message: '注册失败',
                  type: 'error'
                })
              }
            }).catch(error => {
              alert(error);
            })
           }else {
            console.log('error submit!!');
            return false;
            }
        })
      },
      getphone: function() {
        let url = this.axios.urls.GETPHONE;
        let param = {
          phoneNumber: this.form.phoneNumber
        }
        this.axios.post(url, param).then(response => {
            this.phoneNum = response.data.data;
        }).catch(error => {
          alert(error);
        })
      },
      send() {
        this.getphone();
        const TIME_COUNT = 60; //更改倒计时时间
        if (!this.phoneNum) {
          this.count = TIME_COUNT;
          this.show = false;
          this.phoneNum = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.phoneNum); // 清除定时器
              this.phoneNum = null;
            }
          }, 1000)
        }
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
    width: 460px;
    height: 420px;
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
