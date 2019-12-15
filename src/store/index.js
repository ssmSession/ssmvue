import Vue from 'vue'

//引入vuex
import Vuex from 'vuex'

//在vue中作用vuex
Vue.use(Vuex)

//导入相关模块
import actions from '@/store/actions'
import state from '@/store/state'
import getters from '@/store/getters'
import mutations from '@/store/mutations'
// import userMsg from '@/store/userMsg/user-msg.js'
import VuexPersistence from 'vuex-persist'

//创建一个 实例
const vuexLocal = new VuexPersistence({
	storage: window.localStorage
})

//创建 store 实例 并且注册 模块
const store = new Vuex.Store({
	actions,
	state,
	getters,
	mutations,
	// modules: {
	// 	userMsg
	// },
	plugins:[
		vuexLocal.plugin
	]
})

export default store
