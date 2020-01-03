import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/admin/Home'
import pum from '@/admin/security/pum'
import staff from '@/admin/security/staff'
import Login from '@/view/login'
import BorrowMoney from '@/invest/BorrowMoney'
import InvestList from '@/investment/investinform/InvestList'
import AboutOur from '@/invest/AboutOur.vue'
import Index from '@/invest/index.vue'

import Register from '@/view/register.vue'
import InvestList from '@/investment/investinform/InvestList'
import Main from '@/admin/Main'

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
})
