import request from '@/utils/request'
// 对文章或者评论进行评论 /v1_0/comments  /v1_0/comments
export const getComments = (params) => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params

  })
}

// 对评论或评论回复点赞 /v1_0/comment/likings
export const addCommentLike = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }

  })
}
// 取消对评论或评论回复点赞
export const deleteCommentLike = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'

  })
}

// 对文章或者评论进行评论  /v1_0/comments
export const addComment = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data

  })
}
