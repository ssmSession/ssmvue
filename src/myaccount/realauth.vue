<template>
	<div>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="身份证姓名" class="item500">
				<el-input v-model="formInline.realname" placeholder="请输入姓名" class="inputcss"></el-input>
			</el-form-item>

			<el-form-item label="性别" class="item500">
				<el-select v-model="formInline.region" placeholder="性别" class="inputcss">
					<el-option label="男" value="0"></el-option>
					<el-option label="女" value="1"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="身份证号码" class="item500">
				<el-input class="inputcss" v-model="formInline.idNumber" :onkeyup="bornDateUp()" placeholder="请输入身份证号码"></el-input>
			</el-form-item>

			<el-form-item label="生日" class="item500">
				<el-input class="inputcss" v-model="formInline.bornDate" placeholder="请输入生日"></el-input>
			</el-form-item>

			<el-form-item label="身份证地址" class="item500">
				<el-input class="inputcss" v-model="formInline.address" placeholder="身份证地址"></el-input>
			</el-form-item>



			<el-form-item label="备注" class="item500">
				<el-input class="inputcss" v-model="formInline.remark" placeholder="请输备注"></el-input>
			</el-form-item>


			<el-form-item label="正面照片" class="item400" style="margin-right: 100px;">
				<el-upload :action="uploadurl" ref="upload" :data="mydata" list-type="picture-card" :on-change="chageFile"
				 :auto-upload="false" :on-success="successFile" :drag="true">
					<i slot="default" class="el-icon-plus"></i>
					<div slot="file" slot-scope="{file}">
						<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
						<span class="el-upload-list__item-actions">
							<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
								<i class="el-icon-zoom-in"></i>
							</span>
							<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
								<i class="el-icon-download"></i>
							</span>
							<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
								<i class="el-icon-delete"></i>
							</span>
							<span v-if="!disabled" class="el-upload-list__item-delete" @click="uplloadFile(file)">
								<i class="el-icon-upload2"></i>
							</span>
						</span>
					</div>
				</el-upload>
			</el-form-item>

			<el-form-item label="反面照片" class="item400" style="">
				<el-upload :action="uploadurl" v-show="oploadVisible1" ref="upload" :data="mydata" list-type="picture-card"
				 :auto-upload="false" :on-success="successFile" :drag="true">
					<i slot="default" class="el-icon-plus"></i>
					<div slot="file" slot-scope="{file}">
						<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
						<span class="el-upload-list__item-actions">
							<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
								<i class="el-icon-zoom-in"></i>
							</span>
							<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
								<i class="el-icon-download"></i>
							</span>
							<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
								<i class="el-icon-delete"></i>
							</span>
							<span v-if="!disabled" class="el-upload-list__item-delete" @click="uplloadFile(file)">
								<i class="el-icon-upload2"></i>
							</span>
						</span>
					</div>
				</el-upload>
			</el-form-item>

			<el-form-item label="" class="item500">
				<el-button type="success" @click="testIdNumber()" plain>点击测试实名认证</el-button>
			</el-form-item>
			<el-form-item label="" class="item500">
				<el-button type="info" :disabled="!testIdCode" plain>提交认证</el-button>
			</el-form-item>

		</el-form>

		<!-- 这个是显示文件的按钮 -->
		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
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
				formInline: {
					realname: '', //真实姓名
					region: '', //用户性别
					idNumber: '', //用户身份证
					bornDate: '', //生日
				},
				uploadurl: 'http://localhost:8080/upload', //文件上传的地址
				dialogImageUrl: '', //显示图片的地址
				dialogVisible: false,
				oploadVisible1: true,
				oploadVisible2: true,
				disabled: false,
				mydata: {
					username: null
				},
				testIdCode: false, //判断用户是否进行测试实名认证

			};
		},

		computed: mapGetters({
			name: 'getsysUserName'
		}),

		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleRemove(file) {
				console.log(file);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleDownload(file) {
				console.log(file);
			},
			//文件上传
			uplloadFile(file) {
				this.$refs.upload.submit();
			},
			//文件上传成功时候的钩子
			successFile(response, file, fileList) {
				if (file.status == "success") {
					console.log("success");
				}
				console.log(response);
			},

			/**
			 * 文件选择之后
			 */
			chageFile(file, fileList) {
				if ('ready' == file.status) {
					console.log(this.dialogImageUrl);
					this.oploadVisible1 = false;
					console.log(this.dialogImageUrl);
				}
			},
			//根据所填写的身份证信息自动赋值生日
			bornDateUp() {
				let str = this.formInline.idNumber;
				let year = str.substring(6, 10);
				let month = str.substring(10, 12);
				let day = str.substring(12, 14);
				let bornDate = '';
				if (year != null && year != '' && year.length == 4) {
					bornDate += year;
				}
				if (month != null && month != '' && month.length == 2) {
					bornDate += '-' + month;
				}
				if (day != null && day != '' && day.length == 2) {
					bornDate += '-' + day;
				}
				this.formInline.bornDate = bornDate;
			},

			//测试身份证的姓名的一致性
			testIdNumber() {
				let name = this.formInline.realname;
				let code = this.formInline.idNumber;

				if (name == null || name == '') {
					this.$message.error('请输入姓名！！！');
					return false;
				}

				if (code == null || code == '' || code.length != 18) {
					this.$message.error('请确认身份证号码！！！');
					return false;
				}

				let param = {
					realname: name,
					idNumber: code
				}

				let url = this.axios.urls.TESTIDENTITY;
				// 查询 身份证信息是否一致性
				this.axios.post(url, param).then(resp => {
					if (resp.data.code != -1) {
						this.testIdCode = resp.data.data;
						this.$message.success('恭喜你认证成功');
					} else {
						this.$message.error('身份异常！！！');
					}
				}).catch(error => {
					alert(error);
				})
			}


		},

		created: function() {
			this.mydata.username = this.name;
		}

	}
</script>

<style scoped>
	.item500 {
		width: 500px;
	}

	.item400 {
		width: 400px;
		height: 200px;
	}

	.inputcss {
		width: 300px;
	}
</style>
