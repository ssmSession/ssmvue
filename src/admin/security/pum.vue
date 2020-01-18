<template>
	<div>
		<div>
			<i class="el-icon-ice-cream-round">用户名</i>
			<el-input placeholder="请输入内容" style="width: 20%;" v-model="username" clearable>
			</el-input>
			<el-button type="primary" icon="el-icon-search" plain @click="getData">查询</el-button>
		</div>

		<el-table :data="tableData" style="width: 94%;margin-left: 3%;">
			<el-table-column prop="id" label="Id">
			</el-table-column>
			<el-table-column prop="username" label="用户名" width="180">
			</el-table-column>
			<el-table-column prop="phoneNumber" label="电话号码">
			</el-table-column>
			<el-table-column prop="state" label="状态">
				<template slot-scope="scope">
					{{getStateDesc(scope.row)}}
					<!-- <el-input v-model="" placeholder="请输入内容"></el-input> -->
				</template>
			</el-table-column>
			<el-table-column label="操作" width="340px">
				<template slot-scope="scope">
					<el-button type="warning" plain @click="getUserInfo(scope.row)">查看</el-button>
					<el-button type="info" plain v-show="scope.row.state == 0" @click="updateState(scope.row)">禁用</el-button>
					<el-button type="success" plain v-show="scope.row.state == 1" @click="updateState(scope.row)">取消禁用</el-button>
					<el-button type="danger" plain @click="delLoginInfo(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 对话框 -->
		<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="ID" :label-width="formLabelWidth" label-position="left">
					<el-input v-model="form.id" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="版本号" :label-width="formLabelWidth">
					<el-input v-model="form.version" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="状态" :label-width="formLabelWidth" label-position="left">
					<el-input v-model="form.bitState" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="真实姓名" :label-width="formLabelWidth">
					<el-input v-model="form.realName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="分数" :label-width="formLabelWidth" label-position="left">
					<el-input v-model="form.score" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="身份证号码" :label-width="formLabelWidth">
					<el-input v-model="form.realAuthId" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="实名认证手机号" :label-width="formLabelWidth">
					<el-input v-model="form.idNumber" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号码" :label-width="formLabelWidth">
					<el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="月收入" :label-width="formLabelWidth">
					<el-input v-model="form.incomeGradeId" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="婚姻情况" :label-width="formLabelWidth">
					<el-input v-model="form.marriageId" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="子女情况" :label-width="formLabelWidth">
					<el-input v-model="form.kidCountId" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="学历" :label-width="formLabelWidth">
					<el-input v-model="form.educationBackgroundId" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="住房条件" :label-width="formLabelWidth">
					<el-input v-model="form.houseConditionId" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" :label-width="formLabelWidth">
					<el-input v-model="form.email" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'pum', //平台用户管理
		data() {
			return {
				tableData: null, //表单数据
				username: null, //用户名
				dialogFormVisible: false, //对话框默认隐藏
				formLabelWidth: '120px',
				form: {}, //表单的数据
			};
		},
		methods: {
			//获取数据
			getData() {
				let url = this.axios.urls.GETLOGININFOBYUSERTYPE;
				let param = {
					userType:0
				}
				this.axios.post(url, param).then(response => {
					this.tableData = response.data.data;
				}).catch(error => {
					alert(error);
				})
			},
			//判断用户是否可用
			getStateDesc(row) {
				if (0 == row.state) {
					return "正常";
				} else if (1 == row.state) {
					return "锁定";
				}
			},
			//删除login用户
			delLoginInfo(row) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let url = this.axios.urls.UPDATELOGININFOUSERTYPE;
					let param = {
						id: row.id,
						userType: 5
					}
					this.axios.post(url, param).then(response => {
						// this.tableData = response.data.data;
						if (response.data.code == 1) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getData();
						} else {
							this.$message({
								type: 'error',
								message: '删除失败!'
							});
						}
					}).catch(error => {
						alert(error);
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//修改用户状态
			updateState(row) {
				let userstate = 0;
				if (row.state == 0) {
					userstate = 1;
				}
				let url = this.axios.urls.UPDATELOGININFOSTATE;
				let param = {
					id: row.id,
					state: userstate
				}
				this.axios.post(url, param).then(response => {
					// this.tableData = response.data.data;
					if (response.data.code == 1) {
						this.$message({
							type: 'success',
							message: '操作成功!'
						});
						this.getData();
					} else {
						this.$message({
							type: 'error',
							message: '操作失败!'
						});
					}
				}).catch(error => {
					alert(error);
				})
			},
			//查询用户详细
			getUserInfo(row) {
				let url = this.axios.urls.GETUSERINFOBYLOGININFOID;
				let param = {
					logininfoId: row.id
				}
				this.axios.post(url, param).then(response => {
					if (response.data.code == 1) {
						this.form = response.data.data;
						console.log("操作成功");
						this.dialogFormVisible = true;

					} else {
						this.$message({
							type: 'error',
							message: '用户未完成详细资料填写'
						});
					}
				}).catch(error => {
					alert(error);
				})
			}
		}
	}
</script>

<style>

</style>
