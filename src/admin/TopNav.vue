<template>
  <!-- <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64"
	 text-color="#fff" active-text-color="#ffd04b">
		<el-menu-item index="1">处理中心</el-menu-item>
		<el-submenu index="2">
			<template slot="title">我的工作台</template>
			<el-menu-item index="2-1">选项1</el-menu-item>
			<el-menu-item index="2-2">选项2</el-menu-item>
			<el-menu-item index="2-3">选项3</el-menu-item>
			<el-submenu index="2-4">
				<template slot="title">选项4</template>
				<el-menu-item index="2-4-1">选项1</el-menu-item>
				<el-menu-item index="2-4-2">选项2</el-menu-item>
				<el-menu-item index="2-4-3">选项3</el-menu-item>
			</el-submenu>
		</el-submenu>

		<el-menu-item index="3" disabled>消息中心</el-menu-item>
		<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
	</el-menu> -->
  <el-menu class="el-menu-demo" mode="horizontal" background-color="#334157" text-color="#fff" active-text-color="#fff">
    <el-button class="buttonimg">
      <img class="showimg" :src="collapsed?imgshow:imgsq" @click="doTogger()">
    </el-button>
    <el-submenu index="2" class="submenu">
      <template slot="title">
        {{sysUser}}
      </template>
      <el-menu-item index="2-1">设置</el-menu-item>
      <el-menu-item index="2-2" @click="updateTo()">更新资料</el-menu-item>
      <el-menu-item @click="exit()" index="2-3">退出</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'TopNav',
    data: function() {
      return {
        //默认显示
        collapsed: true,

        //require 支持动态引入
        imgshow: require('../assets/img/show.png'),
        imgsq: require('../assets/img/sq.png')

      }
    },

    methods: {
      //转换折叠图标的状态
      doTogger: function() {
        //改变图标
        this.collapsed = !this.collapsed;

        console.log("TopNav zt = " + this.collapsed);

        //给父组件传值
        this.$emit("left-open-collapsed", this.collapsed);

      },
      exit: function() {
        // $router.puth('/');
        this.$router.push('/');
        this.$store.commit('setsysUser', {
          sysUserId: null,
          sysUserName: null
        })
      },
      updateTo: function() { //更新资料
        let url = this.axios.urls.GETLOGININGO;
        this.axios.post(url, {
          id: this.sysUserId
        }).then(resp => {
          if (resp.data.code == 1) {
            this.sysUserName = resp.data.data.username;
            // console.log(resp.data.data.username);
            this.$store.commit('setsysUser', {
            	sysUserId: resp.data.data.id,
            	sysUserName:resp.data.data.username
            });

          }
        }).catch(error => {
          alert(error);
        })
      },

    },

    computed: mapGetters({
      sysUserId: 'getsysUserId',
      sysUser: 'getsysUserName',
    })
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    border: none;
  }

  .submenu {
    float: right;
  }

  .buttonimg {
    height: 60px;
    background-color: transparent;
    border: none;
  }

  .showimg {
    width: 26px;
    height: 26px;
    position: absolute;
    top: 17px;
    left: 17px;
  }

  .showimg:active {
    border: none;
  }
</style>
