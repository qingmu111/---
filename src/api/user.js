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

// 获取频道列表
export const getUserChannels = () => {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET'
    /* headers: {
      // 该接口需要授权
      // token数据格式 Bearer后面有一个空格
      Authorization: `Bearer ${store.state.user.token}`
    } */

  })
}

// 关注用户  /v1_0/user/followings POST
export const addUser = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }

  })
}

// 取消关注 /v1_0/user/followings/:target
export const deleteUser = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'

  })
}

// 获取用户个人资料  /v1_0/user/profile
export const getUserProfile = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'

  })
}

// 编辑用户个人资料 /v1_0/user/profile
export const editUserProfile = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data

  })
}

// 编辑用户照片资料（头像、身份证照片） /v1_0/user/photo PATCH
export const editUserPhoto = (data) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data

  })
}

// 编辑用户照片资料（头像、身份证照片）  /v1_0/user/photo  PATCH
export const editPhoto = (data) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data

  })
}
