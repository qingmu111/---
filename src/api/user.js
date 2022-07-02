import request from '@/utils/request'
// import store from '@/store/index'
// 用户认证,登录注册
export const login = (data) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data
  })
}
// 发送短信验证码
export const sendSms = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/:${mobile}`,
    method: 'GET'

  })
}

// 获取用户自己信息
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    method: 'GET'
    /* headers: {
      // 该接口需要授权
      // token数据格式 Bearer后面有一个空格
      Authorization: `Bearer ${store.state.user.token}`
    } */

  })
}
