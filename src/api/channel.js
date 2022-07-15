import request from '@/utils/request'
// 获取所有频道列表  /v1_0/channels
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels',
    method: 'GET'

  })
}

// 设置用户的频道（部分覆盖）
export const setUserChannels = (channel) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }

  })
}
// 删除指定用户频道  /v1_0/user/channels/:target
export const deteleUserChannels = (channelId) => {
  return request({
    url: `/v1_0/user/channels/${channelId}`,
    method: 'DELETE'

  })
}
