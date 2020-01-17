<template>
	<div>
		<!-- <button @click="test">tst</button> -->

		<div class="demo-basic--circle">
			<div class="block">
				<el-row>
					<div style="float: left;margin-left: 50px;">
						<el-avatar shape="square" :size="130" :src="squareUrl"></el-avatar>
					</div>
					<div style="float: left; margin-left: 150px;line-height: 47px;">
						<el-row>用户名:{{username}}</el-row>
						<el-row>最后登录时间:{{logintime}}</el-row>
						<el-row>
							<el-button type="primary" plain>账户提现</el-button>
							<el-button type="warning" plain>账户充值</el-button></i>
						</el-row>

					</div>
				</el-row>
			</div>
		</div>

		<hr />

		<div style="margin-top: 40px;">
			
			<div style="float: left;margin-left: 10%;">
				总的利息：元
			</div>
			<div style="float: left;margin-left: 25%;">
				可用金额：{{form.usableamount}}元
			</div>
			<div style="float: left;margin-left: 25%;">
				冻结金额：{{form.freezedamount}}元
			</div>
			<div style="float: left;margin-left: 10%;">
				代收利息：{{form.unreceiveinterest}}元
			</div>
			<div style="float: left;margin-left: 25%;">
				代收本金：{{form.unreceiveprincipal}}元
			</div>
			<div style="float: left;margin-left: 25%;">
				授信额度：{{form.remainborrowlimit}}元
			</div>

		</div>


		<div style="margin-top: 180px;">
			<hr />
			<div style="float: left;margin-left: 5%;margin-top:40px;">
				<el-avatar shape="square" :size="80" :src="squareUrl"></el-avatar>
				<div>
					<span>实名认证</span>
					<span>实名认证</span>
				</div>
			</div>
			<div style="float: left;margin-left: 15%;margin-top:40px;">
				<el-avatar shape="square" :size="80" :src="squareUrl"></el-avatar>
			</div>
			<div style="float: left;margin-left: 15%;margin-top:40px;">
				<el-avatar shape="square" :size="80" :src="squareUrl"></el-avatar>
			</div>
			<div style="float: left;margin-left: 15%;margin-top:40px;">
				<el-avatar shape="square" :size="80" :src="squareUrl"></el-avatar>
			</div>

		</div>


	</div>




</template>

<script>
	import {
		mapGetters
	} from 'vuex'

	export default {
		data() {
			return {
				form: {},//账户account信息
				circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
				squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
				sizeList: ["large", "medium", "small"],
				username: null, //用户姓名
				logintime: null, //最后登录时间

			};
		},

		computed: mapGetters({
			userId: 'getsysUserId'

		}),

		methods: {
			/**
			 * 查询最大登录日志
			 */
			queryMaxTime() {
				let url = this.axios.urls.GETIPLOGBYMAXDATE;
				let param = {
					logininfoid: this.userId
				}
				//这个是去查询最后一次登录的日志
				this.axios.post(url, param).then(resp => {
					if (resp.data.code != -1) {
						this.username = resp.data.data.username;
						this.logintime = resp.data.data.logintime;
					} else {

					}
				}).catch(error => {
					alert(error);
				})
			},

			/**
			 * 查询用户账户信息
			 */
			queryaccountinfo() {
				let url = this.axios.urls.SELECTACCOUNTBYID;
				let param = {
					id: this.userId
				}
				//这个是去查询用户账户信息
				this.axios.post(url, param).then(resp => {
					console.log(resp.data);
					if (resp.data.code != -1) {
						this.form = resp.data.data;
						console.log(resp.data);
					} 
				}).catch(error => {
					alert(error);
				})
			}
		},


		created: function() {
			this.queryMaxTime();
			this.queryaccountinfo();
		}
	}
</script>

<style>

</style>
