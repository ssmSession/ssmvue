/**
 * 对后台请求的地址的封装，URL格式如下：
 * 模块名_实体名_操作
 */
export default {

  'SERVER': 'http://localhost:8080/', //服务器
  'USER_LOGIN': '/user/login',
  'USER_REGISTER':'/user/register',
  'GETPHONE':'/user/phone',
  
  'getFullPath': k => { //获得请求的完整地址，用于mockjs测试时使用
    return this.SERVER + this[k];
  }
}
