import request from '@/utils/request'
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
