import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
<<<<<<< HEAD

=======
import Home from '@/admin/Home'
import pum from '@/admin/security/pum'
import staff from '@/admin/security/staff'
>>>>>>> 412d342d2f1d125982be85faa3511ace43ce7ec1
import Login from '@/view/login'
import BorrowMoney from '@/invest/BorrowMoney'
<<<<<<< HEAD
import InvestList from '@/investment/investinform/InvestList'
import AboutOur from '@/invest/AboutOur.vue'
import Index from '@/invest/index.vue'

=======
import Register from '@/view/register.vue'
import InvestList from '@/investment/investinform/InvestList'
import Main from '@/admin/Main'
>>>>>>> 412d342d2f1d125982be85faa3511ace43ce7ec1

Vue.use(Router)

export default new Router({
<<<<<<< HEAD
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
=======
	routes: [{
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
			path: '/Main',
			name: 'Main',
			component: Main,
			children: [{
					path: '/Home',
					name: 'Home',
					component: Home,
				},
				{
					path: '/security/pum',
					name: 'pum',
					component: pum,
				},
				{
					path: '/security/staff',
					name: 'staff',
					component: staff,
				},
			]
		},
		{
			path: '/BorrowMoney',
			name: 'BorrowMoney',
			component: BorrowMoney
		}
	]
>>>>>>> 412d342d2f1d125982be85faa3511ace43ce7ec1
})
