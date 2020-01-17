
<template>

	<div>
		<div style="text-align: center;width: 80%;margin-left: 150px;margin-top: 150px;">
			<el-carousel :interval="4000" type="card" height="200px">
				<el-carousel-item v-for="item in test" :key="item.id">
					<h3 class="medium"><img style="width: 100%;height: 100%;" :src="item.src"></h3>
				</el-carousel-item>
			</el-carousel>

		</div>

	</div>

</template>

<script>
	export default {
		data: function() {
			return {
				test: [{
						id: 1,
						src: require('../assets/logs.png')
					},
					{

						id: 2,
						src: require('../assets/logs.png')
					},
					{

						id: 3,
						src: require('../assets/logs.png')
					},
					{
						id: 4,
						src: require('../assets/logs.png')
					}
				]
			}
		}



	}
</script>

<style scoped>
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
</style>

