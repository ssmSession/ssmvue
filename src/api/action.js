/**
 * 对后台请求的地址的封装，URL格式如下：
 * 模块名_实体名_操作
 */
export default {

	'SERVER': 'http://localhost:8080/', //服务器
	'USER_LOGIN': '/user/login', //用户登录
	'USER_REGISTER': '/user/register', //用户注册
	'SYS_GETMODULES': '/getModules', //左边菜单栏
	'GETLOGININFOBYUSERTYPE': '/user/getLoginByUserType', //根据用户类型获取logininfo
	'GETUSERINFOBYLOGININFOID': '/getUserInfoByLoginInfoId', //获取用户详情
	'UPDATELOGININFOSTATE': '/user/updateLoginInfoState', //修改用户状态
	'UPDATELOGININFOUSERTYPE': '/user/updateLoginInfoUserType', //修改用户类型
	'GETUSERMODULES': '/getUserModules', //用户获取个人中心菜单栏
	'GETPHONE': '/user/phone', //获取电话号码
	'GETIPLOGBYMAXDATE': '/getIplogByMaxDate',//获取最近一次登录的信息
	'SELECTACCOUNTBYID': '/account/selectAccountById', //查询用户账户信息
	'TESTIDENTITY': '/testIdentity', //判断身份证是否真实
	
	
	
	'OUTLOADFILE':'/outLoadFile',
	
	
	'getFullPath': k => { //获得请求的完整地址，用于mockjs测试时使用
		return this.SERVER + this[k];
	}
}
