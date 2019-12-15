// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false


//新添
import ElementUI from 'element-ui'

//新增
import 'element-ui/lib/theme-chalk/index.css'

//新增
Vue.use(ElementUI)

//vue项目对axios的全局配置（增加配置）
import axios from '@/api/http'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

import store from './store'

/* eslint-disable no-new */



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
