<template>
  <el-menu router :default-active="$router.path" class="el-menu-vertical-demo" background-color="#334157" text-color="#fff"
    active-text-color="#ffd04b" :collapse="isCollapse">
    <!-- <el-menu default-active="2" :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b"> -->
    <div class="logobox">
      <img class="logoimg" src="../assets/img/logo.png" alt="">
    </div>

    <el-menu-item index="/Home">
      <template slot="title">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </template>
    </el-menu-item>

    <el-submenu v-for=" m in moduleDatas" :key="m.id" :index="'index_' + m.id">
      <template slot="title">
        <i :class="m.icon"></i>
        <span>{{m.text}}</span>
      </template>

      <el-menu-item v-for="cm in m.childrens" :key="cm.id" :index="cm.url">
        <samp>{{cm.text}}</samp>
      </el-menu-item>
    </el-submenu>

    <!-- <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <template slot="title">选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item> -->
  </el-menu>
</template>
<script>
  export default {
    name: 'LeftAside',
    props: ['opened'],
    data: function() {
      return {
        isCollapse: false,
        moduleDatas: []
      }
    },

    watch: {
      opened: function(val) {
        console.log(val);
        return this.isCollapse = !val;
      }
    },

    //生命 生命周期钩子函数
    created: function() {
      let url = this.axios.urls.SYSTEM_SYS_MODULES;

      this.axios.get(url).then(resp => {
        //把参数值给双向数据绑定
        this.moduleDatas = resp.data;
      }).catch(error => {
        console.log(error);
      })


    }
  }
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 400px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    border: none;
    text-align: left;
  }

  .el-menu-item-group__title {
    padding: 0px;
  }

  .el-menu-bg {
    background-color: #1f2d3d !important;
  }

  .el-menu {
    border: none;
  }

  .logobox {
    height: 40px;
    line-height: 40px;
    color: #9d9d9d;
    font-size: 20px;
    text-align: center;
    padding: 20px 0px;
  }

  .logoimg {
    height: 40px;
  }
</style>
