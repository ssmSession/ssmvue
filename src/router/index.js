import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
<<<<<<< HEAD
import Login from '@/view/login'
import Register from '@/view/register'
import BorrowMoney from '@/invest/BorrowMoney'
=======
import Login from '@/view/login.vue'
import Register from '@/view/register.vue'
import InvestList from '@/investment/investinform/InvestList'
>>>>>>> e7fa247e6a22f3d383308e97f6180ac6a05fe420

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
<<<<<<< HEAD
      path: '/BorrowMoney',
      name: 'BorrowMoney',
      component: BorrowMoney
=======
      path: '/InvestList',
      name: 'InvestList',
      component: InvestList
>>>>>>> e7fa247e6a22f3d383308e97f6180ac6a05fe420
    }
  ]
})
