<template>
	<el-row>
		<el-col style="width: 100%; height: 50px;" :span="12">
			<el-link style="height: 50px; left: 350px; right: 0px;  position: relative;" plain icon="el-icon-s-home" @click="goPath('InvestHome')">返回首页</el-link>
			<el-link v-if="this.user == null" style="height: 50px; left: 430px;  position: relative;" @click="goPath('Register')">注册</el-link>
			<el-link v-if="this.user == null" style="height: 50px; left: 520px;  position: relative;" @click="goPath('Login')">登录</el-link>
			<el-link v-if="this.user != null" style="height: 50px; left: 520px;  position: relative;" @click="goUser('Login')">{{user.uname}}</el-link>
			<el-link v-if="this.user != null" style="height: 50px; left: 520px;  position: relative;" @click="logout()">退出登录</el-link>
		</el-col>
		<el-col style="width: 100%; color: rgb(0, 43, 255); background-color: rgb(251, 252, 255); opacity: 0.7; height: 60px;"
		 :span="12">
			<el-link style="width: 10%; height: 20px; left: 300px; bottom: -5px; top: 20px; font-weight: bold;" @click="goPath('InvestHome')">首页</el-link>
			<el-link style="width: 10%; left: 300px; top: 20px; font-weight: bold; height: 20px;" @click="goPath('BorrowMoney')">我要借款</el-link>
			<el-link style="width: 10%; left: 300px; top: 30%; bottom: 0px; font-weight: bold; height: 20px;" @click="goPath('InvestList')">我要投资</el-link>
			<el-link style="width: 10%; margin-left: 0px; left: 300px; top: 20px; font-weight: bold; height: 20px;" @click="goPath('myaccount/accountinfo')">我的账户</el-link>
			<el-link style="width: 10%; padding-top: 0px; padding-left: 0px; left: 300px; top: 20px; font-weight: bold;" @click="goPath('AboutOur')">关于我们</el-link>
		</el-col>
		<div>
			<router-view></router-view>
		</div>
	</el-row>
</template>

<script>

	export default {
        // inject:['reload'],
        data(){
            return {
                login:'',
                user:'登录',
								indexpath:''
            }
        },
        methods:{
            //路由跳转
            goPath(path){
							if(this.indexpath == path) return;
                this.$router.push({path:'/Index/'+path+''}),
								this.indexpath = path;
            },
            goUser(path){
							if(this.indexpath == path) return;
                this.$router.push({path:'/'+path+''}),
								this.indexpath = path;
            },
            logout(){
                this.$confirm('你确定要退出吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    sessionStorage.clear();//清除登录记录
                    this.$router.push({path:"/"})//返回主页面
                }).catch(() => {
                    //取消
                    console.log("取消")
                });
            }
        },
        created() {
            this.user=JSON.parse(sessionStorage.getItem("USER"))
        }
    }
</script>

<style type="text/css" scoped="scoped">
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 0px;
	}
</style>
