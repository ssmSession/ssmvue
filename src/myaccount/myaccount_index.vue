<template>
	<div style="width:1500px;margin-left: 30px;margin-top: 120px;">
		<!-- <div>&nbsp;</div> -->
		<div>
			<el-container width="1200px">
				<el-aside width="200px" class="aside" style="background-color:#e9f2fc;height: 600px;">
					<el-menu router :default-active="$router.path" class="el-menu-vertical-demo" style="background-color: #e9f2fc;"
					 text-color="#2F4F4F" active-text-color="#2F4F4F">
						<el-submenu v-for="m in moduleDatas" :key="m.id" :index="'index_' + m.id">
							<template slot="title">
								<i :class="m.icon"></i>
								<span>{{m.text}}</span>
							</template>
							<el-menu-item v-for="cm in m.ssmModules" :key="cm.id" :index="cm.url">
								<samp>{{cm.text}}</samp>
							</el-menu-item>
						</el-submenu>
					</el-menu>
				</el-aside>
				<el-main class="main" style="width: 800px;">
					<el-card class="box-card">
						<router-view></router-view>
					</el-card>
					<!-- <div box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)>
						<router-view></router-view>
					</div> -->
					
				</el-main>
			</el-container>
		</div>
		<!-- <div>&nbsp;</div> -->
	</div>
	
	
</template>

<script>
	export default {
		name: 'myaccount',
		data() {
			return {
				moduleDatas: []
			};
		},

		methods: {
			//返回上一次访问的地方	
			// goBack() {}
		},

		//生命 生命周期钩子函数
		created: function() {
			let url = this.axios.urls.GETUSERMODULES;

			this.axios.get(url).then(resp => {
				//把参数值给双向数据绑定
				this.moduleDatas = resp.data.data;
			}).catch(error => {
				console.log(error);
			})


		}
	}
</script>

<style scoped="scoped">
	.box-card {
		float: left;
		width: 1250px;
		height: 580px;
	}
</style>
