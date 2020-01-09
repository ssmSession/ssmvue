<template>

	<div>
		<!-- <h1 class="title">我要投资</h1>
		<img src="http://localhost:8080/outLoadFile?path=D:/images/22.jpg" />
		<el-form>
			<el-form-item>投资列表</el-form-item>
		</el-form> -->

		<el-table :data="tableData" border style="width: 100%">
			
			<el-table-column prop="date" label="日期" width="180">
			</el-table-column>
			
			<el-table-column prop="name" label="姓名" width="180">
			</el-table-column>
			
			<el-table-column prop="address" label="地址">
			</el-table-column>
			
		</el-table>




	</div>

</template>

<script>
	export default {
		data() {
			return {
				tableData: [], //表格数据
			}
		},



		methods: {
			//查询
			query(){
				console.log("test");
			}
		},

		created: function() {
			this.query();
		}

	}
</script>

<style>
</style>
