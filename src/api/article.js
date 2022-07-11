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
