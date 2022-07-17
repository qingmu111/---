// 文章请求模块 /v1_0/articles
import request from '@/utils/request'

// 请求获取文章列表数据
export const getArticles = (params) => {
  return request({
    methods: 'get',
    url: '/v1_0/articles',
    params
  })
}

// 获取新闻详情  /v1_0/articles/:article_id
export const getArticleById = (articleId) => {
  return request({
    methods: 'get',
    url: `/v1_0/articles/${articleId}`

  })
}

// 收藏文章  /v1_0/article/collections
export const addCollection = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }

  })
}
// 取消收藏文章 /v1_0/article/collections/:target
export const deleteCollection = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'

  })
}
// 对文章点赞
// Path： /v1_0/article/likings
export const addLike = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }

  })
}

// 取消对文章点赞  /v1_0/article/likings/:target
export const deleteLike = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'

  })
}
