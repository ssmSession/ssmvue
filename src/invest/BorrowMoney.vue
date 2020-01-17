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
				<el-button type="primary" round v-show="userTest" @click="dialogFormApply = true">申请贷款</el-button>

				<el-button type="primary" round v-show="!userTest">登录后申请</el-button>
			</div>



		</el-card>

		<el-dialog :title="ApplyBorrowMoney" :visible.sync="dialogFormApply" width="520px">
			<!-- <el-form :model="ApplyMoneyForm" style="margin-top: 60px;" :rules="rules" ref="ApplyMoneyForm" :inline="true"> -->

			<el-form ref="ApplyMoneyForm" :model="ApplyMoneyForm" label-width="80px">

				<el-form-item label="借款金额" :label-width="formLabelWidth">
					<el-input v-model="ApplyMoneyForm.bidRequestAmount" placeholder="借款金额(元)" style="margin-left: -50px;" autocomplete="off"
					 :style="{width: formEleWidth}">
						<template slot="append">元</template>
					</el-input>
				</el-form-item>

				<el-form-item label="借款利息" :label-width="formLabelWidth">
					<el-input v-model="ApplyMoneyForm.currentRate" style="margin-left: -50px;" placeholder="利息" autocomplete="off"
					 :style="{width: formEleWidth}">
						<template slot="append">%</template>

					</el-input>
				</el-form-item>

				<el-form-item label="借款期限" :label-width="formLabelWidth" prop="monthes2Return">
					<el-select v-model="ApplyMoneyForm.monthes2Return" style="margin-left: -50px;" placeholder="月份" :style="{width: formEleWidth}">
						<el-option v-for="item in monthSelect" :key="item.id" :label="item.title" :value="item.id">
							<template slot="append">%</template>
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="还款方式" :label-width="formLabelWidth" prop="returnType">
					<el-radio-group :label-position="labelPosition" v-model="radio">

						<el-radio label="按月分期" style="margin-left: -180px;"></el-radio>
						<el-radio label="按月到期" style="margin-left: -14px;"></el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="最小投标" :label-width="formLabelWidth">
					<el-input v-model="ApplyMoneyForm.minBidAmount" placeholder="最小投标金额" style="margin-left: -50px;" autocomplete="off"
					 :style="{width: formEleWidth}">
						<template slot="append">元</template>
					</el-input>
				</el-form-item>

				<el-form-item label="招标天数" :label-width="formLabelWidth" prop="disableDate">
					<el-select v-model="ApplyMoneyForm.disableDate" style="margin-left: -50px;" placeholder="招标天数" :style="{width: formEleWidth}">
						<el-option v-for="item in daySelect" :key="item.id" :label="item.title" :value="item.id">
							<template slot="append">%</template>
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="借款标题" :label-width="formLabelWidth">
					<el-input v-model="ApplyMoneyForm.title" placeholder="借款标题" style="margin-left: -50px;" autocomplete="off" :style="{width: formEleWidth}">
					</el-input>
				</el-form-item>

				<el-form-item label="借款描述" :label-width="formLabelWidth">
					<el-input type="textarea" v-model="ApplyMoneyForm.description" placeholder="借款描述" style="margin-left: -50px;"
					 autocomplete="off" :style="{width: formEleWidth}"></el-input>
				</el-form-item>

			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormApply = false">取 消</el-button>
				<el-button type="primary" @click="submitApply('ApplyMoneyForm')">提交申请</el-button>
			</div>
		</el-dialog>


	</div>
</template>

<script>
	import {
		mapGetters

	} from 'vuex'
	export default {
		data() {


			return {
				rules: {},
				yes: 'el-icon-check', //定义完成样式
				no: 'el-icon-close', //定义失败样式
				red: 'red', //红色字体
				green: 'green', //绿色字体
				userTest: false,
				monthSelect: [],
				daySelect: [],
				radio: '1',
				labelPosition: 'left',
				ch: false,
				ApplyBorrowMoney: '申请贷款',
				dialogFormApply: false,


				//统一控制标签的宽度
				formLabelWidth: '110px',
				//统一控制表单元素的宽度
				formEleWidth: '320px',
				ApplyMoneyForm: {

				}
			};
		},


		computed: mapGetters({
			userId: 'getsysUserId'
		}),

		methods: {
			//测试用户是否登录
			testUser: function() {
				let url = this.axios.urls.GETUSERINFOBYSTATE;
				let param = {
					logininfoId: this.userId,
				}
				//这个是去查询最后一次登录的日志
				this.axios.post(url, param).then(resp => {
					if (resp.data.code != -1) {
						this.userTest = true;
						console.log(this.userTest);
					}
				}).catch(error => {
					alert(error);
				})
			},

			/* 月份下拉框 */
			selectOptions() {
				let url = this.axios.urls.GETMONTHS;
				this.axios.post(url).then(resp => {
					if (resp.data.code != -1) {
						this.monthSelect = resp.data.data;
						console.log(this.monthSelect);
					}
				}).catch(error => {
					alert(error);
				})
			},

			/* 招标天数下拉框 */
			tender() {
				let url = this.axios.urls.GETDAYS;
				this.axios.post(url).then(resp => {
					if (resp.data.code != -1) {
						this.daySelect = resp.data.data;
						console.log(this.daySelect);
					}
				}).catch(error => {
					alert(error);
				})
			},

			/* 提交申请 */
			submitApply: function(ApplyMoneyForm) {
				console.log(this.ApplyMoneyForm);
				this.$refs[ApplyMoneyForm].validate((valid) => {
					if (valid) {
						
						let param = {
							bidRequestAmount:this.ApplyMoneyForm.bidRequestAmount,
							currentRate:this.ApplyMoneyForm.currentRate,
							monthes2Return:this.ApplyMoneyForm.monthes2Return,
							returnType:this.ApplyMoneyForm.returnType,
							minBidAmount:this.ApplyMoneyForm.minBidAmount,
							disableDate:this.ApplyMoneyForm.disableDate,
							title:this.ApplyMoneyForm.title,
							description:this.ApplyMoneyForm.description
						}
						
						console.log(param);
						
						let url = this.axios.urls.SUBMITAPPLICATION;
						this.axios.post(url,param).then(resp => {
// 							if(resp.data.code){
// 														this.$message({
// 															message: resp.data.msg,
// 															type: 'success'
// 														});
// 														this.dialogFormApply=false;
// 													}
							
						}).catch(error => {
							alert(error);
						})

					} else {
						console.log('error submit!');
						return false;
					}
				});
			}












		},




		created() {
			this.testUser();
			this.selectOptions();
			this.tender();
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
