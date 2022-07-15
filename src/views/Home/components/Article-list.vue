<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isrefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSucessText"
      success-duration="1500"
    >
      <!-- <p>刷新次数: {{ count }}</p> -->
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!--  <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
          :article="article"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/ArticleItem'
export default {
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中loading状态
      finished: false, // 控制数据加载结束状态
      timestamp: null,
      error: false,
      isrefreshLoading: false,
      refreshSucessText: ''
    }
  },
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 1.请求数据
    // 初始状态或者滚动到底会触发onload
    /*  onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    } */
    async onRefresh () {
      // console.log('onRefresh')
      try {
        const { data } = await getArticles({ channel_id: this.channel.id, timestamp: Date.now() })
        // 模拟失败情形
        /*  if (Math.random() > 0.1) {
          JSON.parse('ddddddddddd')
        } */

        const { results } = data.data
        this.list.unshift(...results)
        this.isrefreshLoading = false
        this.refreshSucessText = `刷新成功,更新了${results.length}条数据`
      } catch (err) {
        this.isrefreshLoading = false
        this.refreshSucessText = '刷新失败'
        console.log('刷新失败')
      }
    },

    async onLoad () {
      try {
        // 1.请求获取数据
        const { data } = await getArticles({ channel_id: this.channel.id, timestamp: this.timestamp || Date.now() })
        // console.log(data, '11111')
        // 2.把请求数据结果数据放到list数组中
        const { results } = data.data
        this.list.push(...results)
        // 3.本次数据加载结束之后要把加载状态设置为结束
        // 4.判断数据是否全部加载完成
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
        this.loading = false
      } catch (err) {
        // console.log(err)
        this.error = true
        this.loading = false
      }
    }
  }
}

</script>

<style lang="less" scoped>
.article-list {
  height: 80vh;
  overflow-y: auto;
}
</style>
