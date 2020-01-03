<template>
	<div style="margin-top: 10%;">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span style="text-align: center;">信用贷</span>
			</div>
			<div class="margintop">
				认证后获得 ￥ <i>2000.00</i>
			</div>
			<div class="margintop">
				<router-link :to="'index'">申请条件</router-link>
			</div>
			<div class="margintop">
				<div class="margintop">
					<i :class="ch?green:red">完成基本资料</i> <i :class="ch?yes:no"></i>
				</div>
				<div class="margintop">
					<i :class="ch?green:red">身份证认证</i> <i :class="ch?yes:no"></i>
				</div>
				<div class="margintop">
					<i :class="ch?green:red">材料认证达30分</i> <i :class="ch?no:yes"></i>
				</div>
			</div>
			<div style="margin-top: 70%;">
				<el-button type="primary" round v-show="false">申请贷款</el-button>
				<el-button type="primary" round v-show="true">登录后申请</el-button>
			</div>

		</el-card>
		

	</div>
</template>

<script>
	export default {
		data() {
			return {
				yes: 'el-icon-check',//定义完成样式
				no: 'el-icon-close',//定义失败样式
				red: 'red',//红色字体
				green: 'green',//绿色字体
				
			};
		}
	}
</script>

<style scoped="scoped">
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 280px;
		float: left;
		margin-left: 11%;
	}

	.red {
		color: red;
	}

	.green {
		color: green;
	}

	.margintop {
		margin-top: 10%;
	}
</style>
