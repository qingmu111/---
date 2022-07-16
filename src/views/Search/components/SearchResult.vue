<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false

    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      // 1.获取数据
      try {
        // JSON.parse('ddd')
        const { data } = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        console.log(data, 'loads')
        // 2.将数据加载列表
        const { results } = data.data
        this.list.push(...results)
        // 3.将本次loading关闭
        this.loading = false
        // 4.判断是否有数据.如果有,则更新获取下一个数据页码
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
        // 如果没有,则将finished设置为true
      } catch (err) {
        this.error = true
        this.loading = false
        this.$toast('获取数据失败,请稍后重试')
      }
    }
  }

}
</script>

<style>
</style>
