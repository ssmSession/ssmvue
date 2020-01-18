import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Home from '@/admin/Home'
import pum from '@/admin/security/pum'
import staff from '@/admin/security/staff'
import Certification from '@/admin/check/Certification'
import Login from '@/view/login'
import BorrowMoney from '@/invest/BorrowMoney'
import AboutOur from '@/invest/AboutOur'
import Index from '@/invest/index'
import Register from '@/view/register'
import InvestList from '@/investment/investinform/InvestList'
import Main from '@/admin/Main'
import myaccount from '@/myaccount/myaccount_index'
import InvestHome from '@/Invest/InvestHome'
import accountinfo from '@/myaccount/accountinfo'
import realauth from '@/myaccount/realauth'
import Systemdictionary from '@/admin/dict/Systemdictionary'



Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Index',
			component: Index,
			children: [{
					path: '/Index/BorrowMoney',
					name: 'BorrowMoney',
					component: BorrowMoney
				},
        {
        	path: '/Index/Login',
        	name: 'Login',
        	component: Login
        },
        {
        	path: '/Index/Register',
        	name: 'Register',
        	component: Register
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
				{
					path: '/Index/myaccount',
					name: 'myaccount',
					component: myaccount,
					children:[
						{
							path: '/Index/myaccount/accountinfo',
							name: 'accountinfo',
							component: accountinfo
						},
						{
							path: '/Index/myaccount/realauth',
							name: 'realauth',
							component: realauth
						}
					]
				},
				{
					path: '/Index/InvestHome',
					name: 'InvestHome',
					component: InvestHome
				},

			]
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
				{
					path:'/check/Certification',
					name:'Certification',
					component:Certification
				},
        {
        	path:'/dict/Systemdictionary',
        	name:'Systemdictionary',
        	component:Systemdictionary
        }
			]
		}
	]

})
