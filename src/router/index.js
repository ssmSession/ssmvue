import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/view/login.vue'
import Register from '@/view/register.vue'
import InvestList from '@/investment/investinform/InvestList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/InvestList',
      name: 'InvestList',
      component: InvestList
    }
  ]
})
