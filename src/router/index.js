import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Login from '@/view/login'
import Register from '@/view/register'
import BorrowMoney from '@/invest/BorrowMoney'
import InvestList from '@/investment/investinform/InvestList'
import AboutOur from '@/invest/AboutOur.vue'
import Index from '@/invest/index.vue'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/Index/BorrowMoney',
          name: 'BorrowMoney',
          component: BorrowMoney
        },
        {
          path: '/Index/InvestList',
          name: 'InvestList',
          component: InvestList
        },
        {
          path: '/Index/AboutOur',
          name: 'AboutOur',
          component: AboutOur
        },
      ]
    }
  ]
})
