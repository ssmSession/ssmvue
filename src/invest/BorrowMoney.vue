<template>
  <div style="margin-left: 750px;">
    <el-tab-pane><img src="../assets/logs.png"></el-tab-pane>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="首页" name="first">
        <!-- <div style="float: left;">
          <span >首页显示banner，在借标的信息，网站资讯信息</span>
        </div> -->


      </el-tab-pane>
      <el-tab-pane label="我要投资" name="second">我要投资</el-tab-pane>
      <el-tab-pane label="我要借款" name="third">我要借款</el-tab-pane>
      <el-tab-pane label="我的账户" name="fourth">我的账户</el-tab-pane>
      <el-tab-pane label="关于我们" name="five">关于我们</el-tab-pane>
      <el-tab-pane label="登录|注册" name="six">
        <a href="/Login">登录</a> | <a href="/Register">注册</a>
      </el-tab-pane>
      <el-tab-pane></el-tab-pane>
      <el-tab-pane></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'fourth'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style>

</style>
